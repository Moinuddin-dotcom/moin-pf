"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const EMAIL = "moinchy7@gmail.com";

const navigation = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Moinuddin-dotcom",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-moinuddin-chowdhury-67098123b/",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a] text-white">
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#00ffb2]/5 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:py-20">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16">
          {/* Identity */}
          <div className="max-w-md">
            <a
              href="#home"
              className="group inline-block"
            >
              <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                Md. Moinuddin Chowdhury
              </h2>

              <div className="mt-2 h-px w-0 bg-[#00ffb2] transition-all duration-500 group-hover:w-full" />
            </a>

            <p className="mt-5 text-sm leading-6 text-white/45 sm:text-base">
              Full-Stack Developer building scalable, production-ready web
              applications across interfaces, APIs, databases,
              authentication, real-time systems, and deployment.
            </p>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffb2] opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00ffb2]" />
              </span>

              <span className="text-xs text-white/40 sm:text-sm">
                Open to new opportunities
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
              Navigation
            </p>

            <nav className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-fit text-sm text-white/45 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
              Connect
            </p>

            <div className="mt-5 space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.label === "Email" ? undefined : "_blank"
                    }
                    rel={
                      link.label === "Email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex w-fit items-center gap-3 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[#00ffb2]/30 group-hover:bg-[#00ffb2]/5">
                      <Icon
                        size={15}
                        className="transition-colors duration-300 group-hover:text-[#00ffb2]"
                      />
                    </span>

                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10 sm:my-12" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Md. Moinuddin Chowdhury. All rights reserved.
          </p>

          <p>
            Built with{" "}
            <span className="text-white/50">Next.js</span>
            {" "}·{" "}
            <span className="text-white/50">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}