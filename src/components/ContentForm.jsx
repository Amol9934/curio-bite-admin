"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

// Static subjects list for subject field
const SUBJECTS = ["Math", "Science", "History", "English", "Geography", "Computer", "Art", "AI", "Web Development", "Other"];

export default function ContentForm({ onSubmit, onClose, editData, columns }) {
  const { isDark } = useTheme();
  const [form, setForm] = useState({});

  // Build empty form from actual columns, or fallback defaults
  useEffect(() => {
    const cols = columns && columns.length > 0
      ? columns
      : ["id", "subject", "topic", "description", "author", "date"];

    if (editData) {
      setForm(editData);
    } else {
      const empty = {};
      cols.forEach(col => { empty[col] = ""; });
      empty.id = Date.now().toString();
      setForm(empty);
    }
  }, [editData, columns]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const cols = columns || ["subject", "topic", "description"];
    const required = cols.filter(c => ["subject", "topic", "description", "name", "title"].includes(c));
    const missing = required.filter(c => !form[c]);
    if (missing.length > 0) {
      alert(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    onSubmit(form);
  };

  const t = {
    bg:          isDark ? "#161612" : "#FFFFFF",
    border:      isDark ? "#2A2A25" : "#EBEBEB",
    title:       isDark ? "#D0D0C0" : "#1A1A16",
    sub:         isDark ? "#4A4A42" : "#9A9A90",
    label:       isDark ? "#5A5A50" : "#8A8A80",
    inputBg:     isDark ? "#1A1A15" : "#FAFAF8",
    inputBorder: isDark ? "#2A2A22" : "#E4E2DC",
    inputColor:  isDark ? "#B0B0A0" : "#2C2C28",
    footerBg:    isDark ? "#121210" : "#FAFAF8",
    cancelColor: isDark ? "#5A5A50" : "#7A7A70",
    divColor:    isDark ? "#222218" : "#F0EEE8",
  };

  const inp = {
    width: "100%", padding: "9px 12px",
    background: t.inputBg, border: `1px solid ${t.inputBorder}`,
    borderRadius: "8px", color: t.inputColor,
    fontSize: "13px", outline: "none", boxSizing: "border-box",
    fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "11px", fontWeight: 500,
    color: t.label, marginBottom: "5px", letterSpacing: "0.2px",
    textTransform: "capitalize",
  };

  // Render the right input type per column name
  const renderField = (col) => {
    if (col === "id") return null; // skip id — auto-generated

    if (col === "subject") return (
      <div key={col}>
        <label style={labelStyle}>Subject</label>
        <select name="subject" value={form.subject || ""} onChange={handleChange}
          style={{ ...inp, cursor: "pointer" }}>
          <option value="">Select a subject...</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    );

    if (col === "description") return (
      <div key={col}>
        <label style={labelStyle}>Description</label>
        <textarea name="description" value={form.description || ""} onChange={handleChange}
          rows={3} placeholder="A brief explanation..."
          style={{ ...inp, resize: "none", lineHeight: "1.6" }}
          onFocus={e => e.target.style.borderColor = isDark ? "#4A4438" : "#C0B898"}
          onBlur={e => e.target.style.borderColor = t.inputBorder} />
      </div>
    );

    if (col === "date") return (
      <div key={col}>
        <label style={labelStyle}>Date</label>
        <input type="date" name="date" value={form.date || ""} onChange={handleChange}
          style={inp}
          onFocus={e => e.target.style.borderColor = isDark ? "#4A4438" : "#C0B898"}
          onBlur={e => e.target.style.borderColor = t.inputBorder} />
      </div>
    );

    if (col === "age") return (
      <div key={col}>
        <label style={labelStyle}>Age</label>
        <input type="number" name="age" value={form.age || ""} onChange={handleChange}
          min="10" max="60" placeholder="e.g. 22"
          style={inp}
          onFocus={e => e.target.style.borderColor = isDark ? "#4A4438" : "#C0B898"}
          onBlur={e => e.target.style.borderColor = t.inputBorder} />
      </div>
    );

    // Default: text input for topic, author, country, city, name, etc.
    return (
      <div key={col}>
        <label style={labelStyle}>{col}</label>
        <input type="text" name={col} value={form[col] || ""} onChange={handleChange}
          placeholder={`Enter ${col}...`}
          style={inp}
          onFocus={e => e.target.style.borderColor = isDark ? "#4A4438" : "#C0B898"}
          onBlur={e => e.target.style.borderColor = t.inputBorder} />
      </div>
    );
  };

  // Group fields: put short fields side by side
  const SHORT_FIELDS = ["age", "date", "country", "city", "author"];
  const allCols = (columns || Object.keys(form)).filter(c => c !== "id");

  // Separate into singles (description) and pairs
  const singles = allCols.filter(c => c === "description" || c === "subject");
  const pairs   = allCols.filter(c => !singles.includes(c));

  // Chunk pairs into groups of 2
  const paired = [];
  for (let i = 0; i < pairs.length; i += 2) {
    paired.push(pairs.slice(i, i + 2));
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "16px" }}>
      <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: "16px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: t.title, margin: 0, letterSpacing: "-0.2px" }}>
              {editData ? "Edit Entry" : "New Entry"}
            </h2>
            <p style={{ fontSize: "12px", color: t.sub, margin: "3px 0 0" }}>
              {editData ? "Update this record" : "Add a new row to this dataset"}
            </p>
          </div>
          <button onClick={onClose}
            style={{ width: "28px", height: "28px", background: "transparent", border: `1px solid ${t.inputBorder}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.label }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1E1E18" : "#F4F2EC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <X size={14} strokeWidth={1.6} />
          </button>
        </div>

        {/* Scrollable fields */}
        <div style={{ padding: "18px 22px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Singles (subject, description) */}
          {singles.map(col => renderField(col))}

          {/* Paired fields */}
          {paired.map((group, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: group.length === 2 ? "1fr 1fr" : "1fr", gap: "12px" }}>
              {group.map(col => renderField(col))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: "10px", padding: "14px 22px", borderTop: `1px solid ${t.border}`, background: t.footerBg, flexShrink: 0 }}>
          <button onClick={onClose}
            style={{ flex: 1, height: "38px", background: "transparent", border: `1px solid ${t.inputBorder}`, borderRadius: "8px", color: t.cancelColor, fontSize: "13px", fontWeight: 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1A1A14" : "#F2F0EC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Cancel
          </button>
          <button onClick={handleSubmit}
            style={{ flex: 1, height: "38px", background: isDark ? "#242018" : "#2C2C28", border: "none", borderRadius: "8px", color: isDark ? "#C8B88A" : "#D4C090", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#2E2820" : "#3A3830"}
            onMouseLeave={e => e.currentTarget.style.background = isDark ? "#242018" : "#2C2C28"}>
            {editData ? "Save Changes" : "Create Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}