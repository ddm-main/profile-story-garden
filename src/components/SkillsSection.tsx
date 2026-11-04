import React from "react";
import { motion } from "framer-motion";

const TRANSCRIPT_URL =
  "https://learn.microsoft.com/en-us/users/deepakdongare/transcript/d4y0xu19gkjj5l2";

const certDetails: [string, string][] = [
  ["Credential", "Microsoft Certified: Cloud and AI Security Engineer Associate"],
  ["Exam passed", "SC-500 · Implementing End-to-End Security Controls for Cloud and AI Workloads"],
  ["Verification", "Official Microsoft Learn transcript"],
  ["Issuer", "Microsoft"],
];

const CertificationCard: React.FC = () => {
  return (
    <div
      id="certification"
      className="mt-5 scroll-mt-24 border border-[#8C6D4F]/30 bg-[#100D0B] p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B39169]">
            Microsoft credential
          </span>
          <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">
            Microsoft Certified: Cloud and AI Security Engineer Associate (SC-500)
          </h3>
          <span className="mt-1 block text-xs text-[#AFA49A]">
            Issued by Microsoft · Verified via Microsoft Learn
          </span>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={TRANSCRIPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#D4AF37] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-black"
          >
            Verify on Microsoft Learn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <dl className="mt-5 grid gap-px overflow-hidden border border-[#8C6D4F]/25 bg-[#8C6D4F]/25 sm:grid-cols-2 lg:grid-cols-3">
        {certDetails.map(([k, v]) => (
          <div key={k} className="bg-[#0D0B09] px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B39169]">{k}</dt>
            <dd className="mt-1 text-sm text-[#E8DFD8]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const platforms: { name: string; points: string[] }[] = [
  {
    name: "Microsoft Entra ID",
    points: [
      "MFA for 250+ users",
      "Conditional Access, RBAC, PIM",
      "Access reviews and joiner, mover, leaver",
      "SSO for 10+ applications",
    ],
  },
  {
    name: "Defender for Cloud",
    points: [
      "Secure Score reviews",
      "CIS Azure and Microsoft Cloud Security Benchmark",
      "Risk prioritization and remediation tracking",
    ],
  },
  {
    name: "Azure Firewall & NSGs",
    points: [
      "Network segmentation",
      "Private Endpoints and Private DNS",
      "VPN Gateway and Bastion access",
    ],
  },
  {
    name: "Azure Key Vault",
    points: ["Secrets and key storage", "Managed identities", "SSL/TLS certificate lifecycle"],
  },
  {
    name: "Azure Policy",
    points: [
      "Governance guardrails",
      "Compliance posture checks",
      "Remediation tracked to closure",
    ],
  },
  {
    name: "Azure Monitor & Log Analytics",
    points: [
      "Monitoring and alerting",
      "Log queries for investigation",
      "Incident root cause analysis",
    ],
  },
  {
    name: "Azure Backup & Site Recovery",
    points: ["Backup job and failure reviews", "Retention checks", "Restore and DR validation"],
  },
  {
    name: "Sophos XDR & Endpoint",
    points: [
      "Intercept X XDR, EDR and DLP",
      "BitLocker and device controls",
      "Intune and Defender for Endpoint (basic)",
    ],
  },
];

const AZURE_TERMS =
  /azure|entra|defender|key vault|log analytics|private endpoint|nsg|vnet|microsoft|bastion|expressroute|network watcher|application gateway|waf|managed identit|secure score|cspm|cis/i;

const skillGroups = [
  {
    title: "Identity & access",
    detail:
      "Entra ID · Entra Connect · Active Directory · MFA · Conditional Access · RBAC · PIM · PAM · SSO · OAuth 2.0 · JIT access · Zero Trust",
  },
  {
    title: "Azure security & governance",
    detail:
      "Defender for Cloud · Secure Score · Azure Policy · Key Vault · Managed Identities · Azure Monitor · Log Analytics · CIS Azure Benchmark · Security Benchmark · Threat Modeling",
  },
  {
    title: "Azure network security",
    detail:
      "Azure Firewall · NSGs · VNets · Private Endpoints · Private DNS · Application Gateway · WAF · Load Balancer · ExpressRoute · Network Watcher · VPN Gateway · Site-to-Site & Point-to-Site VPN · Bastion · DNS · TCP/IP · Segmentation",
  },
  {
    title: "Infrastructure & resilience",
    detail:
      "Azure VMs · Azure Storage · Azure Backup · Azure Site Recovery · Backup Monitoring · Recovery Validation · Patch Management · SSL/TLS Certificate Lifecycle",
  },
  {
    title: "Firewall, endpoint & security ops",
    detail:
      "Sophos Firewall · Sophos Intercept X · XDR · EDR · DLP · BitLocker · Nessus · Wireshark · Alert Triage · Incident Response · Vulnerability Management · Security Awareness Training · Root Cause Analysis",
  },
  {
    title: "Administration & compliance",
    detail:
      "PowerShell · Python · Azure CLI · Azure Automation · Azure Bicep · Microsoft 365 · TISAX AL2 · ISO 27001 Audit Support · Gap Assessments · Auditor Coordination",
  },
  {
    title: "Internal IT platforms",
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
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#B39169]">
        Core Azure &amp; security platforms
      </h3>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map(({ name, points }, i) => (
          <motion.article
            key={name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[#8C6D4F]/30 bg-[#0D0B09] p-5 transition-colors hover:border-[#5B9BD5]/60"
          >
            <h4 className="font-display text-2xl leading-tight text-[#9CC7F2]">{name}</h4>
            <ul className="mt-3 grid gap-1.5 text-sm leading-snug text-[#CFC2B5]">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5B9BD5]"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
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
            <h4 className="mt-2 font-display text-2xl text-[#E6C27D]">{group.title}</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.detail.split(" · ").map((skill) => (
                <li
                  key={skill}
                  className={`border px-2 py-1 text-[11px] leading-tight ${AZURE_TERMS.test(skill) ? "border-[#5B9BD5]/50 bg-[#5B9BD5]/10 text-[#B9D8F5]" : "border-[#8C6D4F]/30 bg-black/30 text-[#D9D0C8]"}`}
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
        <li className="mr-1 self-center tracking-wider">Learning and basic:</li>
        {[
          "Terraform (learning)",
          "Infrastructure as Code (learning)",
          "Microsoft Intune (basic)",
          "Defender for Endpoint (basic)",
        ].map((skill) => (
          <li
            key={skill}
            className={`border px-2 py-1 text-[11px] leading-tight ${AZURE_TERMS.test(skill) ? "border-[#5B9BD5]/50 bg-[#5B9BD5]/10 text-[#B9D8F5]" : "border-[#8C6D4F]/30 bg-black/30 text-[#D9D0C8]"}`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SkillsSection;
