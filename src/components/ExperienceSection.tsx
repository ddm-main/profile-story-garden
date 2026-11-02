// @ts-nocheck -- imported portfolio code written for a less strict TS config
import React from 'react';
import { motion } from 'framer-motion';
import { RevealText } from './RevealText';

const roles = [
  {
    period: 'AUG 2023 — SEP 2026',
    role: 'SENIOR CLOUD SECURITY ENGINEER',
    company: 'REALTHINGS INDIA PRIVATE LIMITED · PUNE, INDIA',
    highlights: [
      'Led a two-person IT team; managed identity, Azure security, networks, and infrastructure.',
      'Entra ID and Active Directory · 10+ apps · MFA rollout for 230–240 users.',
      'Conditional Access · RBAC · PIM · access reviews · user lifecycle.',
      'Azure Firewall · NSGs · Private Endpoints · Key Vault · Azure Policy.',
      '260+ endpoints · 20 shared devices · Sophos XDR · DLP · BitLocker.',
      'Led TISAX Level 2 assessment, evidence, remediation, and auditor coordination.',
      'Automated backup, patch, MFA, account, and BitLocker reports with PowerShell and Python.',
      'Built internal CRM, skills, and IT tools with Claude, Lovable, and Supabase.',
      'Led IT decommissioning at company closure.',
    ],
  },
  {
    period: 'JUN 2018 — AUG 2023',
    role: 'NETWORK ENGINEER',
    company: 'FINIQ CONSULTING INDIA PRIVATE LIMITED · PUNE, INDIA',
    highlights: [
      'Supported banking workloads across development, test, and production.',
      'Administered 100+ Azure VMs and access controls.',
      'Entra ID · Entra Connect · Active Directory · MFA · RBAC · PIM.',
      'VNets · NSGs · Azure Firewall · Bastion · VPN · LAN/WAN.',
      'Azure Backup · Site Recovery · Monitor · Log Analytics · Key Vault.',
      'Incident response · Defender for Cloud · ISO 27001 audit support.',
    ],
  },
  {
    period: 'NOV 2016 — JUN 2018',
    role: 'IT ENGINEER',
    company: 'STARCONN MOBILITY PRIVATE LIMITED · PUNE, INDIA',
    highlights: ['LAN/WAN · DNS · TCP/IP · Active Directory · Windows systems · backups.'],
  },
];

export const ExperienceSection: React.FC = () => (
  <section id="experience" className="relative overflow-hidden bg-black px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20">
    <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#D4AF37]/[0.04] blur-[120px]" />
    <div className="relative z-10 mx-auto w-full max-w-6xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">04 / EXPERIENCE</span>
        <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
      <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
        <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-white sm:text-7xl">Career experience</h2>
        <ul className="grid gap-1.5 text-sm text-[#CFC2B5] md:justify-items-end"><li>• RealThings India · Cloud security</li><li>• FinIQ Consulting · Network engineering</li><li>• Starconn Mobility · IT infrastructure</li></ul>
      </div>
      <div className="space-y-5">
        {roles.map((role, i) => (
          <motion.article key={role.company} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} className="rounded-sm border border-[#8C6D4F]/35 bg-[#0D0B09] p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-2 border-b border-[#8C6D4F]/25 pb-4 sm:flex-row sm:items-start">
              <div><h3 className="font-display text-3xl leading-none text-white sm:text-4xl">{role.role}</h3><span className="mt-2 block text-xs font-semibold uppercase tracking-[0.13em] text-[#E6C27D] sm:text-sm">{role.company}</span></div>
              <span className="shrink-0 font-mono text-xs text-[#C9A96E] sm:text-sm">{role.period}</span>
            </div>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {role.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-snug text-[#BFB4AA]"><span aria-hidden="true" className="mt-[0.42em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" /><RevealText>{highlight}</RevealText></li>)}
            </ul>
          </motion.article>
        ))}
      </div>
      <div className="mt-6 flex flex-col justify-between gap-2 border border-[#8C6D4F]/30 bg-[#100D0B] p-5 sm:flex-row sm:items-center sm:p-6">
        <ul className="font-display text-2xl text-white"><li>• B.E. Electronics &amp; Telecommunication</li><li className="mt-1 font-sans text-sm text-[#BFB4AA]">• SGOI COE · Pune University (SPPU) · First Class</li></ul><span className="font-mono text-sm text-[#C9A96E]">2016</span>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
