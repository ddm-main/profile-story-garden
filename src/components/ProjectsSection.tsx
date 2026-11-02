import React from "react";
import { motion } from "framer-motion";

const focusAreas = [
  {
    number: "01",
    label: "IDENTITY & ACCESS",
    title: "Secure every identity.",
    points: [
      "10+ applications · Entra ID and hybrid Active Directory",
      "MFA rollout for 230–240 users",
      "Conditional Access · RBAC · PIM · access reviews",
    ],
    tags: ["Microsoft Entra ID", "MFA", "Conditional Access", "RBAC", "PIM", "Entra Connect"],
    proof: "230–240 USERS",
  },
  {
    number: "02",
    label: "AZURE SECURITY",
    title: "Harden cloud infrastructure.",
    points: [
      "Azure Firewall · NSGs · Private Endpoints · Key Vault",
      "Azure Policy · Defender for Cloud · Secure Score",
      "CIS and Microsoft Cloud Security Benchmark reviews",
    ],
    tags: [
      "Azure Firewall",
      "NSGs",
      "Private Endpoints",
      "Key Vault",
      "Defender for Cloud",
      "CIS Benchmark",
    ],
    proof: "100+ AZURE VMS AT FINIQ",
  },
  {
    number: "03",
    label: "ENDPOINT & OPERATIONS",
    title: "Make security operational.",
    points: [
      "260+ endpoints · 20 shared devices · Sophos Intercept X XDR",
      "DLP · BitLocker · anti-malware · device controls",
      "PowerShell and Python compliance reporting",
    ],
    tags: ["Sophos Intercept X XDR", "DLP", "BitLocker", "PowerShell", "Python", "Nessus"],
    proof: "260+ ENDPOINTS",
  },
  {
    number: "04",
    label: "RISK & COMPLIANCE",
    title: "Turn controls into evidence.",
    points: [
      "Led TISAX Assessment Level 2 activities",
      "Gap assessments · evidence · remediation follow-up",
      "External auditor coordination · ISO 27001 audit support",
    ],
    tags: ["TISAX AL2", "ISO 27001", "Risk Assessment", "Remediation", "Audit Evidence"],
    proof: "TISAX LEVEL 2",
  },
  {
    number: "05",
    label: "INTERNAL IT PLATFORMS",
    title: "Build tools around the work.",
    points: [
      "Built CRM, skills, and IT applications",
      "Claude · Lovable · Supabase",
      "Replaced Zoho CRM, Asset Tiger, and Zoho Desk",
    ],
    tags: ["Claude", "Lovable", "Supabase", "CRM", "IT Applications", "Skills Matrix"],
    proof: "INTERNAL TOOLS",
  },
];

export const ProjectsSection: React.FC = () => (
  <section
    id="work"
    className="relative overflow-hidden bg-[#080706] px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20"
  >
    <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/[0.035] blur-[130px]" />
    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          04 / SECURITY FOCUS
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
      <div className="mb-9 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
        <h2 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl">
          Security practice
        </h2>
        <ul className="grid gap-1.5 text-sm text-[#CFC2B5] md:justify-items-end">
          <li>• Identity and cloud protection</li>
          <li>• Operational security and automation</li>
          <li>• Risk, assurance, and internal tools</li>
        </ul>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {focusAreas.map((item, i) => (
          <motion.article
            key={item.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative flex min-h-full flex-col overflow-hidden border border-[#8C6D4F]/35 bg-[#100D0B] p-5 transition-colors hover:border-[#D4AF37]/75 sm:p-7 ${i === focusAreas.length - 1 ? "md:col-span-2" : ""}`}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.18em] text-[#D4AF37]">
                {item.number} / {item.label}
              </span>
              <span className="border border-[#8C6D4F]/40 px-2.5 py-1 font-mono text-[10px] text-[#E6C27D]">
                {item.proof}
              </span>
            </div>
            <h3 className="font-display text-4xl uppercase leading-none text-white transition-colors group-hover:text-[#F5D59A] sm:text-5xl">
              {item.title}
            </h3>
            <ul className="mt-4 flex-1 space-y-2 text-sm leading-snug text-[#CFC2B5]">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true" className="text-[#D4AF37]">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#8C6D4F]/25 pt-5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#8C6D4F]/30 bg-black/30 px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-[#E8DFD8] sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
