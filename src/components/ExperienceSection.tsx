import React from "react";
import { motion } from "framer-motion";

type Group = { label: string; items: string[] };

const roles: {
  period: string;
  role: string;
  company: string;
  tags: string[];
  metrics: [string, string][];
  groups: Group[];
}[] = [
  {
    period: "AUG 2023 — SEP 2026",
    role: "SENIOR CLOUD SECURITY ENGINEER",
    company: "REALTHINGKS INDIA PRIVATE LIMITED · PUNE, INDIA",
    tags: [
      "Azure Security",
      "Entra ID",
      "Defender",
      "Intune",
      "TISAX AL2",
      "Sophos XDR",
      "Automation",
    ],
    metrics: [
      ["230–240", "Users secured"],
      ["260+", "Endpoints"],
      ["10+", "Apps on SSO"],
      ["20", "Shared devices"],
      ["5", "On-prem servers"],
      ["AL2", "TISAX led"],
    ],
    groups: [
      {
        label: "Leadership",
        items: [
          "Led a two-person IT team reporting to the Country Head",
          "Owned Azure security, identity, network and infrastructure decisions",
          "Led full IT decommissioning at company closure",
        ],
      },
      {
        label: "Identity & Access",
        items: [
          "Administered Entra ID and Active Directory for 10+ applications",
          "Led MFA rollout across 230–240 users",
          "Managed Conditional Access, RBAC, PIM and access reviews",
          "Ran joiner, mover and leaver processes",
        ],
      },
      {
        label: "Cloud Security Posture",
        items: [
          "Managed Azure Firewall, NSGs, Private Endpoints, Key Vault, Azure Policy",
          "Reviewed Defender for Cloud Secure Score vs CIS Azure & MCSB",
          "Prioritised risks such as excessive network access and exposed storage",
          "Tracked remediation through to closure",
        ],
      },
      {
        label: "Infrastructure & DR",
        items: [
          "Managed Azure VMs, storage, VPN Gateway and SSL/TLS certificates",
          "Reviewed Azure Backup jobs, failures and retention settings",
          "Supported restore and disaster recovery validation",
        ],
      },
      {
        label: "Network & Endpoint",
        items: [
          "Configured Sophos Firewall rules, NAT, IPS, web filtering, TLS inspection",
          "Maintained network segmentation and VPNs",
          "Protected 260+ endpoints and 20 shared devices with Intercept X XDR, DLP, BitLocker",
          "Triaged Sophos Central alerts and ran root cause analysis",
          "Ran Nessus scans and Wireshark analysis; tracked patching",
          "Used Microsoft Intune and Defender for Endpoint for device management and endpoint protection",
        ],
      },
      {
        label: "Compliance",
        items: [
          "Led TISAX Assessment Level 2 gap assessments",
          "Prepared audit evidence and drove remediation follow-up",
          "Coordinated with external auditors",
        ],
      },
      {
        label: "Automation",
        items: [
          "Daily PowerShell/Python checks: backup failures, pending patches",
          "Weekly reports: missing MFA, inactive accounts, devices without BitLocker",
        ],
      },
      {
        label: "Internal Platforms",
        items: [
          "Built CRM, skills and IT apps with Claude, Lovable and Supabase",
          "Replaced Zoho CRM, Asset Tiger and Zoho Desk",
        ],
      },
    ],
  },
  {
    period: "JUN 2018 — AUG 2023",
    role: "NETWORK ENGINEER",
    company: "FINIQ CONSULTING INDIA PRIVATE LIMITED · PUNE, INDIA",
    tags: ["Banking Clients", "Hybrid Identity", "Azure Networking", "ISO 27001"],
    metrics: [
      ["100+", "Azure VMs"],
      ["5 yrs", "Tenure"],
      ["3", "Environments"],
      ["ISO", "27001 audits"],
    ],
    groups: [
      {
        label: "Cloud Operations",
        items: [
          "Administered 100+ Azure VMs across dev, test and production",
          "Supported banking client workloads with strict access controls",
          "Managed patching, Azure Backup and Site Recovery",
          "Validated recovery readiness",
        ],
      },
      {
        label: "Hybrid Identity",
        items: [
          "Managed Entra ID, Entra Connect and Windows Server AD",
          "Administered Conditional Access, MFA, RBAC and PIM",
        ],
      },
      {
        label: "Networking",
        items: [
          "Supported VNets, NSGs, Azure Firewall, Bastion and VPN",
          "Maintained LAN and WAN routing to Azure",
        ],
      },
      {
        label: "Security & Monitoring",
        items: [
          "Monitored with Azure Monitor and Log Analytics",
          "Used Defender for Cloud, Azure Policy and Key Vault",
          "Handled incidents and vulnerability remediation",
          "Participated in ISO 27001 audits and evidence collection",
        ],
      },
      {
        label: "Automation",
        items: [
          "PowerShell, Azure CLI and Azure Automation for admin tasks",
          "Basic hands-on Intune and Defender for Endpoint",
        ],
      },
    ],
  },
  {
    period: "NOV 2016 — JUN 2018",
    role: "IT ENGINEER",
    company: "STARCONN MOBILITY PRIVATE LIMITED · PUNE, INDIA",
    tags: ["Infrastructure", "Active Directory"],
    metrics: [],
    groups: [
      {
        label: "IT Support",
        items: [
          "Supported LAN, WAN, DNS and TCP/IP",
          "Administered AD accounts and permissions",
          "Managed backups and Windows systems",
        ],
      },
    ],
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RoleGroups: React.FC<{ groups: Group[] }> = ({ groups }) => {
  return (
    <>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label}>
            <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39169]">
              {g.label}
            </h4>
            <ul className="grid gap-2">
              {g.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug text-[#C9BEB3]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.42em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export const ExperienceSection: React.FC = () => (
  <section
    id="experience"
    className="relative overflow-hidden bg-black px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20"
  >
    <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[120px]" />
    <div className="relative z-10 mx-auto w-full max-w-6xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          03 / EXPERIENCE
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
      <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
        <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-white sm:text-7xl">
          Career experience
        </h2>
        <ul className="grid gap-1.5 text-sm text-[#CFC2B5] md:justify-items-end">
          <li>• 10 years in IT · 7+ years Azure</li>
          <li>• 3 companies · Pune, India</li>
          <li>• Security, identity, network, compliance</li>
        </ul>
      </div>

      <div className="relative space-y-8 sm:pl-10">
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.6, ease }}
          className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-[#D4AF37] via-[#8C6D4F]/50 to-transparent sm:block"
        />
        {roles.map((role, i) => (
          <motion.article
            key={role.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="group relative rounded-sm border border-[#8C6D4F]/35 bg-gradient-to-br from-[#120E0A] to-[#0A0807] p-5 transition-colors duration-500 hover:border-[#D4AF37]/60 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[2.15rem] top-9 hidden h-3 w-3 rounded-full border-2 border-[#D4AF37] bg-black shadow-[0_0_14px_rgba(212,175,55,0.7)] sm:block"
            />
            <div className="flex flex-col justify-between gap-2 border-b border-[#8C6D4F]/25 pb-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-display text-3xl leading-none text-white sm:text-4xl">
                  {role.role}
                </h3>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.13em] text-[#E6C27D] sm:text-sm">
                  {role.company}
                </span>
              </div>
              <span className="shrink-0 font-mono text-xs text-[#C9A96E] sm:text-sm">
                {role.period}
              </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {role.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#E6C27D]"
                >
                  {t}
                </li>
              ))}
            </ul>

            {role.metrics.length > 0 && (
              <ul
                className={`mt-5 grid grid-cols-2 gap-px overflow-hidden border border-[#8C6D4F]/25 bg-[#8C6D4F]/25 ${role.metrics.length > 4 ? "sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-4"}`}
              >
                {role.metrics.map(([v, l], k) => (
                  <motion.li
                    key={l}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + k * 0.08, ease }}
                    className="bg-[#0D0B09] px-4 py-3"
                  >
                    <span className="block font-display text-3xl leading-none text-[#F5D59A]">
                      {v}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#AFA49A]">
                      {l}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}

            <RoleGroups groups={role.groups} />
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-2 border border-[#8C6D4F]/30 bg-[#100D0B] p-5 sm:flex-row sm:items-center sm:p-6">
        <ul className="font-display text-2xl text-white">
          <li>• B.E. Electronics &amp; Telecommunication</li>
          <li className="mt-1 font-sans text-sm text-[#BFB4AA]">
            • SGOI COE · Pune University (SPPU) · First Class
          </li>
        </ul>
        <span className="font-mono text-sm text-[#C9A96E]">2016</span>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
