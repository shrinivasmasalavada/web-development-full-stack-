import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Natural Ghee",
    size: "200ml",
    price: "₹349",
    originalPrice: "₹420",
    desc: "Perfect for small families. Pure bilona-method ghee.",
    bg: "from-amber-50 to-yellow-100",
  },
  {
    id: 2,
    name: "Natural Ghee",
    size: "500ml",
    price: "₹799",
    originalPrice: "₹950",
    desc: "Our bestseller! Rich, aromatic ghee for daily use.",
    bg: "from-orange-50 to-amber-100",
    badge: "Bestseller",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    loc: "Bengaluru",
    text: "Mera slipper abhi bhi packing mein hai! Ghee itni pure hai ki I forgot I even got the slipper 😂",
    stars: 5,
    initials: "PS",
    color: "#b45309",
  },
  {
    name: "Ramesh Nair",
    loc: "Kochi",
    text: "My mother said it smells exactly like ghee made in our village 30 years ago. The slipper is now my lucky charm!",
    stars: 5,
    initials: "RN",
    color: "#7c3aed",
  },
  {
    name: "Ananya Iyer",
    loc: "Chennai",
    text: "Tried 6 brands this year. This one wins hands down. The slipper? Framed it on my wall as proof I can't use it!",
    stars: 5,
    initials: "AI",
    color: "#065f46",
  },
  {
    name: "Vikram Patil",
    loc: "Pune",
    text: "Bold claim. Bolder ghee. The tadka in my dal smells like heaven. No slipper drama from this household!",
    stars: 5,
    initials: "VP",
    color: "#9a3412",
  },
];

const FEATURES = [
  { icon: "🌿", title: "100% Natural", desc: "No additives, no preservatives. Just pure desi ghee." },
  { icon: "🧪", title: "Lab Tested", desc: "Every batch certified for purity and quality." },
  { icon: "🐄", title: "A2 Cow Milk", desc: "Sourced from grass-fed desi cows only." },
  { icon: "🏺", title: "Bilona Method", desc: "Traditional hand-churned process, thousands of years old." },
  { icon: "🏡", title: "Village Made", desc: "Made in small batches by skilled artisans." },
  { icon: "🚫", title: "No Chemicals", desc: "Zero hydrogenated fats or artificial coloring." },
];

function GheeJar({ size = 120 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 120 156" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gheeGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="lidGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#fde68a" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Lid */}
      <ellipse cx="60" cy="32" rx="38" ry="10" fill="url(#lidGrad)" />
      <rect x="22" y="28" width="76" height="16" rx="4" fill="#b45309" />
      <ellipse cx="60" cy="44" rx="38" ry="10" fill="#92400e" />
      {/* Jar body */}
      <path d="M25 50 Q20 55 20 120 Q20 140 60 142 Q100 140 100 120 Q100 55 95 50 Z" fill="url(#gheeGrad)" />
      <path d="M25 50 Q20 55 20 120 Q20 140 60 142 Q100 140 100 120 Q100 55 95 50 Z" fill="url(#jarBody)" />
      {/* Shine */}
      <ellipse cx="40" cy="80" rx="8" ry="20" fill="white" fillOpacity="0.25" transform="rotate(-15 40 80)" />
      {/* Label */}
      <rect x="32" y="70" width="56" height="55" rx="6" fill="white" fillOpacity="0.92" />
      <text x="60" y="88" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" fontWeight="bold" fill="#92400e">PURE NATURAL</text>
      <text x="60" y="100" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontWeight="bold" fill="#b45309">THUPPA</text>
      <text x="60" y="112" textAnchor="middle" fontFamily="Georgia, serif" fontSize="6" fill="#78350f">GHEE</text>
      <line x1="38" y1="103" x2="82" y2="103" stroke="#f59e0b" strokeWidth="0.8" />
      <text x="60" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#92400e">100% BILONA METHOD</text>
      {/* Bottom */}
      <ellipse cx="60" cy="141" rx="40" ry="7" fill="#92400e" fillOpacity="0.4" />
    </svg>
  );
}

