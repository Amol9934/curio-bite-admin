"use client";
import { X } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

export default function DeleteModal({ onConfirm, onClose, itemName }) {
  const { isDark } = useTheme();

  const t = {
    bg:       isDark ? "#161612" : "#FFFFFF",
    border:   isDark ? "#2A2A25" : "#EBEBEB",
    title:    isDark ? "#C8C8B8" : "#1A1A16",
    body:     isDark ? "#4A4A40" : "#7A7A70",
    name:     isDark ? "#A0A090" : "#3A3A30",
    footerBg: isDark ? "#121210" : "#FAFAF8",
    inputBorder: isDark ? "#2A2A22" : "#E0DEDA",
    cancelColor: isDark ? "#5A5A50" : "#7A7A70",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "16px" }}>
      <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: "16px", width: "100%", maxWidth: "380px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif" }}>
        <div style={{ padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            {/* Icon */}
            <div style={{ width: "38px", height: "38px", background: isDark ? "#221818" : "#F8F0EE", border: `1px solid ${isDark ? "#382828" : "#E8D0C8"}`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#906060" : "#A06050"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </div>
            <button onClick={onClose} style={{ width: "28px", height: "28px", background: "transparent", border: `1px solid ${t.inputBorder}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.cancelColor }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1E1E18" : "#F4F2EC"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <X size={13} strokeWidth={1.6} />
            </button>
          </div>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: t.title, margin: "0 0 8px", letterSpacing: "-0.2px" }}>Remove this entry?</h3>
          <p style={{ fontSize: "13px", color: t.body, margin: 0, lineHeight: "1.6" }}>
            You are about to permanently delete{" "}
            <span style={{ color: t.name, fontWeight: 500 }}>"{itemName}"</span>.
            {" "}This action cannot be reversed.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", padding: "14px 24px", borderTop: `1px solid ${t.border}`, background: t.footerBg }}>
          <button onClick={onClose} style={{ flex: 1, height: "38px", background: "transparent", border: `1px solid ${t.inputBorder}`, borderRadius: "8px", color: t.cancelColor, fontSize: "13px", fontWeight: 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1A1A14" : "#F2F0EC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ flex: 1, height: "38px", background: isDark ? "#2A1818" : "#7A3828", border: "none", borderRadius: "8px", color: isDark ? "#D09080" : "#F0D0C0", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#381E1E" : "#6A2E20"}
            onMouseLeave={e => e.currentTarget.style.background = isDark ? "#2A1818" : "#7A3828"}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}