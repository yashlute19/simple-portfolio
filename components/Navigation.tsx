"use client";

import { useEffect, useState } from "react";
import { Link2, Code, Palette, Share2 } from "lucide-react";

export function TopNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Projects", href: "#projects" },
    { label: "Updates", href: "#updates" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 flex justify-between items-center px-8 py-4 ${
        scrolled
          ? "bg-[#131313]/90 shadow-lg backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="text-xl font-bold tracking-tighter text-white font-headline uppercase">
        Neon<span className="text-[#ffade5]">.</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="text-[#dcbed0] hover:text-white transition-colors tracking-tighter uppercase text-xs font-bold hover:scale-105 duration-200"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="#contact"
          className="bg-[#ff3cde] text-white px-6 py-2 rounded-xl font-headline font-bold text-sm hover:scale-105 hover:brightness-110 transition-all duration-300 inline-block"
        >
          Let's Talk
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#131313]/95 backdrop-blur-xl border-b border-white/10 flex flex-col py-4 px-8 gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#dcbed0] hover:text-white transition-colors tracking-tighter uppercase text-sm font-bold py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function SideNavBar() {
  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 rounded-full py-6 w-14 bg-[#353534]/40 backdrop-blur-2xl flex-col items-center gap-8 shadow-2xl shadow-[#ffade5]/10 z-40 hidden lg:flex">
      <a
        className="text-neutral-500 hover:text-[#ffade5] hover:scale-110 transition-all"
        href="#home"
        aria-label="Home"
      >
        <Link2 size={20} />
      </a>
      <a
        className="text-neutral-500 hover:text-[#ffade5] hover:scale-110 transition-all"
        href="#projects"
        aria-label="Projects"
      >
        <Code size={20} />
      </a>
      <a
        className="text-neutral-500 hover:text-[#ffade5] hover:scale-110 transition-all"
        href="#tech"
        aria-label="Tech Stack"
      >
        <Palette size={20} />
      </a>
      <a
        className="text-neutral-500 hover:text-[#ffade5] hover:scale-110 transition-all"
        href="#contact"
        aria-label="Contact"
      >
        <Share2 size={20} />
      </a>
    </aside>
  );
}
