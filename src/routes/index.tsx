import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { ScrollProgress } from "@/components/ScrollProgress";

const title = "Deepak Dongare | Senior Cloud Security Engineer | Azure & IAM";
const desc =
  "10 years of IT experience securing Azure, identity, endpoints, and enterprise infrastructure.";
const img = "https://www.deepakd.online/deepak-portrait.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: "Deepak Dongare | Senior Cloud Security Engineer" },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.deepakd.online/" },
      { property: "og:site_name", content: "Deepak Dongare" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.deepakd.online/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
        <ScrollProgress />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <HeroSection />
        <main id="main">
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </MotionConfig>
  );
}
