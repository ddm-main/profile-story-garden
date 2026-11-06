import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Node = { id: string; label: string; x: number; y: number; points: string[] };
type View = { id: string; name: string; nodes: Node[]; links: [string, string][] };

// Every detail below comes from the resume; nothing is invented.
const views: View[] = [
  {
    id: "network",
    name: "Azure network security",
    nodes: [
      { id: "net", label: "Internet", x: 60, y: 60, points: ["Public traffic enters only through controlled entry points"] },
      { id: "waf", label: "App Gateway + WAF", x: 240, y: 60, points: ["Application Gateway with Web Application Firewall", "Load Balancer for distribution"] },
      { id: "fw", label: "Azure Firewall", x: 420, y: 60, points: ["Central Azure Firewall rules", "NSGs on every subnet"] },
      { id: "onprem", label: "On-premises", x: 60, y: 200, points: ["Connected over ExpressRoute", "Site-to-Site and Point-to-Site VPN Gateway"] },
      { id: "vnet", label: "VNets & NSGs", x: 240, y: 200, points: ["Segmented environments on separate VNets", "Bastion for admin access, no public RDP/SSH", "100+ Azure VMs operated at FinIQ"] },
      { id: "pe", label: "Private Endpoints", x: 420, y: 200, points: ["Private Endpoints with Private DNS", "Key Vault for secrets and certificates"] },
      { id: "dfc", label: "Defender for Cloud", x: 600, y: 130, points: ["Secure Score reviews against CIS and MCSB", "Azure Policy for guardrails", "Network Watcher for diagnostics"] },
    ],
    links: [["net", "waf"], ["waf", "fw"], ["onprem", "vnet"], ["fw", "vnet"], ["vnet", "pe"], ["fw", "dfc"], ["pe", "dfc"]],
  },
  {
    id: "identity",
    name: "Hybrid identity & access",
    nodes: [
      { id: "ad", label: "On-prem AD", x: 60, y: 130, points: ["Hybrid Active Directory"] },
      { id: "sync", label: "Entra Connect", x: 230, y: 130, points: ["Directory sync to the cloud"] },
      { id: "entra", label: "Entra ID", x: 400, y: 130, points: ["250+ users at RealThingks", "450+ users at FinIQ"] },
      { id: "ca", label: "Conditional Access + MFA", x: 600, y: 50, points: ["MFA rollout for every user", "Conditional Access policies"] },
      { id: "pim", label: "RBAC · PIM", x: 600, y: 130, points: ["Least-privilege RBAC", "PIM and access reviews"] },
      { id: "sso", label: "SSO apps", x: 600, y: 210, points: ["SSO for 10+ applications"] },
    ],
    links: [["ad", "sync"], ["sync", "entra"], ["entra", "ca"], ["entra", "pim"], ["entra", "sso"]],
  },
];

export const SecurityArchitecture: React.FC = () => {
  const [viewId, setViewId] = useState(views[0].id);
  const view = views.find((v) => v.id === viewId)!;
  const [active, setActive] = useState<string>(view.nodes[0].id);
  const node = view.nodes.find((n) => n.id === active) ?? view.nodes[0];
  const pos = (id: string) => view.nodes.find((n) => n.id === id)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 border border-[#8C6D4F]/40 bg-[#100D0B] p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs tracking-[0.18em] text-[#D4AF37]">ARCHITECTURE · TAP A BOX</span>
          <h3 className="mt-2 font-display text-4xl uppercase leading-none text-white sm:text-5xl">How I secure Azure</h3>
        </div>
        <div role="tablist" aria-label="Architecture view" className="flex flex-wrap gap-2">
          {views.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={v.id === viewId}
              onClick={() => { setViewId(v.id); setActive(v.nodes[0].id); }}
              className={`border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${v.id === viewId ? "border-[#D4AF37] bg-[#D4AF37] text-black" : "border-[#8C6D4F]/50 text-[#E8DFD8] hover:border-[#D4AF37]"}`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="overflow-x-auto">
          <svg viewBox="0 0 700 260" className="min-w-[560px] w-full" role="group" aria-label={view.name}>
            {view.links.map(([a, b]) => {
              const p = pos(a), q = pos(b);
              const hot = a === active || b === active;
              return (
                <g key={a + b}>
                  <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={hot ? "#D4AF37" : "#8C6D4F"} strokeOpacity={hot ? 0.9 : 0.35} strokeWidth={hot ? 2 : 1} />
                  <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#F5D59A" strokeWidth="2" strokeDasharray="4 14" className="arch-flow" opacity={hot ? 0.9 : 0.25} />
                </g>
              );
            })}
            {view.nodes.map((n) => {
              const on = n.id === active;
              const w = Math.max(110, n.label.length * 7.4 + 24);
              return (
                <g
                  key={n.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={on}
                  aria-label={n.label}
                  onClick={() => setActive(n.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(n.id); } }}
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-white"
                >
                  <rect x={n.x - w / 2} y={n.y - 18} width={w} height={36} rx={2} fill={on ? "#D4AF37" : "#0A0806"} stroke={on ? "#F5D59A" : "#8C6D4F"} strokeWidth={on ? 2 : 1} />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={on ? "#000" : "#E8DFD8"} style={{ letterSpacing: "0.04em" }}>
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={view.id + node.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
            className="border-l-2 border-[#D4AF37] bg-black/30 p-4"
          >
            <span className="font-mono text-[11px] text-[#D4AF37]">SELECTED</span>
            <h4 className="mt-1 font-display text-3xl uppercase text-white">{node.label}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-[#CFC2B5]">
              {node.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SecurityArchitecture;
