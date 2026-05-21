"use client";

import { useState, useEffect } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── STACK ICONS ─────────────────────────────────────────────────────────────
const StackIcons = {
  nextjs: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/></svg>,
  react: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.092-.278z"/></svg>,
  python: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13z"/></svg>,
  html: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>,
  tailwind: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
  nodejs: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M11.998 24a2.048 2.048 0 01-1.024-.27l-3.255-1.926c-.487-.272-.25-.368-.089-.424.649-.226.78-.277 1.47-.671.073-.042.169-.026.244.017l2.502 1.485c.09.049.218.049.301 0l9.759-5.634c.09-.052.148-.157.148-.266V7.689c0-.113-.058-.213-.151-.268l-9.756-5.631c-.09-.052-.211-.052-.301 0L2.093 7.42c-.095.055-.154.158-.154.269v11.264c0 .109.059.211.15.265l2.671 1.542c1.449.725 2.338-.129 2.338-.987V8.333c0-.158.128-.281.285-.281h1.247c.154 0 .285.123.285.281v11.44c0 1.931-1.052 3.04-2.88 3.04-.562 0-1.005 0-2.239-.609L1.088 20.6A2.05 2.05 0 010 18.822V7.689c0-.72.384-1.39 1.003-1.75l9.76-5.64a2.084 2.084 0 012.05 0l9.76 5.64c.618.36 1.003 1.03 1.003 1.75v11.264c0 .72-.385 1.389-1.003 1.749l-9.76 5.64a2.084 2.084 0 01-1.035.258z"/></svg>,
  express: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858z"/></svg>,
  supabase: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.957.73 14.234 1.824 14.234h7.771L9.498 22.964c.015.986 1.26 1.41 1.874.637l9.262-11.653c.653-.907.034-2.184-1.06-2.184h-7.771L11.9 1.036z"/></svg>,
  mongodb: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>,
  vercel: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.387-1 1.732V7h1a7 7 0 017 7h1a1 1 0 010 2h-1v1a7 7 0 01-7 7H9a7 7 0 01-7-7v-1H1a1 1 0 010-2h1a7 7 0 017-7h1V5.732A2 2 0 0112 2zM9 9a5 5 0 00-5 5v3a5 5 0 005 5h6a5 5 0 005-5v-3a5 5 0 00-5-5H9zm1 3a1 1 0 010 2H9a1 1 0 010-2h1zm4 0a1 1 0 010 2h-1a1 1 0 010-2h1zm-2 3a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1z"/></svg>,
};

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-6 ${className}`}>
      <span className="block w-8 h-px bg-current opacity-70" />
      {children}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["About", "Showroom", "Value", "Trust", "Services", "Stack", "Contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled ? "bg-[#0f0e0d]/95 backdrop-blur-xl border-b border-[#f5f0e8]/[0.07] shadow-[0_8px_32px_rgba(0,0,0,.4)]" : ""}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <a href="#" className="font-['DM_Serif_Display'] text-lg tracking-widest text-[#f5f0e8] no-underline uppercase">
            Unique Uo
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-7 list-none m-0 p-0">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`}
                  className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[#f5f0e8]/50 no-underline hover:text-[#f5f0e8] transition-colors duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} aria-label="menu"
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 bg-transparent border-none cursor-pointer relative z-[10001] p-0 gap-1.5">
            <span className={`block h-px bg-[#f5f0e8] transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
            <span className={`block h-px bg-[#f5f0e8] transition-all duration-300 ${open ? "opacity-0 w-6" : "w-4"}`} />
            <span className={`block h-px bg-[#f5f0e8] transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 bg-[#1a1917] z-[9998] flex flex-col justify-center px-8 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <ul className="list-none p-0 m-0">
          {links.map((l, i) => (
            <li key={l} className="border-b border-[#f5f0e8]/[0.07]"
              style={{ transform: open ? "translateY(0)" : "translateY(24px)", opacity: open ? 1 : 0, transition: `all 0.5s cubic-bezier(.16,1,.3,1) ${0.04 + i * 0.05}s` }}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="font-['DM_Serif_Display'] text-4xl text-[#f5f0e8]/80 no-underline block py-4 hover:text-[#f5f0e8] hover:pl-6 transition-all duration-300">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="about" className="bg-[#0f0e0d] min-h-screen flex flex-col justify-end relative overflow-hidden">
      {/* BG portrait */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/Founder.png')" }} />
      {/* Grid overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(245,240,232,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d] via-[#0f0e0d]/60 to-[#0f0e0d]/15" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-12 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.24em] uppercase text-teal-500 mb-8">
          <span className="block w-10 h-px bg-[#3a6ea5]" />
          Software Developer · Revisit Technologies
        </div>

        {/* Name */}
        <h1 className="font-['DM_Serif_Display'] text-[clamp(3rem,9vw,7.5rem)] font-normal leading-[0.95] text-[#f5f0e8] tracking-tight mb-6">
          Unique<br />
          <em className="italic text-[#d6e4f0]">U Okeke<span className="animate-blink ml-0.5">_</span></em>
        </h1>

        {/* Tagline */}
        <p className="font-['Cormorant_Garamond'] text-[clamp(1rem,2.5vw,1.4rem)] font-light text-[#f5f0e8]/65 max-w-xl leading-relaxed mb-10">
          I build software that solves real problems for Brands, businesses and underserved markets.
          Founder of Revisit Technologies — running healthcare tech startup.
        </p>

        {/* Social pills */}
        <div className="flex items-center gap-4 flex-wrap mb-14">
          {[
            { href: "https://x.com/mahrezbr?s=21", icon: <XIcon size={13} />, label: "Follow on X" },
            { href: "https://www.linkedin.com/in/unique-uo-19b570341", icon: <LinkedInIcon size={13} />, label: "Connect on LinkedIn" },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase no-underline px-4 py-2 border border-[#f5f0e8]/20 text-[#f5f0e8]/70 hover:text-[#f5f0e8] hover:border-[#f5f0e8]/40 transition-all duration-300">
              {icon}{label}
            </a>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="flex items-center gap-3 font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#f5f0e8]/30">
          <div className="w-12 h-px bg-[#f5f0e8]/15 relative overflow-hidden">
            <span className="absolute top-0 left-[-100%] w-full h-full bg-[#f5f0e8]/60 animate-scroll-shine" />
          </div>
          Scroll to explore
        </div>
      </div>

      {/* Identity bar */}
      <div className="relative z-10 border-t border-[#f5f0e8]/[0.08] bg-[#0f0e0d]/60 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-wrap gap-8">
          {[
            ["Function", "Software Developer & Founder"],
            ["Company", "Revisit Technologies"],
            ["Domain", "Full-Stack Web Development"],
            ["Status", "Building in Public 🌐"],
            ["Experience", "2+ Years"],
          ].map(([l, v]) => (
            <div key={l}>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-[#f5f0e8]/30 mb-1">{l}</div>
              <div className="font-['Cormorant_Garamond'] text-base font-light text-[#f5f0e8]/75 tracking-wide">{v}</div>
            </div>
          ))}
          <p className="font-['Cormorant_Garamond'] text-base font-light text-[#f5f0e8]/55 leading-relaxed w-full sm:max-w-lg">
            I'm a young developer and entrepreneur on a mission to create homegrown digital products that actually work for African businesses and worldwide.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-start infinite; display: inline-block; }
        @keyframes scroll-shine { 0%{left:-100%} 100%{left:100%} }
        .animate-scroll-shine { animation: scroll-shine 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

// ─── SHOWROOM ─────────────────────────────────────────────────────────────────
const SHOWROOM_ITEMS = [
  { tag: "Certificate", title: "SMEDAN Federal Certificate", body: "Government-issued certificate to operate Revisit Technologies.", img: "/smedancertificate.jpg" },
  { tag: "Product", title: "RevisitHMS", body: "An EMR built for real healthcare workflows — patient records, appointments, and billing in one platform.", img: "/revisitlabs.png" },
  { tag: "Partnership", title: "Enoma Medical Centre", body: "Strategic partnership with Enoma Medical Centre — commencing soon.", img: "/enomamdc.png" },
  { tag: "Product", title: "Logistics App", body: "Next product — a logistics platform built around how operators actually move things.", img: "/logistics.png" },
  { tag: "Client Work", title: "Ngo Site", body: "Client Work — Client Requested a custom Ngo Build.", img: "/ngowork1.png" },
  { tag: "Project", title: "Mockup site", body: "Mockup Inquiry site — Made a Mockup inquiry site for Oga Bole and Foods.", img: "/Ogabole_website.png" },
  { tag: "Internship", title: "Internship", body: "Full-stack Internship at Syntecxhub in India.", img: "/internship1.png" },
  { tag: "Project", title: "loDine", body: "Premium Restaurant webApp.", img: "/loDine.png" },
];

function Showroom() {
  const [active, setActive] = useState(0);

  return (
    <section id="showroom" className="bg-[#e8e0d0] pt-28 pb-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel className="text-[#245080]">Projects · Partnerships · Achievements · Certificates</SectionLabel>
          <h2 className="font-['DM_Serif_Display'] text-[clamp(2rem,4.5vw,3rem)] text-[#0f0e0d] m-0">Showroom</h2>
        </div>
        <div className="flex gap-3">
          {[
            { dir: "←", fn: () => setActive(a => Math.max(0, a - 1)), disabled: active === 0 },
            { dir: "→", fn: () => setActive(a => Math.min(SHOWROOM_ITEMS.length - 1, a + 1)), disabled: active === SHOWROOM_ITEMS.length - 1 },
          ].map(({ dir, fn, disabled }) => (
            <button key={dir} onClick={fn} disabled={disabled}
              className={`w-11 h-11 border border-[#2a2825] bg-transparent text-lg text-[#0f0e0d] flex items-center justify-center transition-all duration-200 ${disabled ? "opacity-25 cursor-not-allowed" : "cursor-pointer hover:bg-[#0f0e0d] hover:text-[#f5f0e8]"}`}>
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#0f0e0d]/[0.08]">
          {SHOWROOM_ITEMS.map((item, i) => (
            <div key={i}
              className={`bg-[#f5f0e8] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${i === active ? "outline outline-2 outline-[#1a3a5c]" : "outline outline-2 outline-transparent"}`}
              onClick={() => setActive(i)}>
              <div className="overflow-hidden">
                <img src={item.img} alt={item.title} loading="lazy"
                  className="w-full h-48 object-cover object-top grayscale-[20%] transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"; }} />
              </div>
              <div className="p-6">
                <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-[#245080] mb-2">{item.tag}</div>
                <div className="font-['DM_Serif_Display'] text-xl text-[#0f0e0d] mb-2">{item.title}</div>
                <p className="font-mono text-[0.66rem] leading-relaxed text-[#0f0e0d]/55 m-0">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="max-w-[1400px] mx-auto px-6 flex gap-2 pt-6">
        {SHOWROOM_ITEMS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`h-0.5 border-none p-0 cursor-pointer transition-all duration-300 ${i === active ? "bg-[#1a3a5c] w-10" : "bg-[#0f0e0d]/20 w-6"}`} />
        ))}
      </div>
    </section>
  );
}

// ─── VALUE PROPOSITION ───────────────────────────────────────────────────────
function ValueProposition() {
  useReveal();
  const cards = [
    ["01", "Full-Stack Development", "From idea to deployed product — React, Next.js, Node, Python. Fast, clean, and built to scale. No bloat, no hand-holding."],
    ["02", "Healthcare Tech", "Solving real inefficiencies in healthcare with software that actually works in the field."],
    ["03", "Logistics Systems", "Currently designing and building a logistics product from the ground up — routing, tracking, operations."],
    ["04", "Founder Mindset", "I don't just write code. I think about users, revenue, and growth. Every feature I ship has a reason to exist."],
  ];
  return (
    <section id="value" className="bg-[#1a3a5c] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d6e4f0]/30 to-transparent" />
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel className="reveal text-[#d6e4f0]">Value Proposition</SectionLabel>
        <h2 className="reveal font-['DM_Serif_Display'] text-[clamp(2.2rem,5vw,3.8rem)] font-normal leading-tight text-[#f5f0e8] max-w-2xl mb-16">
          Where <em className="italic text-[#d6e4f0]">clean code</em><br />meets real-world problems.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#f5f0e8]/[0.06]">
          {cards.map(([n, t, b]) => (
            <div key={n} className="reveal bg-[#1a3a5c]/70 p-10 hover:bg-[#24508060] transition-colors duration-300 cursor-default">
              <div className="font-mono text-[2.5rem] font-light text-[#d6e4f0]/20 tracking-tight mb-4 leading-none">{n}</div>
              <div className="font-['Cormorant_Garamond'] text-xl text-[#f5f0e8] mb-3">{t}</div>
              <div className="font-mono text-[0.68rem] leading-7 text-[#d6e4f0]/60 tracking-wide">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  useReveal();
  const services = [
    { icon: "◈", title: "Full-Stack Development", items: ["React & Next.js frontends", "Node.js & Express backends", "REST APIs & integrations", "Database design & optimisation"] },
    { icon: "◇", title: "Product Design & Build", items: ["Idea to launched product", "UI/UX design & prototyping", "MVP scoping & roadmapping", "Iterative build & feedback"] },
    { icon: "△", title: "Web Development", items: ["Landing pages & portfolios", "Custom web applications", "CMS integration", "Performance & SEO optimisation"] },
    { icon: "○", title: "Technical Co-Founder", items: ["Early-stage startup partner", "Architecture & tech decisions", "Equity-based engagements", "Long-term product ownership"] },
  ];
  return (
    <section id="services" className="bg-[#eaf2fa] py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel className="reveal text-[#245080]">Products & Services</SectionLabel>
        <h2 className="reveal font-['DM_Serif_Display'] text-[clamp(2rem,4.5vw,3rem)] text-[#1a3a5c] mb-16">What I deliver.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#1a3a5c]/10">
          {services.map(s => (
            <div key={s.title} className="reveal bg-[#eaf2fa] p-10 border-t-2 border-transparent hover:bg-white hover:border-[#245080] transition-all duration-300">
              <span className="text-2xl text-[#245080] mb-5 block">{s.icon}</span>
              <div className="font-['Cormorant_Garamond'] text-xl text-[#0f0e0d] mb-5">{s.title}</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {s.items.map(item => (
                  <li key={item} className="font-mono text-[0.64rem] tracking-wide text-[#0f0e0d]/55 flex items-start gap-2 leading-relaxed">
                    <span className="text-[#3a6ea5] shrink-0">—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Freelance note */}
        <div className="reveal mt-12 p-8 bg-[#1a3a5c] flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="font-['DM_Serif_Display'] text-2xl text-[#f5f0e8] mb-1">Available for freelance work</div>
            <div className="font-mono text-[0.66rem] text-[#d6e4f0]/55 tracking-wide">Open to projects, contracts, and technical co-founder conversations.</div>
          </div>
          <a href="#contact"
            className="font-mono text-[0.62rem] tracking-[0.18em] uppercase no-underline text-[#0f0e0d] bg-[#e8e0d0] px-7 py-3 hover:bg-[#f5f0e8] transition-colors duration-300 whitespace-nowrap">
            Let's Talk →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST ───────────────────────────────────────────────────────────────────
function Trust() {
  useReveal();
  const testimonials = [
    { name: "Dr Iyamu", role: "Owner of Enoma Medical Center", quote: "I Like Your Vision and Drive" },
    { name: "Mr David Uworgiren", role: "Pastor", quote: "WoW! WoW!! WoW!!! That's my Beloved son, Uchechukwu in action. I'm Very proud of you dear. You have done so well. May my good God so bless and lift you so high in Jesus Name, amen." },
    { name: "Partner Name", role: "Role, Organisation", quote: "Coming soon" },
  ];
  const certs = [
    "SMEDAN Business Registration Certificate",
    "Revisit Technologies — 2023 NDPA Licence coming soon",
    "Federal Republic of Nigeria — CAC Registered - coming soon",
  ];

  return (
    <section id="trust" className="bg-[#1a1917] py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel className="reveal text-[#d6e4f0]">Trust & Credibility</SectionLabel>
        <h2 className="reveal font-['DM_Serif_Display'] text-[clamp(2rem,4.5vw,3rem)] text-[#f5f0e8] mb-20">Partnerships & Testimonials</h2>

        {/* Partners */}
        <div className="reveal flex gap-4 flex-wrap mb-20 pb-20 border-b border-[#f5f0e8]/[0.07]">
          {["Revisit Technologies", "Enoma Medical Centre", "SMEDAN · Federal Government"].map(p => (
            <div key={p}
              className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[#f5f0e8]/35 border border-[#f5f0e8]/12 px-4 py-2 hover:text-[#f5f0e8] hover:border-[#f5f0e8]/35 transition-all duration-300 cursor-default">
              {p}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#f5f0e8]/[0.04] mb-20">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#0f0e0d] p-10 flex flex-col gap-6">
              <div className="font-['DM_Serif_Display'] text-[4rem] leading-[0.8] text-[#245080]">"</div>
              <p className="font-['Cormorant_Garamond'] text-base leading-relaxed text-[#f5f0e8]/70 italic flex-1 m-0">{t.quote}</p>
              <div className="border-t border-[#f5f0e8]/[0.07] pt-4">
                <div className="font-mono text-[0.66rem] tracking-wide text-[#f5f0e8]">{t.name}</div>
                <div className="font-mono text-[0.58rem] text-[#f5f0e8]/35 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Team photos */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-0.5 mb-16">
          {["/Founder.png", "/team2.png"].map((src, i) => (
            <div key={i} className="aspect-[3/4] overflow-hidden">
              <img src={src} alt="Team" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>

        {/* Certs */}
        <div className="reveal flex gap-4 flex-wrap pt-16 border-t border-[#f5f0e8]/[0.07]">
          {certs.map(c => (
            <div key={c} className="flex items-center gap-3 border border-[#d6e4f0]/18 px-5 py-3">
              <div className="w-2 h-2 rounded-full bg-[#3a6ea5] shrink-0" />
              <div className="font-mono text-[0.61rem] tracking-wide text-[#d6e4f0]/60">{c}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STACK ────────────────────────────────────────────────────────────────────
function Stack() {
  useReveal();
  const techs = [
    { key: "nextjs", label: "Next.js" }, { key: "react", label: "React" },
    { key: "python", label: "Python" }, { key: "html", label: "HTML / CSS" },
    { key: "tailwind", label: "Tailwind" }, { key: "nodejs", label: "Node.js" },
    { key: "express", label: "Express" }, { key: "supabase", label: "Supabase" },
    { key: "mongodb", label: "MongoDB" }, { key: "vercel", label: "Vercel" },
    { key: "github", label: "GitHub" }, { key: "ai", label: "AI Integration" },
  ];
  return (
    <section id="stack" className="bg-[#eaf2fa] py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel className="reveal text-[#245080]">Tech Stack</SectionLabel>
        <h2 className="reveal font-['DM_Serif_Display'] text-[clamp(2rem,4.5vw,3rem)] text-[#1a3a5c] mb-16">Tools I build with.</h2>
        <div className="reveal grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-0.5 bg-[#1a3a5c]/[0.08]">
          {techs.map(({ key, label }) => (
            <div key={key}
              className="bg-[#eaf2fa] p-8 flex flex-col items-center gap-3 hover:bg-white hover:-translate-y-1 transition-all duration-200 cursor-default">
              <div className="text-[#245080]">{StackIcons[key]}</div>
              <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#1a3a5c]/60 text-center">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VALUE HOOKS ─────────────────────────────────────────────────────────────
function ValueHooks() {
  useReveal();
  const before = [
    "Months of back-and-forth before a single line of code is written",
    "Developers who build what you say, not what you need",
    "Bloated software nobody on your team actually uses",
    "Handover — and you never hear from them again",
  ];
  const after = [
    "You describe the problem — I scope, design, and ship it",
    "Software built by someone who understands the business, not just the brief",
    "Lean, purposeful products — every feature earns its place",
    "Ongoing ownership — I care about whether it works after launch",
  ];
  const roi = [
    ["3×", "Faster Patient Throughput"],
    ["₦0", "Lost to Paper Records"],
    ["Fast", "Brief to Live Site"],
    ["100%", "Performance"],
    ["100%", "Results After Launch"],
  ];

  return (
    <section className="bg-[#0f0e0d] py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel className="reveal text-[#3a6ea5]">What You Get</SectionLabel>
        <h2 className="reveal font-['DM_Serif_Display'] text-[clamp(2rem,4.5vw,3.2rem)] text-[#f5f0e8] mb-16 max-w-lg leading-tight">
          What you <em className="italic text-[#d6e4f0]">actually</em><br />get working with me.
        </h2>

        {/* ROI strip */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0.5 bg-[#f5f0e8]/[0.05] mb-20">
          {roi.map(([n, l]) => (
            <div key={l} className="bg-[#1a1917] p-8 text-center">
              <div className="font-['DM_Serif_Display'] text-[clamp(2rem,4vw,3rem)] text-[#d6e4f0] leading-none mb-1">{n}</div>
              <div className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40">{l}</div>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-[#f5f0e8]/[0.05]">
          {[
            { label: "Before", dot: "rgba(245,240,232,.25)", tagColor: "text-[#f5f0e8]/30", bg: "bg-[#1a1a18]/60", borderColor: "border-[#f5f0e8]/10", textColor: "text-[#f5f0e8]/45", items: before },
            { label: "After", dot: "#3a6ea5", tagColor: "text-[#d6e4f0]", bg: "bg-[#1a3a5c]/40", borderColor: "border-[#245080]", textColor: "text-[#f5f0e8]", items: after },
          ].map(({ label, dot, tagColor, bg, borderColor, textColor, items }) => (
            <div key={label} className={`${bg} p-12`}>
              <div className={`font-mono text-[0.56rem] tracking-[0.25em] uppercase ${tagColor} flex items-center gap-2 mb-8`}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                {label} Engagement
              </div>
              <div className="flex flex-col gap-5">
                {items.map(t => (
                  <div key={t} className={`font-['Cormorant_Garamond'] text-base font-light leading-relaxed pl-4 border-l ${borderColor} ${textColor}`}>{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CV TEASER ───────────────────────────────────────────────────────────────
function CVTeaser() {
  useReveal();
  return (
    <section className="bg-[#f5f0e8] py-20 px-6 flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <SectionLabel className="reveal justify-center text-[#3a6ea5]">Curriculum Vitae</SectionLabel>

        {/* Pulsing ring */}
        <div className="reveal cv-ring w-36 h-36 border border-[#d6e4f0] rounded-full mx-auto mb-10 flex items-center justify-center relative cursor-pointer hover:border-[#245080] transition-colors duration-300"
          onClick={() => window.open('/cv', '_blank')}>
          <span className="font-['DM_Serif_Display'] text-5xl text-[#1a3a5c] select-none">CV</span>
        </div>

        <h3 className="font-['DM_Serif_Display'] text-3xl text-[#0f0e0d] mb-3">See My Full CV</h3>
        <p className="font-mono text-[0.62rem] tracking-[0.15em] text-[#0f0e0d]/45 uppercase mb-8 leading-loose">
          3 years of building products,<br />solving problems — documented.
        </p>
        <a href="/cv" target="_blank"
          className="inline-flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.18em] uppercase no-underline text-[#f5f0e8] bg-[#1a3a5c] px-8 py-3 hover:bg-[#245080] transition-colors duration-300">
          Open Curriculum Vitae →
        </a>
      </div>

      <style>{`
        @keyframes ripple{0%{transform:scale(1);opacity:1}100%{transform:scale(1.12);opacity:0}}
        .cv-ring::before,.cv-ring::after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(26,58,92,.15);animation:ripple 3s ease-out infinite}
        .cv-ring::before{width:175px;height:175px;animation-delay:.5s}
        .cv-ring::after{width:215px;height:215px;animation-delay:1s}
      `}</style>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  useReveal();
  return (
    <section id="contact" className="bg-[#1a3a5c] py-32 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="reveal">
          <h2 className="font-['DM_Serif_Display'] text-[clamp(2.5rem,6vw,4.5rem)] text-[#f5f0e8] leading-none mb-8">
            Let's build something<br /><em className="italic text-[#d6e4f0]">real.</em>
          </h2>
          <p className="font-mono text-[0.68rem] leading-[1.85] text-[#d6e4f0]/55 tracking-wide max-w-sm">
            Freelance projects, technical co-founder conversations, and product partnerships.
            Direct access — contact me directly.
          </p>
        </div>

        <div className="reveal flex flex-col gap-4">
          {[
            { href: "mailto:support.revisit@gmail.com", icon: "✉", label: "Direct Email", value: "support.revisit@gmail.com" },
            { href: "https://x.com/mahrezbr?s=21", icon: <XIcon size={15} />, label: "Follow on X", value: "@Mahrezbr" },
            { href: "https://www.linkedin.com/in/unique-uo-19b570341", icon: <LinkedInIcon size={15} />, label: "Connect on LinkedIn", value: "Unique Uo" },
          ].map(({ href, icon, label, value }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="flex items-center gap-5 no-underline px-6 py-5 border border-[#f5f0e8]/12 bg-[#f5f0e8]/[0.04] text-[#f5f0e8] hover:bg-[#f5f0e8]/10 hover:border-[#f5f0e8]/30 transition-all duration-300">
              <div className="text-[#d6e4f0] shrink-0">{icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[0.64rem] tracking-[0.16em] uppercase">{label}</div>
                <div className="font-['Cormorant_Garamond'] text-base text-[#d6e4f0]/70 mt-0.5 truncate">{value}</div>
              </div>
              <div className="text-[#f5f0e8]/30 shrink-0">→</div>
            </a>
          ))}

          <div className="mt-2 bg-[#e8e0d0] p-6 text-center">
            <div className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[#2a2825] mb-2">Book a Call / WhatsApp</div>
            <div className="font-['Cormorant_Garamond'] text-lg text-[#1a3a5c]">(+234) 09060214104 →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f0e0d] border-t border-[#f5f0e8]/[0.06] py-8 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-[#f5f0e8]/25">
          © 2026 Unique U Okeke · Revisit Technologies
        </span>
        <div className="flex gap-5">
          {["Privacy", "Terms"].map(l => (
            <a key={l} href="#"
              className="font-mono text-[0.56rem] tracking-[0.15em] uppercase text-[#f5f0e8]/25 no-underline hover:text-[#f5f0e8]/60 transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── GLOBAL REVEAL STYLES ────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    html, body { overflow-x: hidden; max-width: 100%; }
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity: 1; transform: none; }
  `}</style>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  useReveal();
  return (
    <div className="overflow-x-hidden w-full">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Showroom />
      <ValueProposition />
      <Services />
      <Trust />
      <Stack />
      <ValueHooks />
      <CVTeaser />
      <Contact />
      <Footer />
    </div>
  );
}