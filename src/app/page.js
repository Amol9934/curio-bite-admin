"use client";
import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Search, FileText, Users, Eye, ChevronLeft, ChevronRight,
         BookOpen, Database, Filter, X, Plus, RefreshCw,
         ChevronRight as Arrow, Edit2 } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DataTable from "@/components/DataTable";
import ContentForm from "@/components/ContentForm";
import DeleteModal from "@/components/DeleteModal";

const ITEMS_PER_PAGE = 10;

const CSV_FILES = [
  { key: "data",   label: "Main Data", desc: "Core knowledge cards" },
  { key: "ai",     label: "AI",        desc: "Artificial Intelligence topics" },
  { key: "webdev", label: "Web Dev",   desc: "Web Development topics" },
];

const AGE_RANGES = [
  { label: "All ages", min: 0,  max: 999 },
  { label: "15 – 17",  min: 15, max: 17  },
  { label: "18 – 20",  min: 18, max: 20  },
  { label: "21 – 24",  min: 21, max: 24  },
  { label: "25 – 30",  min: 25, max: 30  },
];

//  Stat Card
function StatCard({ icon: Icon, label, value, delta }) {
  const { isDark } = useTheme();
  return (
    <div style={{ background: isDark ? "#161612" : "#FFF", border: `1px solid ${isDark ? "#242420" : "#EBEBEB"}`, borderRadius: "12px", padding: "16px 18px", transition: "box-shadow 0.2s", cursor: "default" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,${isDark ? 0.2 : 0.06})`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ width: "30px", height: "30px", background: isDark ? "#1E1E18" : "#F4F2EC", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color={isDark ? "#5A5A50" : "#8A8878"} strokeWidth={1.6} />
        </div>
        {delta && <span style={{ fontSize: "10px", fontWeight: 500, background: isDark ? "#1E2018" : "#F0F4EC", color: isDark ? "#7A9060" : "#5A7040", padding: "2px 7px", borderRadius: "20px" }}>{delta}</span>}
      </div>
      <p style={{ fontSize: "24px", fontWeight: 600, color: isDark ? "#C8C8B8" : "#1A1A16", margin: "0 0 3px", letterSpacing: "-0.5px" }}>{value}</p>
      <p style={{ fontSize: "11px", color: isDark ? "#4A4A40" : "#9A9A90", margin: 0 }}>{label}</p>
    </div>
  );
}

//  Row Detail Panel 
function DetailPanel({ row, onClose, onEdit, isDark }) {
  if (!row) return null;

  const bg     = isDark ? "#161612" : "#FFFFFF";
  const border = isDark ? "#2A2A25" : "#EBEBEB";
  const title  = isDark ? "#D0D0C0" : "#1A1A16";
  const label  = isDark ? "#5A5A50" : "#9A9A90";
  const value  = isDark ? "#B0B0A0" : "#2C2C28";
  const divClr = isDark ? "#222218" : "#F4F2EC";
  const hdrBg  = isDark ? "#0E0E0C" : "#F8F7F4";

  const fields = Object.entries(row).filter(([k]) => k !== "id");

  return (
    <div style={{
      width: "280px", flexShrink: 0,
      background: bg, border: `1px solid ${border}`,
      borderRadius: "14px", overflow: "hidden",
      boxShadow: `0 2px 12px rgba(0,0,0,${isDark ? 0.2 : 0.06})`,
      display: "flex", flexDirection: "column",
      fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif",
      position: "sticky", top: "0", alignSelf: "flex-start",
      maxHeight: "calc(100vh - 160px)", overflowY: "auto",
    }}>
      {/* Panel header */}
      <div style={{ padding: "14px 16px", background: hdrBg, borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 500, color: label, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>Row Detail</p>
          <p style={{ fontSize: "12px", color: title, margin: "2px 0 0", fontWeight: 500 }}>
            #{String(row.id || "—").padStart(3, "0")}
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={onEdit}
            style={{ width: "26px", height: "26px", background: isDark ? "#1E1E18" : "#F0EEE8", border: `1px solid ${isDark ? "#2E2E26" : "#E0DED4"}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isDark ? "#7A7A68" : "#7A7868" }}
            title="Edit this row"
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#2A2A22" : "#E8E4DC"}
            onMouseLeave={e => e.currentTarget.style.background = isDark ? "#1E1E18" : "#F0EEE8"}>
            <Edit2 size={11} strokeWidth={1.6} />
          </button>
          <button onClick={onClose}
            style={{ width: "26px", height: "26px", background: "transparent", border: `1px solid ${isDark ? "#2A2A22" : "#E8E6E0"}`, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isDark ? "#5A5A50" : "#9A9A88" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1E1E18" : "#F4F2EC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <X size={13} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {fields.map(([k, v]) => (
          <div key={k} style={{ paddingBottom: "12px", borderBottom: `1px solid ${divClr}` }}>
            <p style={{ fontSize: "10px", fontWeight: 500, color: label, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{k}</p>
            <p style={{ fontSize: "13px", color: value, margin: 0, lineHeight: "1.5", wordBreak: "break-word" }}>
              {v || <span style={{ color: isDark ? "#3A3A32" : "#C8C8C0", fontStyle: "italic" }}>—</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

//  Main Page 
export default function Home() {
  const { isDark } = useTheme();

  // ── Core state ──
  const [selectedFile, setSelectedFile] = useState("data");
  const [rawData, setRawData]           = useState([]);        // original S3 data
  const [filteredData, setFilteredData] = useState([]);        // after all filters
  const [loading, setLoading]           = useState(false);
  const [saving, setSaving]             = useState(false);

  // ── Filter state ──
  const [search, setSearch]             = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [ageFilter, setAgeFilter]       = useState(0);

  // ── Pagination ──
  const [page, setPage]                 = useState(1);

  // ── CRUD state ──
  const [showForm, setShowForm]         = useState(false);
  const [editData, setEditData]         = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Row detail state ──
  const [selectedRow, setSelectedRow]   = useState(null);

  // ── Theme tokens ──
  const pageBg     = isDark ? "#0E0E0C" : "#F5F4F0";
  const cardBg     = isDark ? "#161612" : "#FFFFFF";
  const cardBorder = isDark ? "#242420" : "#EBEBEB";
  const titleClr   = isDark ? "#C8C8B8" : "#1A1A16";
  const subClr     = isDark ? "#4A4A40" : "#9A9A90";
  const inputBg    = isDark ? "#1A1A15" : "#FAFAF8";
  const inputBdr   = isDark ? "#2A2A22" : "#E4E2DC";
  const inputClr   = isDark ? "#8A8A78" : "#5A5A50";
  const divClr     = isDark ? "#222218" : "#F0EEE8";

  const selectStyle = {
    padding: "0 10px", height: "32px", fontSize: "12px",
    background: inputBg, border: `1px solid ${inputBdr}`,
    borderRadius: "8px", color: inputClr, outline: "none",
    cursor: "pointer", fontFamily: "inherit",
  };

  // ── Fetch file from S3 ──
  const fetchFile = useCallback(async (file) => {
    setLoading(true);
    setRawData([]); setFilteredData([]);
    setSearch(""); setCountryFilter("all"); setAgeFilter(0);
    setSelectedRow(null); setPage(1);
    try {
      const res = await fetch(`/api/content?file=${file}`);
      const json = await res.json();
      if (json.success) {
        setRawData(json.data);
        setFilteredData(json.data);
        toast.success(`Loaded ${file}.csv — ${json.data.length} rows`);
      } else {
        toast.error(json.message || "Failed to load");
      }
    } catch { toast.error("Network error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchFile("data"); }, [fetchFile]);

  // When file tab changes
  const handleFileSelect = (key) => {
    setSelectedFile(key);
    fetchFile(key);
  };

  // ── Apply filters ──
  useEffect(() => {
    if (!rawData.length) return;
    let result = [...rawData];

    if (countryFilter !== "all") {
      result = result.filter(r => (r.country || "").toLowerCase() === countryFilter.toLowerCase());
    }

    const range = AGE_RANGES[ageFilter];
    if (range.min > 0) {
      result = result.filter(r => {
        const age = parseInt(r.age, 10);
        return !isNaN(age) && age >= range.min && age <= range.max;
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
    }

    setFilteredData(result);
    setPage(1);
  }, [search, countryFilter, ageFilter, rawData]);

  const countries    = ["all", ...Array.from(new Set(rawData.map(r => r.country).filter(Boolean))).sort()];
  const hasAgeCol    = rawData.length > 0 && "age" in rawData[0];
  const hasCountryCol = rawData.length > 0 && "country" in rawData[0];
  const activeFilters = (countryFilter !== "all" ? 1 : 0) + (ageFilter !== 0 ? 1 : 0);
  const columns      = rawData.length > 0 ? Object.keys(rawData[0]) : [];

  // ── Save to S3 — always uses selectedFile ──
  const saveToS3 = async (updatedData) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/content?file=${selectedFile}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedData }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Saved to ${selectedFile}.csv`);
        setRawData(updatedData);
        // update selected row if it was modified
        if (selectedRow) {
          const updated = updatedData.find(r => String(r.id) === String(selectedRow.id));
          setSelectedRow(updated || null);
        }
      } else {
        toast.error(json.message || "Save failed");
      }
    } catch { toast.error("Network error while saving"); }
    finally { setSaving(false); }
  };

  // ── CRUD handlers ──
  const handleFormSubmit = async (formData) => {
    let updated;
    if (editData) {
      updated = rawData.map(r => String(r.id) === String(formData.id) ? formData : r);
    } else {
      // Auto-generate id
      const maxId = rawData.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
      formData.id = String(maxId + 1);
      updated = [...rawData, formData];
    }
    await saveToS3(updated);
    setShowForm(false);
    setEditData(null);
  };

  const handleDeleteConfirm = async () => {
    const updated = rawData.filter(r => String(r.id) !== String(deleteTarget.id));
    if (selectedRow && String(selectedRow.id) === String(deleteTarget.id)) setSelectedRow(null);
    await saveToS3(updated);
    setDeleteTarget(null);
  };

  const handleRowClick = (row) => {
    setSelectedRow(prev => (prev && String(prev.id) === String(row.id)) ? null : row);
  };

  const openEdit = (row) => {
    setEditData(row);
    setShowForm(true);
  };

  const openDelete = (row) => {
    setDeleteTarget(row);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginated  = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Stats
  const subjectsCount = new Set(rawData.map(r => r.subject).filter(Boolean)).size;
  const authorsCount  = new Set(rawData.map(r => r.author).filter(Boolean)).size;

  // Pagination bar
  const PaginationBar = () => {
    if (totalPages <= 1) return null;
    const pt = isDark ? "#3A3A32" : "#B0B0A0";
    const pa = isDark ? "#242018" : "#2C2C28";
    const pat = isDark ? "#C8B88A" : "#D4C090";
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderTop: `1px solid ${cardBorder}`, background: isDark ? "#121210" : "#FAFAF8" }}>
        <p style={{ fontSize: "11px", color: pt, margin: 0 }}>
          Page {page} of {totalPages} · {filteredData.length} entries
        </p>
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "←", fn: () => setPage(p => Math.max(1, p - 1)), dis: page === 1 },
            ...Array.from({ length: Math.min(5, totalPages) }, (_, i) => ({ label: i + 1, fn: () => setPage(i + 1), active: page === i + 1 })),
            { label: "→", fn: () => setPage(p => Math.min(totalPages, p + 1)), dis: page === totalPages },
          ].map((btn, i) => (
            <button key={i} onClick={btn.fn} disabled={btn.dis}
              style={{ minWidth: "28px", height: "28px", padding: "0 6px", background: btn.active ? pa : "transparent", border: `1px solid ${btn.active ? "transparent" : cardBorder}`, borderRadius: "7px", color: btn.active ? pat : pt, fontSize: "12px", fontWeight: btn.active ? 500 : 400, cursor: btn.dis ? "not-allowed" : "pointer", opacity: btn.dis ? 0.35 : 1, fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={e => { if (!btn.active && !btn.dis) e.currentTarget.style.background = isDark ? "#1E1E18" : "#F0EEE8"; }}
              onMouseLeave={e => { if (!btn.active) e.currentTarget.style.background = "transparent"; }}
            >{btn.label}</button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: pageBg, fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif", transition: "background 0.4s" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: isDark ? "#1E1E18" : "#FFF", color: isDark ? "#C8C8B8" : "#2C2C28", border: `1px solid ${isDark ? "#2A2A22" : "#E8E6E0"}`, borderRadius: "10px", fontSize: "12px", fontFamily: "'Inter',sans-serif" } }} />

      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar
          onRefresh={() => fetchFile(selectedFile)}
          loading={loading || saving}
          onAdd={() => { setEditData(null); setShowForm(true); }}
          totalCount={rawData.length}
        />

        <main style={{ flex: 1, padding: "24px 24px 40px", overflowY: "auto" }}>

          {/* ── Page header ── */}
          <div style={{ marginBottom: "22px" }}>
            <h1 style={{ fontSize: "17px", fontWeight: 600, color: titleClr, margin: "0 0 4px", letterSpacing: "-0.3px" }}>
              Data Manager
            </h1>
            <p style={{ fontSize: "13px", color: subClr, margin: 0 }}>
              changes sync to AWS S3
            </p>
          </div>

          {/* ── File selector tabs ── */}
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "14px 16px", marginBottom: "18px" }}>
            <p style={{ fontSize: "10px", fontWeight: 500, color: isDark ? "#4A4A40" : "#B0B0A0", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 10px" }}>Active dataset</p>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {CSV_FILES.map(f => {
                const isActive = selectedFile === f.key;
                return (
                  <button key={f.key} onClick={() => handleFileSelect(f.key)}
                    style={{ display: "flex", alignItems: "center", gap: "7px", padding: "7px 14px", borderRadius: "8px", border: `1px solid ${isActive ? (isDark ? "#3A3420" : "#C8BEA0") : (isDark ? "#2A2A22" : "#E8E6E0")}`, background: isActive ? (isDark ? "#242018" : "#2C2C28") : "transparent", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = isDark ? "#1E1E18" : "#F4F2EC"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                    <Database size={12} strokeWidth={1.6} color={isActive ? (isDark ? "#C8B88A" : "#D4C090") : (isDark ? "#4A4A40" : "#9A9A88")} />
                    <span style={{ fontSize: "12px", fontWeight: isActive ? 500 : 400, color: isActive ? (isDark ? "#C8B88A" : "#D4C090") : (isDark ? "#5A5A50" : "#8A8A80") }}>{f.label}</span>
                    {isActive && <span style={{ fontSize: "10px", color: isDark ? "#7A7060" : "#A89870", marginLeft: "2px" }}>{rawData.length}</span>}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: `1px solid ${divClr}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "11px", color: subClr, margin: 0 }}>
                {CSV_FILES.find(f => f.key === selectedFile)?.desc}
                {saving && <span style={{ marginLeft: "8px", color: isDark ? "#A89058" : "#8A7040" }}>· Saving...</span>}
              </p>
              <button onClick={() => fetchFile(selectedFile)}
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 10px", height: "26px", background: "transparent", border: `1px solid ${isDark ? "#2A2A22" : "#E4E2DC"}`, borderRadius: "7px", color: isDark ? "#5A5A50" : "#9A9A88", fontSize: "11px", cursor: "pointer", fontFamily: "inherit" }}>
                <RefreshCw size={11} strokeWidth={1.6} />
                Refresh
              </button>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "18px" }}>
            <StatCard icon={FileText} label="Total rows" value={rawData.length} />
            <StatCard icon={BookOpen} label="Subjects" value={subjectsCount} />
            <StatCard icon={Users}    label="Contributors" value={authorsCount} />
            <StatCard icon={Eye}      label="Filtered" value={filteredData.length} />
          </div>

          {/* ── Filter + action bar ── */}
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "12px 16px", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: "180px" }}>
                <Search size={12} strokeWidth={1.6} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#3A3A32" : "#C0C0B0" }} />
                <input type="text" placeholder="Search entries..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ ...selectStyle, paddingLeft: "28px", width: "100%" }}
                  onFocus={e => e.target.style.borderColor = isDark ? "#4A4438" : "#C0B898"}
                  onBlur={e => e.target.style.borderColor = inputBdr}
                />
              </div>

              {/* Country filter — only if column exists */}
              {hasCountryCol && (
                <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} style={selectStyle}>
                  {countries.map(c => <option key={c} value={c}>{c === "all" ? "All countries" : c}</option>)}
                </select>
              )}

              {/* Age filter — only if column exists */}
              {hasAgeCol && (
                <select value={ageFilter} onChange={e => setAgeFilter(Number(e.target.value))} style={selectStyle}>
                  {AGE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
                </select>
              )}

              {/* Clear filters */}
              {(activeFilters > 0 || search) && (
                <button onClick={() => { setCountryFilter("all"); setAgeFilter(0); setSearch(""); }}
                  style={{ display: "flex", alignItems: "center", gap: "4px", padding: "0 10px", height: "32px", background: isDark ? "#221818" : "#FDF4F2", border: `1px solid ${isDark ? "#382828" : "#EDD8D0"}`, borderRadius: "8px", color: isDark ? "#906060" : "#A06050", fontSize: "11px", cursor: "pointer", fontFamily: "inherit" }}>
                  <X size={11} strokeWidth={1.6} />
                  Clear {activeFilters > 0 ? `(${activeFilters})` : ""}
                </button>
              )}

              <span style={{ marginLeft: "auto", fontSize: "11px", color: isDark ? "#3A3A32" : "#B0B0A0", whiteSpace: "nowrap" }}>
                {filteredData.length} of {rawData.length}
              </span>

              {/* Add new row */}
              <button onClick={() => { setEditData(null); setShowForm(true); }}
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 13px", height: "32px", background: isDark ? "#242018" : "#2C2C28", border: "none", borderRadius: "8px", color: isDark ? "#C8B88A" : "#D4C090", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? "#2E2820" : "#3A3830"}
                onMouseLeave={e => e.currentTarget.style.background = isDark ? "#242018" : "#2C2C28"}>
                <Plus size={13} strokeWidth={1.8} />
                Add Row
              </button>
            </div>
          </div>

          {/* ── Table + Detail panel ── */}
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            {/* Table card */}
            <div style={{ flex: 1, minWidth: 0, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "14px", overflow: "hidden", boxShadow: `0 1px 4px rgba(0,0,0,${isDark ? 0.15 : 0.04})` }}>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 20px", gap: "14px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${isDark ? "#2A2A22" : "#EBEBEB"}`, borderTopColor: isDark ? "#8A7A58" : "#8A7A50", animation: "spin 1s linear infinite" }} />
                  <p style={{ fontSize: "12px", color: subClr, margin: 0 }}>Loading {selectedFile}.csv from S3...</p>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              ) : (
                <DataTable
                  data={paginated}
                  onEdit={openEdit}
                  onDelete={openDelete}
                  onRowClick={handleRowClick}
                  selectedRowId={selectedRow?.id}
                />
              )}
              <PaginationBar />
            </div>

            {/* Detail panel */}
            {selectedRow && (
              <DetailPanel
                row={selectedRow}
                isDark={isDark}
                onClose={() => setSelectedRow(null)}
                onEdit={() => openEdit(selectedRow)}
              />
            )}
          </div>

          {/* Hint text when no row selected */}
          {!selectedRow && !loading && filteredData.length > 0 && (
            <p style={{ fontSize: "11px", color: isDark ? "#3A3A32" : "#C0C0B8", marginTop: "10px", textAlign: "center" }}>
              Click any row to view its details
            </p>
          )}
        </main>
      </div>

      {/* CRUD modals */}
      {showForm && (
        <ContentForm
          editData={editData}
          columns={columns}
          onSubmit={handleFormSubmit}
          onClose={() => { setShowForm(false); setEditData(null); }}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.topic || deleteTarget.id || "this entry"}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
