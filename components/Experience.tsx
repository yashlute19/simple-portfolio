"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "2025 - Present",
    company: "RoadX",
    role: "AI/ML Intern",
    description: "Developing scalable microservices and optimizing data pipelines for automated logistics. Focused on high-concurrency systems and API architecture.",
    color: "bg-primary",
    border: "border-primary",
    text: "text-primary",
    shadow: "shadow-[0_0_10px_#ffade5]"
  },
  {
    period: "2025 - 2026",
    company: "Insight",
    role: "Event Platform Developer",
    description: "Architected a event website for a college fest. Implemented seamless UI transitions and complex state management.",
    color: "bg-secondary",
    border: "border-secondary",
    text: "text-secondary",
    shadow: "shadow-[0_0_10px_#d1bcff]"
  },
  {
    period: "2025 - 2026",
    company: "TNPS FORGE",
    role: "Techincal Team",
    description: "Created Team portfolio website and managed the team's social media presence. Also, designed a barber Appointment system using AI.",
    color: "bg-tertiary",
    border: "border-tertiary",
    text: "text-tertiary",
    shadow: "shadow-[0_0_10px_#00dbe9]"
  }
];

export function Experience() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-24 bg-surface-container-lowest relative" id="experience">
      <div className="mb-24 flex flex-col items-start max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none"
        >
          JOURNEY <br /> <span className="text-secondary">&amp; MILESTONES</span>
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-1 bg-tertiary origin-left"
        />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-tertiary opacity-30"></div>

        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative flex flex-col md:flex-row items-center justify-between group ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="hidden md:block w-[45%]"></div>
            
            <div className={`absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 w-2 h-2 ${exp.color} rounded-full z-10 ${exp.shadow}`}></div>
            
            <div className={`glass-card p-10 rounded-3xl w-full md:w-[45%] transition-all duration-500 hover:scale-[1.02] border-l-4 ${exp.border}`}>
              <span className={`${exp.text} font-headline text-xs font-bold tracking-widest uppercase block mb-2`}>
                {exp.period}
              </span>
              <h3 className="text-3xl font-headline font-bold mb-4">{exp.company}</h3>
              <p className="text-tertiary font-headline text-sm font-semibold mb-6">{exp.role}</p>
              <p className="text-on-surface-variant leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
