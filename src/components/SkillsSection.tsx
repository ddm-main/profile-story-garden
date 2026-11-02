import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TRANSCRIPT_URL =
  "https://learn.microsoft.com/en-us/users/deepakdongare/transcript/d4y0xu19gkjj5l2";

const certDetails: [string, string][] = [
  ["Certification", "Microsoft Certified: Cloud and AI Security Engineer Associate"],
  ["Certification number", "851T73-B7E299"],
  ["Exam passed", "SC-500 · Implementing End-to-End Security Controls for Cloud and AI Workloads"],
  ["Earned", "Oct 24, 2026"],
  ["Expires", "Oct 25, 2027"],
  ["Issuer", "Microsoft"],
];

const CertificationCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      id="certification"
      className="mt-5 scroll-mt-24 border border-[#8C6D4F]/30 bg-[#100D0B] p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B39169]">
            Certification
          </span>
          <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">
            Microsoft Certified: Cloud and AI Security Engineer Associate (SC-500)
          </h3>
          <span className="mt-1 block text-xs text-[#AFA49A]">
            Microsoft · Earned Oct 2026 · Valid to Oct 2027
          </span>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="cert-details"
            onClick={() => setOpen((v) => !v)}
            className="border border-[#8C6D4F]/50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E6C27D] transition-colors hover:border-[#D4AF37] hover:text-white"
          >
            {open ? "Hide details" : "View details"}
          </button>
          <a
            href={TRANSCRIPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#D4AF37] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-black"
          >
            Verify on Microsoft Learn ↗
          </a>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.dl
            id="cert-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid gap-px overflow-hidden border border-[#8C6D4F]/25 bg-[#8C6D4F]/25 sm:grid-cols-2"
          >
            {certDetails.map(([k, v]) => (
              <div key={k} className="bg-[#0D0B09] px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B39169]">
                  {k}
                </dt>
                <dd className="mt-1 text-sm text-[#E8DFD8]">{v}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </AnimatePresence>
    </div>
  );
};

const skillGroups = [
  {
    title: "IDENTITY & ACCESS",
    detail:
      "Entra ID · Entra Connect · Active Directory · MFA · Conditional Access · RBAC · PIM · PAM · SSO · OAuth 2.0 · JIT access · Zero Trust",
  },
  {
    title: "AZURE SECURITY",
    detail:
      "Defender for Cloud · Secure Score · Azure Policy · Key Vault · Managed Identities · Azure Monitor · Log Analytics · CSPM · CIS Azure Benchmark · Security Benchmark · Threat Modeling",
  },
  {
    title: "NETWORK SECURITY",
    detail:
      "Azure Firewall · NSGs · VNets · Private Endpoints · Private DNS · Application Gateway · WAF · Load Balancer · ExpressRoute · Network Watcher · VPN Gateway · Site-to-Site & Point-to-Site VPN · Bastion · DNS · TCP/IP · Segmentation",
  },
  {
    title: "CLOUD & RESILIENCE",
    detail:
      "Azure VMs · Azure Storage · Azure Backup · Azure Site Recovery · Backup Monitoring · Recovery Validation · Patch Management · SSL/TLS Certificate Lifecycle",
  },
  {
    title: "ENDPOINT & RESPONSE",
    detail:
      "Sophos Firewall · Sophos Intercept X · XDR · EDR · DLP · BitLocker · Nessus · Wireshark · Alert Triage · Incident Investigation · Root Cause Analysis",
  },
  {
    title: "AUTOMATION & GOVERNANCE",
    detail:
      "PowerShell · Python · Azure CLI · Azure Automation · Microsoft 365 · TISAX AL2 · ISO 27001 Audit Support · Gap Assessments · Auditor Coordination",
  },
  {
    title: "INTERNAL IT PLATFORMS",
    detail:
      "CRM · Skills Matrix · IT Applications · Claude · Lovable · Supabase · Workflow and tool replacement",
  },
];

export const SkillsSection: React.FC = () => (
  <section
    id="skills"
    className="relative overflow-hidden bg-black px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20"
  >
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          02 / TECHNICAL TOOLKIT
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
      <div className="mb-9 grid gap-4 md:mb-12 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl">
          Technical toolkit
        </h2>
        <ul className="grid gap-1.5 text-sm text-[#CFC2B5] sm:justify-self-end">
          <li>• Identity and access</li>
          <li>• Azure and network security</li>
          <li>• Endpoint defense and governance</li>
        </ul>
      </div>
      <div className="grid gap-px border border-[#8C6D4F]/30 bg-[#8C6D4F]/30 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`bg-[#0D0B09] p-5 sm:p-6 ${i === skillGroups.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
          >
            <span className="font-mono text-[10px] text-[#B39169]">0{i + 1}</span>
            <h3 className="mt-2 font-display text-2xl text-[#E6C27D]">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.detail.split(" · ").map((skill) => (
                <li
                  key={skill}
                  className="border border-[#8C6D4F]/30 bg-black/30 px-2 py-1 text-[11px] leading-tight text-[#D9D0C8]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
      <CertificationCard />
      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[#AFA49A]">
        <li className="mr-1 self-center uppercase tracking-wider">Learning:</li>
        {[
          "Terraform",
          "Azure Bicep",
          "Infrastructure as Code",
          "Microsoft Intune",
          "Defender for Endpoint",
        ].map((skill) => (
          <li key={skill} className="border border-[#8C6D4F]/25 px-2.5 py-1">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SkillsSection;
