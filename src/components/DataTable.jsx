"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

const SUBJECT_LIGHT = {
  Math:             { bg: "#EEF2F8", color: "#3A5278", border: "#D0DAE8" },
  Science:          { bg: "#EEF6EE", color: "#3A6040", border: "#C8DEC8" },
  History:          { bg: "#F6F0E8", color: "#6A4E28", border: "#DDD0B8" },
  English:          { bg: "#F4EEF6", color: "#5A3A68", border: "#D8C8E0" },
  Geography:        { bg: "#EEF4F2", color: "#2E5850", border: "#C0D8D0" },
  Computer:         { bg: "#F0EEF8", color: "#3E3878", border: "#CEC8E8" },
  Art:              { bg: "#F6EEEE", color: "#683A3A", border: "#E0C8C8" },
  AI:               { bg: "#F0F4F8", color: "#2A4A68", border: "#C8D8E8" },
  "Web Development":{ bg: "#EEF8F4", color: "#2A5844", border: "#C0DCD4" },
  default:          { bg: "#F2F0EC", color: "#5A5038", border: "#D8D0C0" },
};
const SUBJECT_DARK = {
  Math:             { bg: "#1A2030", color: "#8AA4C8", border: "#28304A" },
  Science:          { bg: "#182218", color: "#80A880", border: "#263226" },
  History:          { bg: "#261E10", color: "#C8A060", border: "#3A2E18" },
  English:          { bg: "#221828", color: "#B090C0", border: "#342040" },
  Geography:        { bg: "#182220", color: "#70B0A8", border: "#243430" },
  Computer:         { bg: "#1C1828", color: "#9090C8", border: "#2A2840" },
  Art:              { bg: "#281818", color: "#C08080", border: "#402828" },
  AI:               { bg: "#182028", color: "#7090B8", border: "#243040" },
  "Web Development":{ bg: "#182420", color: "#70A890", border: "#243830" },
  default:          { bg: "#201E18", color: "#A89870", border: "#302E24" },
};

const AV_BG    = ["#2C3040","#1E3020","#302010","#281828","#182828","#282010","#301820","#1C2830"];
const AV_COLOR = ["#90A8D0","#88C088","#C0A060","#B080C0","#70B0A8","#C0A040","#C08090","#70A8C0"];
const getAvIdx = name => !name ? 0 : name.charCodeAt(0) % AV_BG.length;

