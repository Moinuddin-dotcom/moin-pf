"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, SendHorizontal, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { topic: "Skills", question: "What is Moinuddin's tech stack?" },
  { topic: "Experience", question: "Where has Moinuddin worked?" },
  { topic: "SaaS & MVP", question: "Can he build a SaaS product or MVP for my startup?" },
  { topic: "Maintenance", question: "Does he offer maintenance and support for existing apps?" },
  { topic: "Business", question: "How can he help with business development and product planning?" },
  { topic: "Resume", question: "Can I see his resume?" },
  { topic: "Projects", question: "Tell me about the Guptodhan project." },
];

const GREETING =
  "Hi! I'm Moinuddin's AI assistant. Ask me about his skills, experience, projects, services or resume. Pick a suggestion below or type your own question.";

// Turns URLs, on-site paths (/projects/..., /...pdf) and #section anchors
// into links.
const LINK_PATTERN =
  /(https?:\/\/[^\s)]+|\/projects\/[a-z0-9-]+|\/[\w-]+\.pdf|#(?:about|skills|projects|experience|contact)\b|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function renderContent(text: string) {
  return text.split(LINK_PATTERN).map((part, index) => {
    if (index % 2 === 0) return part;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    const external = part.startsWith("http");
    return (
      <a
        key={index}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="break-all text-brand underline underline-offset-2"
      >
        {part}
      </a>
    );
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(question: string) {
    const content = question.trim();
    if (!content || loading) return;

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer.trim()) throw new Error("No answer came back.");
    } catch (err) {
      if (controller.signal.aborted) return;
      // Drop the failed exchange so the history stays valid for the next try.
      setMessages(messages);
      setInput(content);
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Couldn't reach the assistant. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  const lastMessage = messages[messages.length - 1];
  const waitingForFirstToken = loading && lastMessage?.content === "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Chat with Moinuddin's AI assistant"
            className="fixed bottom-24 right-4 z-[60] flex h-[min(600px,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[400px] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface text-ink shadow-2xl shadow-black/30 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Ask about Moinuddin</p>
                  <p className="text-xs text-ink/45">AI assistant · may make mistakes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-2 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
            >
              <Bubble role="assistant">{GREETING}</Bubble>

              {messages.map((message, index) =>
                message.content ? (
                  <Bubble key={index} role={message.role}>
                    {message.role === "assistant"
                      ? renderContent(message.content)
                      : message.content}
                  </Bubble>
                ) : null,
              )}

              {waitingForFirstToken && (
                <div className="flex gap-1.5 px-1 py-2" aria-label="Assistant is typing">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-2 w-2 animate-bounce rounded-full bg-brand/70"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            {/* Suggestions */}
            <div className="border-t border-ink/10 px-4 pt-3">
              <p className="px-1 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                You can ask about
              </p>
              <div className="flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none]">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion.topic}
                    type="button"
                    disabled={loading}
                    onClick={() => send(suggestion.question)}
                    title={suggestion.question}
                    className="shrink-0 rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-xs text-ink/65 transition-colors hover:border-brand/40 hover:text-ink disabled:opacity-50"
                  >
                    {suggestion.topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-4 pt-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Ask a question…"
                aria-label="Your question"
                className="h-11 flex-1 rounded-full border border-ink/10 bg-ink/[0.03] px-4 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-brand/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-surface transition-opacity disabled:opacity-40"
              >
                <SendHorizontal size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Close chat" : "Chat with my AI assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand text-surface shadow-lg shadow-brand/30 sm:right-6"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
}

function Bubble({
  role,
  children,
}: {
  role: ChatMessage["role"];
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-6",
          role === "user"
            ? "rounded-br-md bg-brand text-surface"
            : "rounded-bl-md border border-ink/10 bg-ink/[0.03] text-ink/80",
        )}
      >
        {children}
      </div>
    </div>
  );
}
