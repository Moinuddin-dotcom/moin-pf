import { WelcomeScreen } from "@/components/intro/WelcomeScreen";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Skills } from "@/components/skills/Skills";
import { About } from "@/components/about/About";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { Experience } from "@/components/experience/Experience";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <WelcomeScreen />

      <Navbar />

      <Hero />

      <About />

      <Skills />

      <ProjectShowcase />

      <Experience />

      <Contact />
      
      <Footer />
    </main>
  );
}