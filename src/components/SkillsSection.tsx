import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  { title: 'IDENTITY & ACCESS', detail: 'Entra ID · Entra Connect · Active Directory · MFA · Conditional Access · RBAC · PIM · PAM · SSO · OAuth 2.0 · JIT access · Zero Trust' },
  { title: 'AZURE SECURITY', detail: 'Defender for Cloud · Secure Score · Azure Policy · Key Vault · Azure Monitor · Log Analytics · CSPM · CIS Azure Benchmark · Security Benchmark · Threat Modeling' },
  { title: 'NETWORK SECURITY', detail: 'Azure Firewall · NSGs · VNets · Private Endpoints · Private DNS · Application Gateway · WAF · Load Balancer · ExpressRoute · VPN Gateway · Bastion · DNS · TCP/IP' },
  { title: 'CLOUD & RESILIENCE', detail: 'Azure VMs · Azure Storage · Azure Backup · Azure Site Recovery · Backup Monitoring · Recovery Validation · Patch Management · SSL/TLS Certificate Lifecycle' },
  { title: 'ENDPOINT & RESPONSE', detail: 'Sophos Firewall · Sophos Intercept X · XDR · EDR · DLP · BitLocker · Nessus · Wireshark · Alert Triage · Incident Investigation · Root Cause Analysis' },
  { title: 'AUTOMATION & GOVERNANCE', detail: 'PowerShell · Python · Azure CLI · Azure Automation · Microsoft 365 · TISAX AL2 · ISO 27001 Audit Support · Gap Assessments · Auditor Coordination' },
  { title: 'INTERNAL IT PLATFORMS', detail: 'CRM · Skills Matrix · IT Applications · Claude · Lovable · Supabase · Workflow and tool replacement' },
];

export const SkillsSection: React.FC = () => (
  <section id="skills" className="relative overflow-hidden bg-black px-4 py-16 text-[#E8DFD8] sm:px-12 sm:py-24 lg:px-20">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex items-center gap-4 sm:mb-14"><span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">03 / TECHNICAL TOOLKIT</span><span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" /></div>
      <div className="mb-9 grid gap-4 md:mb-12 md:grid-cols-2 md:items-end"><h2 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl">Technical toolkit</h2><ul className="grid gap-1.5 text-sm text-[#CFC2B5] sm:justify-self-end"><li>• Identity and access</li><li>• Azure and network security</li><li>• Endpoint defense and governance</li></ul></div>
      <div className="grid gap-px border border-[#8C6D4F]/30 bg-[#8C6D4F]/30 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => <motion.article key={group.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} className={`bg-[#0D0B09] p-5 sm:p-6 ${i === skillGroups.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''}`}><span className="font-mono text-[10px] text-[#B39169]">0{i + 1}</span><h3 className="mt-2 font-display text-2xl text-[#E6C27D]">{group.title}</h3><ul className="mt-3 flex flex-wrap gap-2">{group.detail.split(' · ').map((skill) => <li key={skill} className="border border-[#8C6D4F]/30 bg-black/30 px-2 py-1 text-[11px] leading-tight text-[#D9D0C8]">{skill}</li>)}</ul></motion.article>)}
      </div>
      <div className="mt-5 flex flex-col justify-between gap-2 border border-[#8C6D4F]/30 bg-[#100D0B] p-5 sm:flex-row sm:items-center sm:p-6"><ul className="text-sm text-white sm:text-base"><li className="font-mono text-xs uppercase tracking-[0.2em] text-[#B39169]">• Certification</li><li className="mt-1 font-semibold">• Microsoft Certified: Cloud and AI Security Engineer Associate (SC-500)</li></ul><span className="text-xs text-[#AFA49A]">Microsoft</span></div>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[#AFA49A]"><li className="mr-1 self-center uppercase tracking-wider">Learning:</li>{['Terraform', 'Azure Bicep', 'Infrastructure as Code', 'Microsoft Intune', 'Defender for Endpoint'].map((skill) => <li key={skill} className="border border-[#8C6D4F]/25 px-2.5 py-1">{skill}</li>)}</ul>
    </div>
  </section>
);

export default SkillsSection;
