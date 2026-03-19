"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const json = await res.json();
      if (json.success) { router.push("/"); router.refresh(); }
      else setError(json.message || "Invalid credentials");
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const inp = {
    width: "100%", paddingLeft: "38px", paddingRight: "12px",
    height: "42px", fontSize: "13px",
    background: "#FAFAF8", border: "1px solid #E4E2DC",
    borderRadius: "8px", color: "#2C2C28", outline: "none",
    boxSizing: "border-box", fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F5F4F0",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "'Inter','Helvetica Neue',Helvetica,sans-serif",
    }}>
      {/* Subtle texture dots */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(#DDDAD0 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.5, pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "380px", position: "relative" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "40px", height: "40px", background: "#2C2C28", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#C8B070", letterSpacing: "-0.5px" }}>cb</span>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#1A1A16", margin: "0 0 6px", letterSpacing: "-0.3px" }}>Curio Bite</h1>
          <p style={{ fontSize: "13px", color: "#9A9A90", margin: 0, fontWeight: 400 }}>Sign in to your admin console</p>
        </div>

        {/* Card */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E8E6E0", padding: "32px", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "#FDF4F2", border: "1px solid #EDD8D0", borderRadius: "8px" }}>
                <AlertCircle size={13} color="#A06050" strokeWidth={1.8} />
                <span style={{ fontSize: "12px", color: "#A06050" }}>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#8A8A80", marginBottom: "6px", letterSpacing: "0.2px" }}>Email address</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} strokeWidth={1.6} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#C0C0B0" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@gmail.com" required style={inp}
                  onFocus={e => e.target.style.borderColor = "#A09878"}
                  onBlur={e => e.target.style.borderColor = "#E4E2DC"} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#8A8A80", marginBottom: "6px", letterSpacing: "0.2px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={14} strokeWidth={1.6} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#C0C0B0" }} />
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...inp, paddingRight: "42px" }}
                  onFocus={e => e.target.style.borderColor = "#A09878"}
                  onBlur={e => e.target.style.borderColor = "#E4E2DC"} />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0B0A0", padding: 0, display: "flex", alignItems: "center" }}>
                  {showPass ? <EyeOff size={13} strokeWidth={1.6} /> : <Eye size={13} strokeWidth={1.6} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#3A3830"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#2C2C28"; }}
              style={{ width: "100%", height: "42px", background: loading ? "#8A8878" : "#2C2C28", border: "none", borderRadius: "8px", color: loading ? "#C8C8B8" : "#D4C090", fontSize: "13px", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "4px" }}>
              {loading ? (
                <><div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#D4C090", animation: "spin 0.8s linear infinite" }} />Signing in...</>
              ) : "Continue →"}
            </button>
          </form>

          {/* Credentials hint */}
          <div style={{ marginTop: "20px", padding: "12px 14px", background: "#FAFAF8", borderRadius: "8px", border: "1px solid #F0EEE8" }}>
            <p style={{ fontSize: "10px", fontWeight: 500, color: "#B0B0A0", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Demo access</p>
            <p style={{ fontSize: "12px", color: "#7A7A70", margin: 0, lineHeight: "1.7" }}>
              admin@gmail.com<br />123456
            </p>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "11px", color: "#C0C0B0", marginTop: "20px" }}>
          Curio Bite Admin · v1.0
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} input::placeholder{color:#C8C8B8}`}</style>
    </div>
  );
}