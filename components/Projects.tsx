"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";

const projects = [
  {
    title: "Insight Event Website",
    description: "A full-featured event management platform featuring real-time ticketing, QR code check-ins, and dynamic seat allocation across hundreds of events.",
    tech: ["Next.js", "PostgreSQL", "Tailwind"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTKaffKml__LUgc7mWesq9PEwbAnFP2dfOiZaCDeiiislnZFGzwqOjdxd0o0MZxkFt3BTxxWLvQxcypUC8BvtjCeis3FR6HYJT_Iq3xUi4IPM-qUpZHDOvxlIYkl1tyLbz65lZLEjshZP9DFBUOnxOmn0RUDLhtrH77N2gTZ6jGRT8saxKwscg83emmKZSMs_WGzSQz-_qcp9gdBA-zCFVcSjxrky_40UO5ePBVEwFbH_XhPYPTUC0gXK1AldyoE1kul5KH4i0UYGS",
    primaryButton: "View Case Study",
    primaryClass: "bg-[#ff3cde] text-white hover:brightness-110",
    secondaryButton: "GitHub",
    reverse: false,
    accentColor: "text-[#ffade5]",
  },
  {
    title: "Personal Dashboard",
    description: "A minimalist productivity hub with focus timers, habit tracking, and integrated calendar functionality using a custom dark theme and real-time data sync.",
    tech: ["React", "Firebase", "TypeScript"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiNGaOoChk79X-7n04vg5XNbFDfA6QHldQcPCnKuBBZ1kzC-i9C2zX5ralaEWJY6JY6z2Rnhu3EMlRF1thBHZ5mxMvOo_fNZhtgiP-8Pvhl6QePRWzDpG_6hONQFWwBiK51-EI-ZydyoDK55jVRECpe7IdLonjOIIIwA62XGJWR81TggBi6OHaQa_vQRGW0sXyWr3tXiuo3kxf68TljnBk5Yjyk3Q0iNmn7cNh-tlHUeWBopdbqlDtxKmEhlZxyX2JTubkhM0S_9cc",
    primaryButton: "Live Demo",
    primaryClass: "bg-[#7000ff] text-white hover:brightness-110",
    secondaryButton: "GitHub",
    reverse: true,
    accentColor: "text-[#d1bcff]",
  },
];

export function Projects() {
  return (
    <section
      className="min-h-screen py-32 px-6 lg:px-24"
      id="projects"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-headline text-6xl md:text-8xl font-bold tracking-tighter max-w-lg leading-none text-white"
        >
          CURATED <span className="text-[#00dbe9]">WORK</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#dcbed0] max-w-sm font-light text-lg"
        >
          A selection of precision-built applications focused on performance and aesthetic depth.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-32 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${
              project.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-16 items-center`}
          >
            {/* Image */}
            <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-3xl aspect-video bg-[#2a2a2a] cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-95"
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Details */}
            <div className="w-full lg:w-2/5">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-[#353534] text-[#dcbed0] px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className={`font-headline text-4xl font-bold mb-3 text-white`}>
                {project.title}
              </h3>
              <p className="text-[#dcbed0] leading-relaxed mb-8 text-base">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className={`${project.primaryClass} px-6 py-3 rounded-xl font-headline font-bold text-sm hover:scale-105 transition-all flex items-center gap-2`}
                >
                  <ExternalLink size={16} />
                  {project.primaryButton}
                </button>
                <button className="text-white border border-white/20 px-6 py-3 rounded-xl font-headline font-bold text-sm hover:border-white/60 hover:bg-white/5 transition-all flex items-center gap-2">
                  <GitFork size={16} />
                  {project.secondaryButton}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
