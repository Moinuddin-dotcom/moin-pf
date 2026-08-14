"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MorphingText } from "@/components/ui/morphing-text";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setMobileOpen(false);

    const element = document.querySelector(href);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Scroll Progress */}
      <ScrollProgress className="from-[#00ffb2] via-[#00d9ff] to-[#00ffb2]" />

      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigation("#home")}
            className="group relative z-50 flex items-center gap-2 text-lg font-bold tracking-[-0.03em] text-white"
          >
            {/* Morphing Name */}
           <button
  type="button"
  onClick={() => handleNavigation("#home")}
  className="group relative z-50 flex items-center gap-2 text-white"
>
  <MorphingText
    texts={["Moinuddin", "Chowdhury"]}
    className="!h-7 !w-[125px] !text-2xl !font-bold !leading-7 !tracking-[-0.03em] text-white"
  />

  {/* Availability Indicator */}
  <span
    className="relative flex h-2.5 w-2.5 shrink-0"
    aria-label="Available for opportunities"
  >
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffb2] opacity-50" />

    <span className="relative h-2.5 w-2.5 rounded-full bg-[#00ffb2]" />
  </span>

  {/* Hover underline */}
  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00ffb2] transition-all duration-300 group-hover:w-full" />
</button>

            {/* Availability Indicator */}
            <span
              className="relative flex h-2.5 w-2.5 shrink-0"
              aria-label="Available for opportunities"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffb2] opacity-50" />

              <span className="relative h-2.5 w-2.5 rounded-full bg-[#00ffb2]" />
            </span>

            {/* Hover underline */}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00ffb2] transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className="group relative text-sm font-medium text-white/65 transition-colors duration-300 hover:text-white"
              >
                {item.name}

                <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#00ffb2] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <InteractiveHoverButton
              onClick={() => handleNavigation("#contact")}
              className="px-5 py-2"
            >
              Hire Me
            </InteractiveHoverButton>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            mobileOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className="border-b border-white/5 py-4 text-left text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.name}
              </button>
            ))}

            <div className="pt-5">
              <InteractiveHoverButton
                onClick={() => handleNavigation("#contact")}
                className="w-full"
              >
                Hire Me
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}