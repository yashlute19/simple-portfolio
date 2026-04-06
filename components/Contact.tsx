"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, CalendarCheck, Link2, GitFork, X } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    title: "yashlute19@gmail.com",
    subtitle: "Direct Email",
    iconColor: "text-[#ffade5]",
    bgHover: "group-hover:bg-[#ffade5]/20",
    href: "mailto:yashlute19@gmail.com",
  },
  {
    icon: MapPin,
    title: "Nagpur, India",
    subtitle: "Location",
    iconColor: "text-[#d1bcff]",
    bgHover: "group-hover:bg-[#d1bcff]/20",
    href: null,
  },
  {
    icon: CalendarCheck,
    title: "Available Now",
    subtitle: "For Freelance",
    iconColor: "text-[#00dbe9]",
    bgHover: "group-hover:bg-[#00dbe9]/20",
    href: null,
    dot: true,
  },
];

const socialLinks = [
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: GitFork, label: "GitHub", href: "#" },
  { icon: X, label: "Twitter / X", href: "#" },
];

export function Contact() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6 py-32"
      id="contact"
      style={{ backgroundColor: "#0e0e0e", minHeight: "100vh" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-16 max-w-4xl leading-tight text-white"
      >
        LET'S BUILD <br />
        <span className="text-[#ff3cde]">SOMETHING</span> TOGETHER
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl mb-24">
        {contactItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="flex flex-col items-center group"
          >
            {item.href ? (
              <a
                href={item.href}
                className={`w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center mb-4 ${item.bgHover} transition-all`}
              >
                <item.icon className={item.iconColor} size={24} />
              </a>
            ) : (
              <div
                className={`w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center mb-4 ${item.bgHover} transition-all`}
              >
                <item.icon className={item.iconColor} size={24} />
              </div>
            )}
            <div className="flex items-center gap-2">
              {item.dot && (
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              )}
              <span className="font-headline font-bold text-base text-white">{item.title}</span>
            </div>
            <span className="text-[10px] text-neutral-500 uppercase mt-1 tracking-widest">
              {item.subtitle}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex gap-6 mb-24"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="w-12 h-12 rounded-full bg-[#201f1f] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#00dbe9] hover:border-[#00dbe9]/50 hover:scale-110 transition-all"
          >
            <s.icon size={20} />
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="w-full py-12 flex flex-col items-center text-center gap-4 border-t border-white/5">
        <div className="font-label font-black text-[#ffade5] text-2xl uppercase tracking-tighter mb-3">
          The Neon Curator
        </div>
        <div className="flex gap-8 mb-6">
          <a className="text-neutral-500 hover:text-[#00dbe9] transition-colors font-headline font-bold uppercase text-xs" href="#">LinkedIn</a>
          <a className="text-neutral-500 hover:text-[#00dbe9] transition-colors font-headline font-bold uppercase text-xs" href="#">GitHub</a>
          <a className="text-neutral-500 hover:text-[#00dbe9] transition-colors font-headline font-bold uppercase text-xs" href="#">Twitter</a>
        </div>
        <div className="text-neutral-600 font-body text-sm leading-relaxed max-w-sm">
          © 2026 The Neon Curator. Engineered with precision.
          <br />
          <span className="text-xs text-neutral-700">Built with Next.js · Three.js · Framer Motion</span>
          <div className="flex gap-4 justify-center mt-4">
            <a className="hover:text-[#ffade5] transition-colors text-neutral-600" href="#">Privacy Policy</a>
            <a className="hover:text-[#ffade5] transition-colors text-neutral-600" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
