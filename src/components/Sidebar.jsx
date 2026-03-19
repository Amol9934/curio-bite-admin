"use client";
import { useState } from "react";
import { LayoutDashboard, FileText, BookOpen, Settings, BarChart2, Users, HelpCircle, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

const navSections = [
  { label: "Main", items: [
    { icon: LayoutDashboard, label: "Dashboard", badge: null },
    { icon: FileText, label: "Content", badge: "12" },
    { icon: BookOpen, label: "Topics", badge: null },
    { icon: BarChart2, label: "Analytics", badge: null },
  ]},
  { label: "Manage", items: [
    { icon: Users, label: "Authors", badge: null },
    { icon: Settings, label: "Settings", badge: null },
    { icon: HelpCircle, label: "Help", badge: null },
  ]},
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const { isDark } = useTheme();

  const t = {
    bg:            isDark ? "#161612" : "#FAFAF8",
    border:        isDark ? "#2A2A25" : "#EBEBE6",
    sectionLabel:  isDark ? "#4A4A42" : "#BFBFB5",
    textMuted:     isDark ? "#6A6A60" : "#8A8A80",
    textActive:    isDark ? "#D4C9A8" : "#5C4F2A",
    activeBg:      isDark ? "#232318" : "#F0EBE0",
    activeIconBg:  isDark ? "#2E2E22" : "#E8E0CC",
    hoverBg:       isDark ? "#1E1E18" : "#F4F2EE",
    iconBg:        isDark ? "#1E1E18" : "#F0EEE8",
    badgeBg:       isDark ? "#2A2A22" : "#EDE8DC",
    badgeColor:    isDark ? "#A89870" : "#7A6840",
    namColor:      isDark ? "#C8C8B8" : "#2C2C28",
    emailColor:    isDark ? "#4A4A42" : "#9A9A8E",
    logoText:      isDark ? "#E8E8DC" : "#1A1A16",
  };

  return (
    <aside style={{
      width: "224px", minHeight: "100vh",
      background: t.bg,
      borderRight: `1px solid ${t.border}`,
      display: "flex", flexDirection: "column", flexShrink: 0,
      transition: "background 0.4s",
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 18px 18px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: isDark ? "#2A2820" : "#2C2C28",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: isDark ? "#C8B88A" : "#C8B070", letterSpacing: "-0.5px" }}>cb</span>
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: t.logoText, margin: 0, letterSpacing: "-0.2px" }}>Curio Bite</p>
            <p style={{ fontSize: "10px", color: t.sectionLabel, margin: 0, letterSpacing: "0.3px" }}>Admin Console</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
        {navSections.map(section => (
          <div key={section.label} style={{ marginBottom: "20px" }}>
            <p style={{
              fontSize: "10px", fontWeight: 500, color: t.sectionLabel,
              letterSpacing: "0.8px", textTransform: "uppercase",
              padding: "0 10px", marginBottom: "4px",
            }}>{section.label}</p>
            {section.items.map(item => {
              const isActive = active === item.label;
              return (
                <button key={item.label} onClick={() => setActive(item.label)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 10px", borderRadius: "8px", border: "none",
                    background: isActive ? t.activeBg : "transparent",
                    cursor: "pointer", marginBottom: "1px", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = t.hoverBg; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "7px",
                      background: isActive ? t.activeIconBg : t.iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <item.icon size={13} color={isActive ? t.textActive : t.textMuted} strokeWidth={1.8} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: isActive ? 500 : 400, color: isActive ? t.textActive : t.textMuted }}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge
                    ? <span style={{ fontSize: "10px", fontWeight: 500, background: t.badgeBg, color: t.badgeColor, padding: "1px 7px", borderRadius: "20px" }}>{item.badge}</span>
                    : isActive ? <ChevronRight size={12} color={t.textActive} strokeWidth={1.8} /> : null
                  }
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: "10px", borderTop: `1px solid ${t.border}` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "8px 10px", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = t.hoverBg}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: isDark ? "#2E2820" : "#2C2C28",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: 500, color: isDark ? "#C8B88A" : "#C8B070", flexShrink: 0,
          }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12px", fontWeight: 500, color: t.namColor, margin: 0 }}>Admin User</p>
            <p style={{ fontSize: "10px", color: t.emailColor, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>admin@curiobite.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
}