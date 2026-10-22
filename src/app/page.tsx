import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { LlamaFeature } from "@/components/LlamaFeature";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { StarField } from "@/components/StarField";

export default function Home() {
  return (
    <>
      <StarField />
      <Header />
      <main id="main">
        <Hero />
        <LlamaFeature />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
