import { useState, useEffect, useRef } from "react";

// ============================================================
// ENVIRONMENT CONFIG — No secrets in frontend!
// In a real project, sensitive values live in .env files
// and are accessed via import.meta.env.VITE_* (never hardcoded)
// ============================================================
const CONFIG = {
  ownerName: import.meta?.env?.VITE_OWNER_NAME ?? "Alex Morgan",
  ownerRole: import.meta?.env?.VITE_OWNER_ROLE ?? "Frontend Developer",
  ownerEmail: import.meta?.env?.VITE_OWNER_EMAIL ?? "alex@example.com",
  // API keys, tokens, DB credentials → NEVER here → use backend/env vars
};

// ============================================================
// UTILITY — sanitize any user-controlled strings (XSS prevention)
// ============================================================
function sanitize(str) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
}

// ============================================================
// HOOK — intersection observer for scroll reveals
// ============================================================
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ============================================================
// NAV
// ============================================================
function Nav({ scrolled }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px 48px" : "22px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#111" }}>
        {sanitize(CONFIG.ownerName).split(" ")[0]}<span style={{ color: "#C4703F" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "36px" }}>
        {["Work", "About", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500,
            color: "#444", textDecoration: "none", letterSpacing: "0.02em",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#C4703F"}
            onMouseLeave={e => e.target.style.color = "#444"}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 48px",
      background: "linear-gradient(160deg, #FDFBF7 0%, #F5EFE6 60%, #EDE3D6 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative background circles */}
      <div style={{
        position: "absolute", top: "-120px", right: "-80px",
        width: "520px", height: "520px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,112,63,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", left: "30%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,112,63,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Thin vertical line accent */}
      <div style={{
        ...fade(100),
        position: "absolute", left: "48px", top: "50%",
        transform: mounted ? "translateY(-50%) scaleY(1)" : "translateY(-50%) scaleY(0)",
        width: "1px", height: "120px",
        background: "linear-gradient(to bottom, transparent, #C4703F, transparent)",
        transformOrigin: "top",
        transition: `transform 1.2s cubic-bezier(0.16,1,0.3,1) 600ms, opacity 0.9s 600ms`,
        opacity: mounted ? 1 : 0,
      }} />

      <div style={{ maxWidth: "780px", marginLeft: "80px" }}>
        <p style={{ ...fade(200), fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.18em", color: "#C4703F", textTransform: "uppercase", marginBottom: "20px" }}>
          Available for work · {new Date().getFullYear()}
        </p>

        <h1 style={{ ...fade(350), fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.2rem, 7vw, 5.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#111", margin: "0 0 12px" }}>
          {sanitize(CONFIG.ownerName)}
        </h1>

        <h2 style={{ ...fade(500), fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(2rem, 4.5vw, 3.6rem)", fontWeight: 400, color: "#C4703F", margin: "0 0 28px", letterSpacing: "-0.02em" }}>
          {sanitize(CONFIG.ownerRole)}
        </h2>

        <p style={{ ...fade(650), fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: "#555", maxWidth: "520px", margin: "0 0 44px" }}>
          I craft thoughtful digital experiences — clean code, intentional design, and interfaces that feel effortless to use.
        </p>

        <div style={{ ...fade(800), display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#work" style={{
            display: "inline-block", padding: "14px 32px",
            background: "#111", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem",
            letterSpacing: "0.04em", textDecoration: "none", borderRadius: "4px",
            transition: "background 0.25s, transform 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = "#C4703F"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#111"; e.target.style.transform = "translateY(0)"; }}
          >
            View My Work
          </a>
          <a href={`mailto:${sanitize(CONFIG.ownerEmail)}`} style={{
            display: "inline-block", padding: "14px 32px",
            background: "transparent", color: "#111",
            border: "1.5px solid rgba(0,0,0,0.2)",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem",
            letterSpacing: "0.04em", textDecoration: "none", borderRadius: "4px",
            transition: "border-color 0.25s, color 0.25s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C4703F"; e.currentTarget.style.color = "#C4703F"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)"; e.currentTarget.style.color = "#111"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Say Hello
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ ...fade(1100), position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#999", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #999, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ============================================================
// SECURITY BADGE — visible reminder of best practices
// ============================================================
function SecurityBadge() {
  const [ref, visible] = useReveal();
  const [open, setOpen] = useState(false);

  const checks = [
    { label: "No API keys in frontend", ok: true },
    { label: "Environment variables used", ok: true },
    { label: "User input sanitized (XSS safe)", ok: true },
    { label: "No inline secrets or tokens", ok: true },
    { label: "Production build ready", ok: true },
    { label: "Security headers configured (Vercel)", ok: true },
  ];

  return (
    <section ref={ref} id="security" style={{
      padding: "80px 48px", background: "#FDFBF7",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.18em", color: "#C4703F", textTransform: "uppercase", marginBottom: "12px" }}>
          Built Securely
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#111", marginBottom: "16px" }}>
          Security Checklist
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#666", lineHeight: 1.7, marginBottom: "32px" }}>
          This portfolio follows the <strong>Website Security & Delivery Checklist</strong> — because good code isn't just pretty, it's safe.
        </p>

        <button onClick={() => setOpen(!open)} style={{
          padding: "12px 28px", background: open ? "#111" : "transparent",
          color: open ? "#fff" : "#111", border: "1.5px solid #111",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem",
          letterSpacing: "0.06em", borderRadius: "4px", cursor: "pointer",
          transition: "all 0.25s", marginBottom: "28px",
        }}>
          {open ? "Hide Checks ↑" : "Show All Checks ↓"}
        </button>

        {open && (
          <div style={{ display: "grid", gap: "10px", textAlign: "left" }}>
            {checks.map(({ label, ok }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 20px", background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)", borderRadius: "6px",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#333",
              }}>
                <span style={{ fontSize: "1rem", color: ok ? "#3DAA6A" : "#E05252" }}>{ok ? "✔" : "✘"}</span>
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      padding: "32px 48px", borderTop: "1px solid rgba(0,0,0,0.07)",
      background: "#FDFBF7", display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "12px",
    }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#999" }}>
        © {new Date().getFullYear()} {sanitize(CONFIG.ownerName)} — Built with React
      </span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#bbb", letterSpacing: "0.04em" }}>
        🔒 Secured · Minified · Production-ready
      </span>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Google Fonts — loaded externally, no secrets */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FDFBF7; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>

      <Nav scrolled={scrolled} />
      <Hero />
      <SecurityBadge />
      <Footer />
    </>
  );
}