import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { ContentAdder } from "@/components/ContentAdder";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <TechStack />
      <Projects />
      <ContentAdder />
      <Contact />
    </main>
  );
}
