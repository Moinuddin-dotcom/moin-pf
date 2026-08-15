"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { useForm } from "react-hook-form";

import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MagicCard } from "@/components/ui/magic-card";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormData {
  name: string;
  email: string;
  userMessage: string;
}

const EMAIL = "moinchy7@gmail.com";

const contactLinks = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/md-moinuddin-chowdhury-67098123b",
    href: "https://www.linkedin.com/in/md-moinuddin-chowdhury-67098123b/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "github.com/Moinuddin-dotcom",
    href: "https://github.com/Moinuddin-dotcom",
    icon: FaGithub,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [result, setResult] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setResult("Sending...");

    const formData = new FormData();

    formData.append(
      "access_key",
      "f5a5e7ad-50e0-46c5-ba00-49b9243a34b7",
    );

    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("user_message", data.userMessage);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        },
      );

      const resData = await response.json();

      if (resData.success) {
        setResult("Message sent successfully.");
        reset();
      } else {
        console.error("Web3Forms error:", resData);

        setResult(
          resData.message || "Unable to send your message.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);

      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] px-4 py-20 text-white sm:px-6 sm:py-24 md:py-36"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ffb2]/5 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[140px] md:h-[600px] md:w-[600px] md:blur-[160px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="contact-reveal mx-auto w-full max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#00ffb2]/70 sm:text-sm sm:tracking-[0.3em]">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <Highlighter
              action="highlight"
              color="#00ffb2"
              strokeWidth={2}
              animationDuration={800}
              iterations={2}
              padding={2}
              isView
            >
              meaningful
            </Highlighter>
            .
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/50 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
            Have a project, an opportunity, or an idea worth discussing?
            I&apos;d be happy to hear from you.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="contact-reveal mx-auto mt-10 w-full max-w-6xl sm:mt-14">
          <MagicCard
            className="w-full rounded-2xl border border-white/10 bg-white/[0.025] p-1 sm:rounded-3xl"
            gradientColor="#00ffb2"
            gradientOpacity={0.12}
          >
            <div className="grid overflow-hidden rounded-[15px] sm:rounded-[22px] lg:grid-cols-[1.1fr_0.9fr]">
              {/* =========================
                  Contact Form
              ========================== */}
              <div className="min-w-0 p-5 sm:p-8 md:p-10 lg:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00ffb2] sm:text-xs sm:tracking-[0.25em]">
                  Start a conversation
                </p>

                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:mt-5 sm:text-3xl md:text-4xl">
                  Have something you&apos;d like to build?
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:mt-5 sm:text-base sm:leading-7">
                  Whether you&apos;re building a new product, improving an
                  existing platform, or looking for a full-stack developer,
                  let&apos;s talk about what you&apos;re working on.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-7 sm:mt-8"
                >
                  <div className="grid gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-white/70 sm:text-sm"
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Md. Moinuddin Chowdhury"
                        {...register("name", {
                          required: "Please enter your name.",
                        })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#00ffb2]/50 focus:ring-1 focus:ring-[#00ffb2]/20 sm:h-12 sm:px-4"
                      />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-white/70 sm:text-sm"
                      >
                        Your email
                      </label>

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        {...register("email", {
                          required: "Please enter your email.",
                        })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#00ffb2]/50 focus:ring-1 focus:ring-[#00ffb2]/20 sm:h-12 sm:px-4"
                      />
                    </div>

                    {/* Message */}
                    <div className="grid gap-2">
                      <label
                        htmlFor="userMessage"
                        className="text-xs font-medium text-white/70 sm:text-sm"
                      >
                        Your message
                      </label>

                      <textarea
                        id="userMessage"
                        rows={5}
                        placeholder="Tell me about your project..."
                        {...register("userMessage", {
                          required: "Please enter your message.",
                        })}
                        className="min-h-[130px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#00ffb2]/50 focus:ring-1 focus:ring-[#00ffb2]/20 sm:min-h-[150px] sm:px-4"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                    <InteractiveHoverButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Submit Now"}
                    </InteractiveHoverButton>

                    {result && (
                      <p
                        className={`text-center text-xs leading-5 sm:max-w-[220px] sm:text-right sm:text-sm ${
                          result.includes("successfully")
                            ? "text-[#00ffb2]"
                            : "text-white/50"
                        }`}
                      >
                        {result}
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* =========================
                  Contact Information
              ========================== */}
              <div className="min-w-0 border-t border-white/10 bg-white/[0.02] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30 sm:text-xs sm:tracking-[0.25em]">
                  Connect
                </p>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:mt-5">
                  Let&apos;s connect.
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40 sm:mt-4">
                  You can also reach me directly through any of the
                  following channels.
                </p>

                {/* Social Links */}
                <div className="mt-6 space-y-3 sm:mt-7">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={
                          link.label === "Email"
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          link.label === "Email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-[#00ffb2]/30 hover:bg-[#00ffb2]/[0.03] sm:p-4"
                      >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] sm:h-10 sm:w-10">
                            <Icon
                              size={17}
                              className="text-white/60 transition-colors group-hover:text-[#00ffb2]"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-white/30 sm:text-xs">
                              {link.label}
                            </p>

                            <p className="mt-1 truncate text-xs font-medium text-white/65 transition-colors group-hover:text-white sm:text-sm">
                              {link.value}
                            </p>
                          </div>
                        </div>

                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00ffb2]"
                        />
                      </a>
                    );
                  })}
                </div>

                {/* Location */}
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/35 sm:mt-7 sm:pt-6 sm:text-sm">
                  <MapPin size={15} className="shrink-0 sm:size-4" />
                  <span>Chattogram, Bangladesh</span>
                </div>

                {/* Availability */}
                <div className="mt-5 flex items-center gap-3 sm:mt-6">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffb2] opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00ffb2]" />
                  </span>

                  <span className="text-xs text-white/40 sm:text-sm">
                    Open to new opportunities
                  </span>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
}