"use client";

import { motion } from "framer-motion";
import { PanelsTopLeft, Code2, Palette, Database, TerminalSquare, Braces, HardDrive, Cloud } from "lucide-react";

const technologies = [
  { icon: PanelsTopLeft, name: "Next.js", role: "Full Stack", color: "text-primary", bg: "bg-primary/10", hoverBg: "group-hover:bg-primary/20", borderColor: "hover:border-primary/50" },
  { icon: Code2, name: "React", role: "Frontend", color: "text-secondary", bg: "bg-secondary/10", hoverBg: "group-hover:bg-secondary/20", borderColor: "hover:border-secondary/50" },
  { icon: Palette, name: "Tailwind", role: "Styling", color: "text-tertiary", bg: "bg-tertiary/10", hoverBg: "group-hover:bg-tertiary/20", borderColor: "hover:border-tertiary/50" },
  { icon: Database, name: "Supabase", role: "Backend", color: "text-primary", bg: "bg-primary/10", hoverBg: "group-hover:bg-primary/20", borderColor: "hover:border-primary/50" },
  { icon: TerminalSquare, name: "TypeScript", role: "Language", color: "text-secondary", bg: "bg-secondary/10", hoverBg: "group-hover:bg-secondary/20", borderColor: "hover:border-secondary/50" },
  { icon: Braces, name: "Node.js", role: "Runtime", color: "text-tertiary", bg: "bg-tertiary/10", hoverBg: "group-hover:bg-tertiary/20", borderColor: "hover:border-tertiary/50" },
  { icon: HardDrive, name: "PostgreSQL", role: "Database", color: "text-primary", bg: "bg-primary/10", hoverBg: "group-hover:bg-primary/20", borderColor: "hover:border-primary/50" },
  { icon: Cloud, name: "Firebase", role: "Cloud", color: "text-secondary", bg: "bg-secondary/10", hoverBg: "group-hover:bg-secondary/20", borderColor: "hover:border-secondary/50" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export function TechStack() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-24 bg-surface relative" id="tech">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-headline text-6xl font-bold tracking-tighter mb-4"
        >
          FORGED IN <span className="text-primary italic">CODE</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant font-light max-w-xl mx-auto"
        >
          The precision tools I use to bring architectural visions to life.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {technologies.map((Tech, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className={`glass-card p-10 rounded-2xl flex flex-col items-center justify-center text-center group transition-all duration-300 cursor-default border border-outline-variant/10 ${Tech.borderColor}`}
          >
            <div className={`w-16 h-16 ${Tech.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 ${Tech.hoverBg} transition-all duration-300`}>
              <Tech.icon className={`w-8 h-8 ${Tech.color}`} />
            </div>
            <h4 className="font-headline font-bold text-lg">{Tech.name}</h4>
            <span className={`text-[10px] ${Tech.color} opacity-80 font-label tracking-widest uppercase mt-2`}>
              {Tech.role}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