function Slipper({ animate = false }) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let frame;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setAngle(Math.sin(t) * 18);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  return (
    <svg
      width="90"
      height="60"
      viewBox="0 0 90 60"
      style={{ transform: `rotate(${angle}deg)`, transition: "transform 0.05s", display: "block" }}
    >
      <ellipse cx="45" cy="42" rx="42" ry="14" fill="#92400e" fillOpacity="0.15" />
      <path d="M10 38 Q12 25 30 22 Q50 18 70 22 Q82 25 80 38 Q75 48 45 50 Q15 48 10 38Z" fill="#c2410c" />
      <path d="M10 38 Q12 25 30 22 Q50 18 70 22 Q82 25 80 38" fill="#ea580c" />
      <path d="M30 22 Q45 10 60 22" fill="none" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 22 Q45 14 55 22" fill="#b45309" fillOpacity="0.3" />
      <ellipse cx="45" cy="36" rx="30" ry="8" fill="#9a3412" fillOpacity="0.2" />
      <text x="45" y="39" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="bold">👟</text>
    </svg>
  );
}

function StarRating({ count = 5 }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: 14 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const el = document.getElementById("ghee-scroll-root");
    if (!el) return;
    const handler = () => setY(el.scrollTop);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function AnimatedSection({ children, style = {}, className = "" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function GheeWebsite() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const scrollY = useScrollY();

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((x) => x.id === product.id);
      if (found) return c.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...product, qty: 1 }];
    });
    setToastMsg(`${product.size} ${product.name} added to cart! 🛒`);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const cartTotal = cart.reduce((sum, x) => {
    const price = parseInt(x.price.replace("₹", "").replace(",", ""));
    return sum + price * x.qty;
  }, 0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const styles = {
    root: {
      fontFamily: "'Playfair Display', Georgia, serif",
      background: "#0d0804",
      color: "#fef3c7",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    },
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: scrollY > 60 ? "rgba(13,8,4,0.97)" : "transparent",
      backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
      borderBottom: scrollY > 60 ? "1px solid rgba(245,158,11,0.2)" : "none",
      transition: "all 0.4s",
      padding: "0 24px",
    },
    navInner: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
    },
    logo: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 22,
      fontWeight: 700,
      color: "#f59e0b",
      letterSpacing: 1,
      cursor: "pointer",
    },
    navLinks: {
      display: "flex",
      gap: 28,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: "#fde68a",
      cursor: "pointer",
      fontSize: 14,
      fontFamily: "sans-serif",
      letterSpacing: 0.5,
      transition: "color 0.2s",
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 60% 50%, #3b1f05 0%, #1a0a02 50%, #0d0804 100%)",
      padding: "80px 24px 60px",
    },
    heroContent: {
      maxWidth: 1200,
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 60,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    badge: {
      display: "inline-block",
      background: "rgba(245,158,11,0.15)",
      border: "1px solid rgba(245,158,11,0.4)",
      color: "#f59e0b",
      fontSize: 12,
      fontFamily: "sans-serif",
      letterSpacing: 2,
      padding: "6px 16px",
      borderRadius: 100,
      marginBottom: 20,
    },
    heroTitle: {
      fontSize: "clamp(32px, 5vw, 58px)",
      fontWeight: 700,
      lineHeight: 1.15,
      color: "#fef3c7",
      margin: "0 0 12px",
    },
    heroAccent: {
      color: "#f59e0b",
      display: "block",
    },
    heroSub: {
      fontSize: 18,
      color: "#fde68a",
      fontFamily: "sans-serif",
      fontWeight: 400,
      lineHeight: 1.6,
      marginBottom: 36,
      maxWidth: 460,
    },
    btnPrimary: {
      background: "linear-gradient(135deg, #f59e0b, #d97706)",
      color: "#0d0804",
      border: "none",
      padding: "14px 32px",
      borderRadius: 8,
      fontSize: 15,
      fontWeight: 700,
      fontFamily: "sans-serif",
      cursor: "pointer",
      letterSpacing: 0.5,
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
    },
    btnSecondary: {
      background: "transparent",
      color: "#f59e0b",
      border: "2px solid rgba(245,158,11,0.5)",
      padding: "12px 28px",
      borderRadius: 8,
      fontSize: 15,
      fontFamily: "sans-serif",
      cursor: "pointer",
      letterSpacing: 0.5,
      transition: "all 0.2s",
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(28px, 4vw, 44px)",
      fontWeight: 700,
      color: "#fef3c7",
      textAlign: "center",
      marginBottom: 12,
    },
    sectionSub: {
      color: "#fde68a",
      textAlign: "center",
      fontFamily: "sans-serif",
      fontSize: 16,
      marginBottom: 50,
      opacity: 0.8,
    },
    section: {
      padding: "90px 24px",
      maxWidth: 1200,
      margin: "0 auto",
    },
    productCard: {
      background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      border: "1px solid rgba(245,158,11,0.25)",
      borderRadius: 20,
      padding: "32px 28px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "default",
    },
    organicBadge: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "rgba(5,150,105,0.85)",
      color: "#d1fae5",
      fontSize: 11,
      fontFamily: "sans-serif",
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: 100,
      letterSpacing: 1,
    },
    featureCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(245,158,11,0.15)",
      borderRadius: 16,
      padding: "28px 22px",
      textAlign: "center",
      backdropFilter: "blur(6px)",
    },
    challengeSection: {
      background: "radial-gradient(ellipse at center, #3b1f05 0%, #1a0a02 70%)",
      padding: "100px 24px",
      position: "relative",
      overflow: "hidden",
    },
    challengeCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(245,158,11,0.3)",
      borderRadius: 20,
      padding: "40px 36px",
      backdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
    },
    stepNum: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f59e0b, #d97706)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      fontWeight: 700,
      color: "#0d0804",
      flexShrink: 0,
    },
    testimCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(245,158,11,0.18)",
      borderRadius: 20,
      padding: "28px 24px",
      backdropFilter: "blur(8px)",
    },
    avatarCircle: (color) => ({
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 14,
      color: "white",
      flexShrink: 0,
      fontFamily: "sans-serif",
    }),
    footer: {
      background: "#080401",
      borderTop: "1px solid rgba(245,158,11,0.15)",
      padding: "60px 24px 32px",
    },
    footerLink: {
      color: "#fde68a",
      fontSize: 14,
      fontFamily: "sans-serif",
      cursor: "pointer",
      opacity: 0.7,
      textDecoration: "none",
      transition: "opacity 0.2s",
    },
    socialBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 18px",
      borderRadius: 10,
      border: "1px solid rgba(245,158,11,0.3)",
      background: "rgba(245,158,11,0.08)",
      color: "#fde68a",
      fontFamily: "sans-serif",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.2s",
    },
    whatsappFloat: {
      position: "fixed",
      bottom: 28,
      right: 28,
      zIndex: 999,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "#25d366",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
      cursor: "pointer",
      fontSize: 26,
      border: "none",
      transition: "transform 0.2s",
    },
    toast: {
      position: "fixed",
      bottom: 96,
      right: 28,
      background: "rgba(15,10,4,0.97)",
      border: "1px solid rgba(245,158,11,0.5)",
      color: "#fde68a",
      borderRadius: 12,
      padding: "12px 20px",
      fontFamily: "sans-serif",
      fontSize: 14,
      zIndex: 1000,
      transition: "opacity 0.4s",
      opacity: toastMsg ? 1 : 0,
      pointerEvents: "none",
      maxWidth: 260,
      boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    },
    cartPanel: {
      position: "fixed",
      top: 0,
      right: 0,
      width: 340,
      height: "100vh",
      background: "#100704",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRight: "none",
      zIndex: 200,
      padding: 24,
      overflowY: "auto",
      transform: cartOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
    },
  };

  return (
    <div id="ghee-scroll-root" style={{ ...styles.root, overflowY: "auto", height: "100vh" }}>
      {/* Floating WhatsApp */}
      <button
        style={styles.whatsappFloat}
        onClick={() => window.open("https://wa.me/919876543210", "_blank")}
        aria-label="WhatsApp"
      >
        📲
      </button>

      {/* Toast */}
      <div style={styles.toast}>{toastMsg}</div>

      {/* Cart Panel */}
      <div style={styles.cartPanel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#f59e0b" }}>Your Cart 🛒</span>
          <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#fde68a", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        {cart.length === 0 ? (
          <p style={{ color: "#fde68a", opacity: 0.5, fontFamily: "sans-serif", fontSize: 14 }}>Your cart is empty. Add some pure ghee!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(245,158,11,0.12)" }}>
                <div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 14, color: "#fef3c7", marginBottom: 2 }}>{item.size} {item.name}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b" }}>{item.price} × {item.qty}</div>
                </div>
                <button
                  onClick={() => setCart((c) => c.filter((x) => x.id !== item.id))}
                  style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}
                >✕</button>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: "16px 0", borderTop: "1px solid rgba(245,158,11,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", color: "#fef3c7", fontSize: 16, fontWeight: 700 }}>
                <span>Total</span><span style={{ color: "#f59e0b" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }}>Checkout via WhatsApp 📲</button>
            </div>
          </>
        )}
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => scrollTo("hero")}>🪔 Thuppa</div>
          <ul style={{ ...styles.navLinks, display: window.innerWidth > 640 ? "flex" : "none" }}>
            {["Products", "Challenge", "Features", "Testimonials"].map((l) => (
              <li key={l}>
                <span style={styles.navLink} onClick={() => scrollTo(l.toLowerCase())}>
                  {l}
                </span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              style={{ ...styles.btnSecondary, padding: "8px 16px", fontSize: 13, position: "relative" }}
              onClick={() => setCartOpen((v) => !v)}
            >
              🛒 {cart.reduce((s, x) => s + x.qty, 0) > 0 && (
                <span style={{ marginLeft: 4, background: "#f59e0b", color: "#0d0804", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  {cart.reduce((s, x) => s + x.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={styles.hero}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Smoke particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            bottom: "35%",
            left: `calc(50% + ${(i - 2.5) * 18}px)`,
            width: 3,
            height: 40,
            background: "linear-gradient(to top, rgba(245,158,11,0.3), transparent)",
            borderRadius: 10,
            animation: `smokeRise 2s ${i * 0.3}s infinite ease-in-out`,
            transformOrigin: "bottom",
          }} />
        ))}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
          @keyframes smokeRise {
            0% { opacity: 0; transform: scaleX(1) translateY(0); }
            50% { opacity: 1; transform: scaleX(1.5) translateY(-30px); }
            100% { opacity: 0; transform: scaleX(2) translateY(-70px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
          }
          @keyframes shimmer {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          @keyframes pulse-gold {
            0%, 100% { box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
            50% { box-shadow: 0 4px 40px rgba(245,158,11,0.65); }
          }
          .ghee-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,158,11,0.55) !important; }
          .ghee-btn-secondary:hover { background: rgba(245,158,11,0.1) !important; border-color: #f59e0b !important; }
          .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(245,158,11,0.18); }
          .social-btn:hover { background: rgba(245,158,11,0.18) !important; }
          .whatsapp-float:hover { transform: scale(1.1); }
          .nav-link:hover { color: #f59e0b !important; }
        `}</style>

        <div style={styles.heroContent}>
          <div style={{ flex: 1, minWidth: 280, maxWidth: 540 }}>
            <div style={styles.badge}>🪔 FROM THE HEART OF INDIA</div>
            <h1 style={styles.heroTitle}>
              Pure Natural Ghee…
              <span style={styles.heroAccent}>or hit us with our</span>
              <span style={{ color: "#ef4444" }}>own slipper!</span>
            </h1>
            <p style={styles.heroSub}>
              We're so confident in the purity of our ghee, we include a slipper with every order. Prove us wrong — use it! (We know you won't. 😎)
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="ghee-btn-primary" style={{ ...styles.btnPrimary, animation: "pulse-gold 2.5s infinite" }} onClick={() => scrollTo("products")}>
                Buy Now 🛒
              </button>
              <button className="ghee-btn-secondary" style={styles.btnSecondary} onClick={() => scrollTo("challenge")}>
                Watch Challenge 🎥
              </button>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
              {["5000+ Happy Families", "Lab Certified Pure", "Free Slipper Included 😂"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#f59e0b", fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.8 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, animation: "float 3.5s ease-in-out infinite" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%)", animation: "shimmer 2.5s ease-in-out infinite" }} />
              <GheeJar size={160} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Slipper animate />
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b", opacity: 0.7, fontStyle: "italic" }}>comes with every order!</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ background: "#0d0804", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={{ ...styles.badge }}>🛒 OUR PRODUCTS</span>
            </div>
            <h2 style={styles.sectionTitle}>Pick Your Pure Gold</h2>
            <p style={styles.sectionSub}>Handcrafted in small batches. No shortcuts. No compromises.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {PRODUCTS.map((p, i) => (
              <AnimatedSection key={p.id} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="product-card" style={styles.productCard}>
                  {p.badge && (
                    <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.5)", color: "#f59e0b", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: 100, letterSpacing: 1 }}>
                      🔥 {p.badge}
                    </div>
                  )}
                  <span style={styles.organicBadge}>✓ ORGANIC</span>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: p.badge ? 20 : 0 }}>
                    <GheeJar size={100} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fef3c7", margin: "0 0 4px" }}>{p.name}</h3>
                  <div style={{ fontFamily: "sans-serif", fontSize: 14, color: "#f59e0b", marginBottom: 12, letterSpacing: 1 }}>{p.size}</div>
                  <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#fde68a", opacity: 0.7, marginBottom: 18, lineHeight: 1.5 }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                    {["🐄 A2 Cow Milk", "🤲 Handmade", "🔬 Lab Tested"].map((t) => (
                      <span key={t} style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#fde68a", fontSize: 11, fontFamily: "sans-serif", padding: "4px 10px", borderRadius: 100 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#f59e0b" }}>{p.price}</span>
                    <span style={{ fontFamily: "sans-serif", fontSize: 16, color: "#fde68a", opacity: 0.4, textDecoration: "line-through" }}>{p.originalPrice}</span>
                  </div>
                  <button
                    className="ghee-btn-primary"
                    style={{ ...styles.btnPrimary, width: "100%" }}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart 🛒
                  </button>
                  <div style={{ marginTop: 12, fontFamily: "sans-serif", fontSize: 12, color: "#fde68a", opacity: 0.5 }}>
                    🥿 + 1 Slipper included (just in case!)
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" style={styles.challengeSection}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={styles.badge}>🥿 THE SLIPPER CHALLENGE</span>
            </div>
            <h2 style={styles.sectionTitle}>We Dare You. Seriously.</h2>
            <p style={styles.sectionSub}>The boldest quality guarantee in the history of ghee.</p>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: 40 }}>
            <AnimatedSection style={{ transitionDelay: "0.1s" }}>
              <div style={styles.challengeCard}>
                {/* Decorative circle */}
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(245,158,11,0.07)", pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f59e0b", marginBottom: 28 }}>How It Works</h3>
                {[
                  { step: 1, icon: "📦", text: "Order our ghee. We pack it with love — and one desi slipper." },
                  { step: 2, icon: "🧪", text: "Open your jar. Taste it. Get it lab tested if you want. We're not scared." },
                  { step: 3, icon: "🥿", text: "If you find any impurity or fake ghee — use the slipper on us!" },
                  { step: 4, icon: "📹", text: "Record the video and upload it to our official Instagram/YouTube page." },
                ].map((s) => (
                  <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={styles.stepNum}>{s.step}</div>
                    <div>
                      <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{s.icon}</span>
                      <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#fde68a", lineHeight: 1.55, margin: 0, opacity: 0.85 }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection style={{ transitionDelay: "0.2s" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Slipper visual */}
                <div style={{ ...styles.challengeCard, textAlign: "center", background: "rgba(245,158,11,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ animation: "float 2.5s ease-in-out infinite" }}><Slipper animate /></div>
                    <div style={{ animation: "float 2.5s 0.4s ease-in-out infinite" }}><Slipper /></div>
                  </div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#f59e0b", fontSize: 18, margin: "0 0 8px" }}>1 Slipper Per Order</h4>
                  <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.7, margin: 0, lineHeight: 1.5 }}>
                    A genuine desi chappal — our seal of confidence. In 5000+ orders, not a single one has been used against us. 🏆
                  </p>
                </div>

                {/* Video upload mockup */}
                <div style={{ ...styles.challengeCard, borderStyle: "dashed" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📹</div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#fef3c7", fontSize: 17, marginBottom: 8 }}>Upload Your Challenge Video</h4>
                    <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.6, marginBottom: 20, lineHeight: 1.5 }}>
                      Tag us @ThuppaGheeOfficial on Instagram, YouTube & Facebook
                    </p>
                    <button style={{ ...styles.btnPrimary, fontSize: 13, padding: "10px 20px", opacity: 0.6, cursor: "not-allowed" }}>
                      Upload Video (We'll wait 😏)
                    </button>
                    <div style={{ marginTop: 12, fontFamily: "sans-serif", fontSize: 11, color: "#fde68a", opacity: 0.4 }}>
                      0 videos submitted in the last 30 days. Coincidence? 😇
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats */}
          <AnimatedSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20 }}>
              {[
                { num: "5,000+", label: "Orders Delivered" },
                { num: "0", label: "Slipper Videos Posted" },
                { num: "100%", label: "Purity Guaranteed" },
                { num: "★ 4.9", label: "Average Rating" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: "24px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#f59e0b", marginBottom: 6 }}>{s.num}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#fde68a", opacity: 0.6, letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MEDIA / REELS SECTION */}
      <section style={{ background: "#0d0804", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={styles.badge}>📱 VIRAL REACTIONS</span>
            </div>
            <h2 style={styles.sectionTitle}>They Tried to Use the Slipper…</h2>
            <p style={styles.sectionSub}>Spoiler: They couldn't. Watch what happened instead.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {[
              { emoji: "😋", label: "@priya_foodie", caption: "Parottas never tasted this good!", views: "24K", color: "#3b1f05" },
              { emoji: "🤌", label: "@south_kitchen", caption: "Ghee pouring ASMR! Perfection.", views: "41K", color: "#1a0f02" },
              { emoji: "😂", label: "@funny_ramesh", caption: "Opened the slipper kit…started crying at the ghee quality!", views: "89K", color: "#0f1a08" },
              { emoji: "🐄", label: "@organic_life", caption: "A2 bilona ghee — you can smell the difference!", views: "18K", color: "#0a0a1a" },
              { emoji: "👨‍🍳", label: "@chef_nandan", caption: "My dal tadka got a promotion.", views: "32K", color: "#1a0a05" },
              { emoji: "🏆", label: "@verify_me", caption: "Tested in lab. 100% pure. Slipper staying on shelf.", views: "56K", color: "#0f0d02" },
            ].map((r, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div style={{
                  background: r.color,
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 16,
                  aspectRatio: "9/16",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  minHeight: 200,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{r.emoji}</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "16px 10px 12px" }}>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#f59e0b", fontWeight: 700, marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#fde68a", opacity: 0.7, lineHeight: 1.3 }}>{r.caption}</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#f59e0b", marginTop: 4 }}>▶ {r.views} views</div>
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(245,158,11,0.2)", borderRadius: 4, padding: "2px 6px", fontFamily: "sans-serif", fontSize: 9, color: "#f59e0b", fontWeight: 700 }}>REEL</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "linear-gradient(180deg, #0d0804 0%, #1a0a02 50%, #0d0804 100%)", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={styles.badge}>✨ WHY THUPPA?</span>
            </div>
            <h2 style={styles.sectionTitle}>Made the Right Way. Always.</h2>
            <p style={styles.sectionSub}>Every jar carries the tradition of a thousand years.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <AnimatedSection key={f.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={styles.featureCard}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#fef3c7", fontSize: 17, margin: "0 0 8px" }}>{f.title}</h4>
                  <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.65, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background: "#080401", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={styles.badge}>💛 HAPPY FAMILIES</span>
            </div>
            <h2 style={styles.sectionTitle}>Slipper Unused. Hearts Full.</h2>
            <p style={styles.sectionSub}>What our customers say (and why they kept the slipper as a trophy).</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.name} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div style={styles.testimCard}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                    <div style={styles.avatarCircle(t.color)}>{t.initials}</div>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#fef3c7" }}>{t.name}</div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#fde68a", opacity: 0.55 }}>{t.loc}</div>
                    </div>
                  </div>
                  <StarRating count={t.stars} />
                  <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#fde68a", lineHeight: 1.65, marginTop: 10, opacity: 0.82 }}>"{t.text}"</p>
                  <div style={{ marginTop: 12, fontFamily: "sans-serif", fontSize: 11, color: "#f59e0b", opacity: 0.5 }}>🥿 Slipper Status: Framed / Unused / Trophy</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <AnimatedSection>
        <div style={{ background: "linear-gradient(135deg, #3b1f05, #1a0a02)", padding: "70px 24px", textAlign: "center", borderTop: "1px solid rgba(245,158,11,0.2)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🪔</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 40px)", color: "#fef3c7", marginBottom: 12 }}>
            Ready for Pure Gold in Your Kitchen?
          </h2>
          <p style={{ fontFamily: "sans-serif", color: "#fde68a", opacity: 0.75, fontSize: 16, marginBottom: 30 }}>
            Order now. Taste the difference. Keep the slipper as a souvenir. 😄
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="ghee-btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("products")}>Order Now 🛒</button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block", padding: "14px 28px" }}>
              WhatsApp Us 📲
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#f59e0b", marginBottom: 12 }}>🪔 Thuppa</div>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.55, lineHeight: 1.7, maxWidth: 220 }}>
                Pure. Natural. Boldly Confident. India's most daring ghee brand — with a free slipper included.
              </p>
            </div>
            <div>
              <h5 style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b", letterSpacing: 2, marginBottom: 16 }}>QUICK LINKS</h5>
              {["Products", "The Challenge", "About Us", "Lab Reports", "Contact"].map((l) => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <span style={styles.footerLink}>{l}</span>
                </div>
              ))}
            </div>
            <div>
              <h5 style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b", letterSpacing: 2, marginBottom: 16 }}>CONTACT US</h5>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#fde68a", opacity: 0.6, lineHeight: 1.8 }}>
                📍 Village Artisans, Goa, India<br />
                📱 +91 98765 43210<br />
                📧 hello@thuppaghee.in
              </p>
            </div>
            <div>
              <h5 style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b", letterSpacing: 2, marginBottom: 16 }}>FOLLOW US</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "📸", name: "Instagram", handle: "@ThuppaGheeOfficial" },
                  { icon: "▶️", name: "YouTube", handle: "Thuppa Ghee" },
                  { icon: "📲", name: "WhatsApp", handle: "+91 98765 43210" },
                ].map((s) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#fef3c7", fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#fde68a", opacity: 0.5 }}>{s.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(245,158,11,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#fde68a", opacity: 0.4 }}>
              © 2025 Thuppa Natural Ghee. All rights reserved.
            </span>
            <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#f59e0b", opacity: 0.5 }}>
              🥿 0 slippers have been used against us. We're proud.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
