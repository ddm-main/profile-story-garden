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

const title = "Deepak Dongare | Cloud Security Engineer | Azure & IAM";
const desc =
  "Senior Cloud Security Engineer, Microsoft SC-500 certified. 10 years in IT, 7+ in Azure: Entra ID, network security, incident response, TISAX AL2.";
const url = "https://deepakd.online/";
const img = "https://deepakd.online/og-image.jpg";
const portrait = "https://deepakd.online/deepak-portrait.webp";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": url + "#person",
      name: "Deepak Dongare",
      jobTitle: "Senior Cloud Security Engineer",
      url,
      image: portrait,
      email: "mailto:deepak.career@hotmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
      sameAs: ["https://www.linkedin.com/in/deepak-dongare"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University (SPPU)" },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Microsoft Certified: Cloud and AI Security Engineer Associate (SC-500)",
        recognizedBy: { "@type": "Organization", name: "Microsoft" },
        url: "https://learn.microsoft.com/en-us/users/deepakdongare/transcript/d4y0xu19gkjj5l2",
      },
      knowsAbout: ["Azure Security", "Microsoft Entra ID", "Identity and Access Management", "Defender for Cloud", "Network Security", "Incident Response", "TISAX"],
    },
    { "@type": "ProfilePage", url, name: title, mainEntity: { "@id": url + "#person" } },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Deepak Dongare" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: img },
      { property: "og:image:alt", content: "Deepak Dongare, Senior Cloud Security Engineer, Azure & IAM, SC-500 certified" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
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
