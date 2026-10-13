import Anthropic from "@anthropic-ai/sdk";

import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

// Best-effort per-IP limit. It lives in this server instance's memory, so on
// serverless hosts it resets per instance; use the host's rate limiting too.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const recent = messages.slice(-MAX_MESSAGES);
  // History must start with a user turn and alternate roles.
  if (recent.length % 2 === 0) recent.shift();

  const parsed: Anthropic.Beta.BetaMessageParam[] = [];
  for (const [index, message] of recent.entries()) {
    const expectedRole = index % 2 === 0 ? "user" : "assistant";
    if (
      typeof message !== "object" ||
      message === null ||
      message.role !== expectedRole ||
      typeof message.content !== "string"
    ) {
      return null;
    }
    const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content) return null;
    parsed.push({ role: expectedRole, content });
  }
  return parsed;
}

function logError(error: unknown) {
  if (error instanceof Anthropic.RateLimitError) {
    console.error("Chat rate limited by Anthropic API");
  } else if (error instanceof Anthropic.APIError) {
    console.error(`Chat API error ${error.status}:`, error.message);
  } else {
    console.error("Chat stream failed:", error);
  }
}

const client = new Anthropic();

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The chat assistant isn't configured yet." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const stream = client.beta.messages.stream(
    {
      model: "claude-opus-5-5",
      max_tokens: 8000,
      output_config: { effort: "low" },
      // On a safety-classifier refusal, the API retries on a fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    },
    { signal: request.signal },
  );

  // Wait for the first event so API errors (billing, auth, overload) become a
  // proper JSON error instead of a broken stream.
  const events = stream[Symbol.asyncIterator]();
  let first: IteratorResult<Anthropic.Beta.BetaRawMessageStreamEvent>;
  try {
    first = await events.next();
  } catch (error) {
    logError(error);
    return Response.json(
      {
        error:
          "The assistant is unavailable right now. Please use the contact form or email moinchy7@gmail.com.",
      },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (
          let result = first;
          !result.done;
          result = await events.next()
        ) {
          const event = result.value;
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "Sorry, I can't help with that. Feel free to ask about Moinuddin's skills, projects or experience.",
            ),
          );
        }
        controller.close();
      } catch (error) {
        if (request.signal.aborted) return;
        logError(error);
        controller.error(error);
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
