"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const TITLES = [
  "Developer",
  "Designer",
  "Student",
  "Learner",
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffade5" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[3, -1, -3]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#00dbe9"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[0, -2, -5]}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="#d1bcff" roughness={0.2} metalness={0.5} />
        </mesh>
      </Float>
    </>
  );
}

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20" id="home">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-headline text-tertiary tracking-[0.5em] uppercase text-sm mb-6 block"
        >
          Portfolio 2026
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-headline text-7xl md:text-9xl font-bold tracking-tighter leading-tight mb-6"
        >
          <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">THIS IS</span><br/>
          <span className="text-on-surface">YASH LUTE</span>
        </motion.h1>

        <div className="flex justify-center">
  <div className="font-headline text-2xl md:text-4xl text-on-surface-variant font-light mb-8 text-center">
 <div className="inline-flex items-center justify-center gap-3 translate-x-[30px] md:translate-x-[40px]">
    <span className="shrink-0">Creative</span>

    <div className="relative min-w-[180px] md:min-w-[260px] text-left text-secondary font-bold h-[1.1em] overflow-hidden flex items-center justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={titleIndex}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-0 whitespace-nowrap"
        >
          {TITLES[titleIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
</div>
</div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 z-10">
        <span className="font-label text-[10px] uppercase tracking-widest mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDownRight size={16} className="rotate-45" />
        </motion.div>
      </div>
    </section>
  );
}
