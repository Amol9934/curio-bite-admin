"use client";
import { Bell, RefreshCw, Search, Plus, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import { useRouter } from "next/navigation";

export default function Navbar({ onRefresh, loading, onAdd, totalCount }) {
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  };

  const t = {
    bg:         isDark ? "#161612" : "#FFFFFF",
    border:     isDark ? "#2A2A25" : "#EBEBE6",
    dimText:    isDark ? "#4A4A42" : "#BFBFB5",
    mainText:   isDark ? "#C8C8B8" : "#2C2C28",
    pillBg:     isDark ? "#232318" : "#F0EBE0",
    pillColor:  isDark ? "#A89870" : "#7A6840",
    pillBorder: isDark ? "#3A3A2E" : "#DDD5C0",
    btnBg:      isDark ? "#1E1E18" : "#F5F4F0",
    btnBorder:  isDark ? "#2A2A25" : "#E4E2DC",
    iconColor:  isDark ? "#5A5A50" : "#A0A090",
    inputBg:    isDark ? "#1A1A15" : "#F8F7F4",
    inputColor: isDark ? "#A0A090" : "#5A5A50",
  };

  const iconBtn = (onClick, children, extra = {}) => (
    <button onClick={onClick} style={{
      width: "32px", height: "32px",
      background: t.btnBg, border: `1px solid ${t.btnBorder}`,
      borderRadius: "8px", display: "flex", alignItems: "center",
      justifyContent: "center", cursor: "pointer", transition: "background 0.2s",
      ...extra,
    }}
      onMouseEnter={e => e.currentTarget.style.background = isDark ? "#252520" : "#EEECEA"}
      onMouseLeave={e => e.currentTarget.style.background = t.btnBg}
    >{children}</button>
  );

  return (
    <header style={{
      height: "56px", background: t.bg,
      borderBottom: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 22px", position: "sticky", top: 0, zIndex: 10,
      transition: "background 0.4s",
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "13px", color: t.dimText, fontWeight: 400 }}>Curio Bite</span>
        <span style={{ color: t.dimText, fontSize: "16px", lineHeight: 1 }}>·</span>
        <span style={{ fontSize: "13px", color: t.mainText, fontWeight: 500 }}>Content Manager</span>
        <span style={{
          fontSize: "11px", fontWeight: 500,
          background: t.pillBg, color: t.pillColor,
          padding: "2px 9px", borderRadius: "20px",
          border: `1px solid ${t.pillBorder}`, marginLeft: "4px",
        }}>{totalCount} entries</span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={13} strokeWidth={1.6} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: t.iconColor }} />
          <input type="text" placeholder="Search..." style={{
            paddingLeft: "30px", paddingRight: "10px", height: "32px",
            fontSize: "12px", background: t.inputBg,
            border: `1px solid ${t.btnBorder}`, borderRadius: "8px",
            color: t.inputColor, outline: "none", width: "160px",
            fontFamily: "inherit",
          }} />
        </div>

        {iconBtn(onRefresh,
          <RefreshCw size={13} strokeWidth={1.6} color={loading ? "#8B7355" : t.iconColor}
            style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
        )}

        {iconBtn(null,
          <div style={{ position: "relative" }}>
            <Bell size={13} strokeWidth={1.6} color={t.iconColor} />
            <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "5px", height: "5px", background: "#B07050", borderRadius: "50%", border: `1.5px solid ${t.bg}` }} />
          </div>
        )}

        {/* Theme toggle */}
        {iconBtn(toggleTheme,
          isDark
            ? <Sun size={13} strokeWidth={1.6} color="#C8A870" />
            : <Moon size={13} strokeWidth={1.6} color="#7A6840" />,
          { background: isDark ? "#221E14" : "#F4EFE2", border: `1px solid ${isDark ? "#3A3420" : "#DDD0B0"}` }
        )}

        <div style={{ width: "1px", height: "20px", background: t.border, margin: "0 4px" }} />

        {/* Add */}
        <button onClick={onAdd}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? "#2E2820" : "#252218"}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? "#242018" : "#2C2C28"}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "0 14px", height: "32px",
            background: isDark ? "#242018" : "#2C2C28",
            border: "none", borderRadius: "8px",
            color: isDark ? "#C8B88A" : "#D4C090",
            fontSize: "12px", fontWeight: 500,
            cursor: "pointer", transition: "background 0.2s",
            fontFamily: "inherit",
          }}>
          <Plus size={13} strokeWidth={1.8} />
          New Entry
        </button>

        {/* Logout */}
        <button onClick={handleLogout}
          onMouseEnter={e => { e.currentTarget.style.background = isDark ? "#221818" : "#FBF0EE"; e.currentTarget.style.borderColor = isDark ? "#3A2828" : "#E8C8C0"; }}
          onMouseLeave={e => { e.currentTarget.style.background = t.btnBg; e.currentTarget.style.borderColor = t.btnBorder; }}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "0 12px", height: "32px",
            background: t.btnBg, border: `1px solid ${t.btnBorder}`,
            borderRadius: "8px", color: isDark ? "#906050" : "#A06050",
            fontSize: "12px", fontWeight: 400,
            cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
          }}>
          <LogOut size={12} strokeWidth={1.6} />
          Sign out
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </header>
  );
}