export default function DataTable({ data, onEdit, onDelete, onRowClick, selectedRowId, readOnly = false }) {
  const [hovered, setHovered] = useState(null);
  const { isDark } = useTheme();

  const SUBJ = isDark ? SUBJECT_DARK : SUBJECT_LIGHT;
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const thColor       = isDark ? "#3A3A32" : "#B0B0A0";
  const rowBorder     = isDark ? "#222218" : "#F2F0EC";
  const rowHoverBg    = isDark ? "#1C1C16" : "#FAFAF6";
  const rowSelectedBg = isDark ? "#1E1C14" : "#F6F3EC";
  const rowSelectedBorder = isDark ? "#3A3420" : "#E0D8C0";
  const cellColor     = isDark ? "#C0C0B0" : "#2C2C24";
  const mutedColor    = isDark ? "#4A4A40" : "#A0A090";
  const idBg          = isDark ? "#1E1E18" : "#F4F2EC";
  const idColor       = isDark ? "#4A4A40" : "#A0A090";

  if (!data.length) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 20px", textAlign: "center" }}>
      <div style={{ width: "44px", height: "44px", background: isDark ? "#1E1E18" : "#F2F0EC", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#3A3A32" : "#C0C0B0"} strokeWidth="1.4">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
      <p style={{ fontSize: "13px", fontWeight: 500, color: isDark ? "#4A4A40" : "#8A8A80", margin: "0 0 4px" }}>No entries found</p>
      <p style={{ fontSize: "12px", color: isDark ? "#323228" : "#C0C0B0", margin: 0 }}>Try adjusting your filters or add a new entry</p>
    </div>
  );

  const renderCell = (col, val) => {
    if (col === "id") return (
      <span style={{ fontFamily: "monospace", fontSize: "10px", background: idBg, color: idColor, padding: "2px 7px", borderRadius: "5px" }}>
        {String(val || "").padStart(3, "0")}
      </span>
    );
    if (col === "subject") {
      const s = SUBJ[val] || SUBJ.default;
      return <span style={{ fontSize: "10px", fontWeight: 500, background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "2px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>{val || "—"}</span>;
    }
    if (col === "author") {
      const avIdx = getAvIdx(val);
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: AV_BG[avIdx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 500, color: AV_COLOR[avIdx], flexShrink: 0 }}>
            {val ? val[0].toUpperCase() : "?"}
          </div>
          <span style={{ fontSize: "12px", color: mutedColor }}>{val || "—"}</span>
        </div>
      );
    }
    if (col === "topic") return <span style={{ fontSize: "12px", fontWeight: 500, color: cellColor }}>{val || "—"}</span>;
    if (col === "description") return <span style={{ fontSize: "12px", color: mutedColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "200px" }}>{val || "—"}</span>;
    if (col === "date") return <span style={{ fontSize: "11px", color: mutedColor, fontFamily: "monospace" }}>{val || "—"}</span>;
    if (col === "age") return <span style={{ fontSize: "12px", color: mutedColor, fontVariantNumeric: "tabular-nums" }}>{val || "—"}</span>;
    return <span style={{ fontSize: "12px", color: mutedColor }}>{val || "—"}</span>;
  };

  return (
    <div style={{ overflowX: "auto", fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${rowBorder}` }}>
            {columns.map(col => (
              <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 500, color: thColor, textTransform: "uppercase", letterSpacing: "0.6px", whiteSpace: "nowrap" }}>{col}</th>
            ))}
            <th style={{ padding: "10px 16px", width: "80px" }} />
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const isHov = hovered === idx;
            const isSelected = selectedRowId !== null && selectedRowId !== undefined && String(row.id) === String(selectedRowId);
            return (
              <tr key={idx}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: `1px solid ${isSelected ? rowSelectedBorder : rowBorder}`,
                  background: isSelected ? rowSelectedBg : isHov ? rowHoverBg : "transparent",
                  transition: "background 0.15s",
                  cursor: "pointer",
                  borderLeft: isSelected ? `2px solid ${isDark ? "#A89858" : "#9A8848"}` : "2px solid transparent",
                }}
              >
                {columns.map(col => (
                  <td key={col} style={{ padding: "11px 16px", maxWidth: col === "description" ? "220px" : "auto" }}>
                    {renderCell(col, row[col])}
                  </td>
                ))}
                {/* Action buttons — always shown, not readOnly-gated */}
                <td style={{ padding: "11px 16px" }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: "5px", opacity: isHov || isSelected ? 1 : 0, transition: "opacity 0.15s" }}>
                    {onEdit && (
                      <button onClick={() => onEdit(row)}
                        title="Edit"
                        style={{ width: "26px", height: "26px", background: isDark ? "#1E1E18" : "#F4F2EC", border: `1px solid ${isDark ? "#2E2E26" : "#E0DED4"}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isDark ? "#7A7A68" : "#7A7868", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = isDark ? "#2A2A22" : "#EAE8E0"; e.currentTarget.style.borderColor = isDark ? "#3A3A2E" : "#C8C4B8"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = isDark ? "#1E1E18" : "#F4F2EC"; e.currentTarget.style.borderColor = isDark ? "#2E2E26" : "#E0DED4"; }}>
                        <Pencil size={11} strokeWidth={1.6} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)}
                        title="Delete"
                        style={{ width: "26px", height: "26px", background: isDark ? "#221818" : "#F8F0EE", border: `1px solid ${isDark ? "#382828" : "#E8D0C8"}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isDark ? "#906060" : "#A06050", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = isDark ? "#2E1E1E" : "#F0E0D8"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = isDark ? "#221818" : "#F8F0EE"; }}>
                        <Trash2 size={11} strokeWidth={1.6} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}