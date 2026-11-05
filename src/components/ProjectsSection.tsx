import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const focusAreas = [
  {
    number: "A",
    label: "IDENTITY & ACCESS",
    title: "Secure every identity.",
    points: [
      "10+ applications · Entra ID and hybrid Active Directory",
      "MFA rollout for 250+ users at RealThingks · 450+ at FinIQ",
      "Conditional Access · RBAC · PIM · access reviews",
    ],
    tags: ["Microsoft Entra ID", "MFA", "Conditional Access", "RBAC", "PIM", "Entra Connect"],
    proof: "250+ USERS",
  },
  {
    number: "B",
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
    number: "C",
    label: "ENDPOINT & INCIDENT RESPONSE",
    title: "Make security operational.",
    points: [
      "Led ransomware response at FinIQ (Feb 2022): 11 of 450 systems isolated and restored",
      "DLP · BitLocker · anti-malware · device controls",
      "Monthly Nessus scans · quarterly awareness training · CEO-impersonation scam handled",
    ],
    tags: ["Sophos Intercept X XDR", "DLP", "BitLocker", "PowerShell", "Python", "Nessus"],
    proof: "11 OF 450 CONTAINED",
  },
  {
    number: "D",
    label: "RISK & COMPLIANCE",
    title: "Turn controls into evidence.",
    points: [
      "Led TISAX Assessment Level 2 (AL2)",
      "Gap assessments · evidence · remediation follow-up",
      "External auditor coordination · ISO 27001 audit support",
    ],
    tags: ["TISAX AL2", "ISO 27001", "Risk Assessment", "Remediation", "Audit Evidence"],
    proof: "TISAX LEVEL 2",
  },
  {
    number: "E",
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

const incidentSteps = [
  { step: "01", title: "Identify", text: "Pinpointed 11 affected systems out of 450" },
  { step: "02", title: "Isolate", text: "Cut the affected systems off to stop the spread" },
  { step: "03", title: "Remove", text: "Removed the malware from every affected system" },
  { step: "04", title: "Restore", text: "Brought services back online" },
  { step: "05", title: "Document", text: "Recorded root cause and lessons learned" },
];

const IncidentCaseStudy: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-4 overflow-hidden border border-[#D4AF37]/50 bg-gradient-to-br from-[#1A1208] via-[#100D0B] to-[#0A0806] p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="font-mono text-xs tracking-[0.18em] text-[#D4AF37]">
            CASE STUDY · FINIQ · FEB 2022
          </span>
          <h3 className="mt-2 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
            Ransomware response
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm text-[#CFC2B5]">
            <li className="flex gap-2"><span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />Led the response end to end</li>
            <li className="flex gap-2"><span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />Contained the attack to 11 of 450 systems</li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="incident-steps"
          className="shrink-0 self-start border border-[#D4AF37] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-black"
        >
          {open ? "Hide steps" : "See the 5 steps"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ol
            id="incident-steps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-px overflow-hidden sm:grid-cols-5"
          >
            {incidentSteps.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1 }}
                className="mt-6 border-t-2 border-[#D4AF37] bg-black/30 p-4"
              >
                <span className="font-mono text-[11px] text-[#D4AF37]">{s.step}</span>
                <h4 className="mt-1 font-display text-2xl uppercase text-white">{s.title}</h4>
                <p className="mt-1 text-sm leading-snug text-[#CFC2B5]">{s.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => (
  <section
    id="work"
    className="relative overflow-hidden bg-[#080706] px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20"
  >
    <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/[0.035] blur-[130px]" />
    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          04 / SECURITY PRACTICE
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
      <div className="mb-9 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
        <h2 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl">
          Security practice
        </h2>
        <ul className="grid gap-1.5 text-sm text-[#CFC2B5] md:justify-items-end">
          <li>Identity and cloud protection</li>
          <li>Operational security and automation</li>
          <li>Risk, assurance, and internal tools</li>
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
                  <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />
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
      <IncidentCaseStudy />
    </div>
  </section>
);

export default ProjectsSection;
