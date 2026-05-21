"use client";

import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const XIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ─── STACK ICONS (SVG) ───────────────────────────────────────────────────────
const StackIcons = {
  nextjs: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.48 23.48 0 00-3.107-.534A23.627 23.627 0 0012 9.807a23.196 23.196 0 00-1.58-2.816 22.092 22.092 0 011.64-.61 23.17 23.17 0 012.088-.524 22.39 22.39 0 012.635-.33zM9.5 12.004c.37.283.75.56 1.141.82.389-.258.77-.534 1.14-.82a24.83 24.83 0 01-1.14-.82 23.614 23.614 0 01-1.141.82zm-3.984-2.82c.232.184.486.37.752.556a23.567 23.567 0 00.53 3.11c-.42-.145-.826-.3-1.211-.46C4.072 11.38 3.5 10.613 3.5 12.004c0 1.39.572 2.157 2.086 2.612.385-.163.791-.317 1.212-.46a23.56 23.56 0 00-.53 3.111c-.267.185-.52.371-.752.556C3.695 16.919 2.5 14.547 2.5 12.004c0-2.543 1.195-4.916 2.516-5.82zM16.9 9.184c.422.143.827.298 1.212.46C19.624 10.1 20.5 11.393 20.5 12.004c0 1.39-.572 2.156-2.086 2.611a22.937 22.937 0 00-1.212-.46 23.64 23.64 0 00.53-3.11 22.97 22.97 0 00-.752-.556c.232-.184.486-.37.752-.556-.267-.185-.52-.371-.752-.556zm-5.49 5.82c-.37-.283-.75-.56-1.141-.82a22.964 22.964 0 011.141-.82c.37.283.75.56 1.14.82-.389.258-.77.534-1.14.82z"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.998 24a2.048 2.048 0 01-1.024-.27l-3.255-1.926c-.487-.272-.25-.368-.089-.424.649-.226.78-.277 1.47-.671.073-.042.169-.026.244.017l2.502 1.485c.09.049.218.049.301 0l9.759-5.634c.09-.052.148-.157.148-.266V7.689c0-.113-.058-.213-.151-.268l-9.756-5.631c-.09-.052-.211-.052-.301 0L2.093 7.42c-.095.055-.154.158-.154.269v11.264c0 .109.059.211.15.265l2.671 1.542c1.449.725 2.338-.129 2.338-.987V8.333c0-.158.128-.281.285-.281h1.247c.154 0 .285.123.285.281v11.44c0 1.931-1.052 3.04-2.88 3.04-.562 0-1.005 0-2.239-.609L1.088 20.6A2.05 2.05 0 010 18.822V7.689c0-.72.384-1.39 1.003-1.75l9.76-5.64a2.084 2.084 0 012.05 0l9.76 5.64c.618.36 1.003 1.03 1.003 1.75v11.264c0 .72-.385 1.389-1.003 1.749l-9.76 5.64a2.084 2.084 0 01-1.035.258l-.78.001z"/>
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.957.73 14.234 1.824 14.234h7.771L9.498 22.964c.015.986 1.26 1.41 1.874.637l9.262-11.653c.653-.907.034-2.184-1.06-2.184h-7.771L11.9 1.036z"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c-.013-.oprion-.013-.394-.013-.826zm1.327-.288h8.73c-.21-2.735-2.005-4.25-4.22-4.25-2.315 0-4.25 1.615-4.51 4.25z"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 2a2 2 0 012 2c0 .74-.4 1.387-1 1.732V7h1a7 7 0 017 7h1a1 1 0 010 2h-1v1a7 7 0 01-7 7H9a7 7 0 01-7-7v-1H1a1 1 0 010-2h1a7 7 0 017-7h1V5.732A2 2 0 0112 2zM9 9a5 5 0 00-5 5v3a5 5 0 005 5h6a5 5 0 005-5v-3a5 5 0 00-5-5H9zm1 3a1 1 0 010 2H9a1 1 0 010-2h1zm4 0a1 1 0 010 2h-1a1 1 0 010-2h1zm-2 3a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1z"/>
    </svg>
  ),
};

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.1 }
      );
      els.forEach(el => io.observe(el));
      return io;
    };
    const io = run();
    return () => io.disconnect();
  }, []);
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["About","Showroom","Value","Trust","Services","Stack","Contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
    transition: "all .5s cubic-bezier(.16,1,.3,1)",
    ...(scrolled ? {
      background: "rgba(15,14,13,.95)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(245,240,232,.07)",
      boxShadow: "0 8px 32px rgba(0,0,0,.4)",
    } : {}),
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 2rem", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"1.2rem", letterSpacing:".08em", color:"#f5f0e8", textDecoration:"none", textTransform:"uppercase" }}>
            Unique Uo
          </a>

          {/* Desktop links */}
          <ul style={{ display:"flex", gap:"1.75rem", listStyle:"none", margin:0, padding:0 }} className="nb-desktop">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} style={{ fontFamily:"'Geist Mono',monospace", fontSize:".65rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(245,240,232,.5)", textDecoration:"none" }}
                  onMouseOver={e => e.currentTarget.style.color="#f5f0e8"}
                  onMouseOut={e => e.currentTarget.style.color="rgba(245,240,232,.5)"}
                >{l}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} aria-label="menu"
            style={{ display:"none", flexDirection:"column", alignItems:"center", justifyContent:"center", width:44, height:44, background:"none", border:"none", cursor:"pointer", position:"relative", zIndex:10001, padding:0 }}
            className="nb-ham"
          >
            {[[-7,26],[0,18],[7,26]].map(([y,w],i) => (
              <span key={i} style={{
                display:"block", height:1, background:"#f5f0e8", position:"absolute",
                width: open ? 26 : w,
                marginLeft: !open && i===1 ? -4 : 0,
                transform: open
                  ? i===0 ? "translateY(0) rotate(45deg)" : i===2 ? "translateY(0) rotate(-45deg)" : "none"
                  : `translateY(${y}px)`,
                opacity: open && i===1 ? 0 : 1,
                transition:"all .4s cubic-bezier(.16,1,.3,1)",
              }}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position:"fixed", inset:0, background:"#1a1917", zIndex:9998,
        display:"flex", flexDirection:"column", justifyContent:"center", padding:"2rem 2.5rem",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
        transition:"opacity .4s cubic-bezier(.16,1,.3,1)",
      }}>
        <ul style={{ listStyle:"none", padding:0, margin:0 }}>
          {links.map((l,i) => (
            <li key={l} style={{
              borderBottom:"1px solid rgba(245,240,232,.07)",
              transform: open ? "translateY(0)" : "translateY(24px)",
              opacity: open ? 1 : 0,
              transition:`all .5s cubic-bezier(.16,1,.3,1) ${0.04+i*0.05}s`,
            }}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{
                fontFamily:"'DM Serif Display',serif", fontSize:"clamp(1.8rem,7vw,3rem)",
                color:"rgba(245,240,232,.8)", textDecoration:"none", display:"block", padding:".8rem 0",
              }}
                onMouseOver={e => { e.currentTarget.style.color="#f5f0e8"; e.currentTarget.style.paddingLeft="1.5rem"; }}
                onMouseOut={e => { e.currentTarget.style.color="rgba(245,240,232,.8)"; e.currentTarget.style.paddingLeft="0"; }}
              >{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media(max-width:900px){
          .nb-desktop{ display:none !important; }
          .nb-ham{ display:flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="about" style={{ background:"#0f0e0d", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative", overflow:"hidden" }}>
      {/* BG portrait */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"url('/Founder.png')", backgroundSize:"cover", backgroundPosition:"center 50%", opacity:.30 }}/>
      {/* Grid overlay */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(245,240,232,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,.04) 1px,transparent 1px)", backgroundSize:"60px 60px" }}/>
      {/* Gradient */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(15,14,13,1) 0%,rgba(15,14,13,.6) 40%,rgba(15,14,13,.15) 100%)" }}/>

      <div style={{ position:"relative", zIndex:2, maxWidth:1400, margin:"0 auto", padding:"8rem 2rem 4rem", width:"100%" }}>
        {/* Eyebrow */}
        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".62rem", letterSpacing:".24em", textTransform:"uppercase", color:"teal", display:"flex", alignItems:"center", gap:".75rem", marginBottom:"2rem" }} className="text-xs">
          <span style={{ display:"block", width:"2.5rem", height:1, background:"#3a6ea5" }}/>
          Software Developer · Revisit Technologies
        </div>

        {/* Name */}
        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(3.2rem,9vw,7.5rem)", fontWeight:400, lineHeight:.95, color:"#f5f0e8", letterSpacing:"-.01em", marginBottom:"1.5rem" }}>
          Unique<br/><em style={{ fontStyle:"italic", color:"#d6e4f0" }}>U Okeke<span className="blink" style={{ marginLeft:2 }}>_</span></em>
        </h1>

        {/* Tagline */}
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,2.5vw,1.5rem)", fontWeight:300, color:"rgba(245,240,232,.65)", maxWidth:560, lineHeight:1.6, marginBottom:"2.5rem" }}>
          I build software that solves real problems for Brands, businesses and underserved markets. Founder of Revisit Technologies —
          running healthcare tech startup
        </p>
       

        {/* Social pills */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap", marginBottom:"3.5rem" }}>
          {[
            { href:"https://x.com/mahrezbr?s=21", icon:<XIcon size={13}/>, label:"Follow on X" },
            { href:"https://www.linkedin.com/in/unique-uo-19b570341?utm_source=share_via&utm_content=profile&utm_medium=member_ios", icon:<LinkedInIcon size={13}/>, label:"Connect on LinkedIn" },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              display:"flex", alignItems:"center", gap:".55rem",
              fontFamily:"'Geist Mono',monospace", fontSize:".62rem", letterSpacing:".15em",
              textTransform:"uppercase", textDecoration:"none", padding:".55rem 1.1rem",
              border:"1px solid rgba(245,240,232,.18)", color:"rgba(245,240,232,.7)",
              transition:"all .3s",
            }}
              onMouseOver={e => { e.currentTarget.style.color="#f5f0e8"; e.currentTarget.style.borderColor="rgba(245,240,232,.4)"; }}
              onMouseOut={e => { e.currentTarget.style.color="rgba(245,240,232,.7)"; e.currentTarget.style.borderColor="rgba(245,240,232,.18)"; }}
            >{icon}{label}</a>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ display:"flex", alignItems:"center", gap:".75rem", fontFamily:"'Geist Mono',monospace", fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.3)" }}>
          <div style={{ width:"3rem", height:1, background:"rgba(245,240,232,.15)", position:"relative", overflow:"hidden" }}>
            <span className="scroll-shine"/>
          </div>
          Scroll to explore
        </div>
      </div>

      {/* Identity bar */}
      <div style={{ position:"relative", zIndex:2, borderTop:"1px solid rgba(245,240,232,.08)", background:"rgba(15,14,13,.6)", backdropFilter:"blur(12px)" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"1.25rem 2rem", display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
          {[
            ["Function","Software Developer & Founder"],
            ["Company","Revisit Technologies"],
            ["Domain","Full-stackWeb Development"],
            ["Status","Building in Public 🌐"],
            ["Experience building","2+ Years"],
          ].map(([l,v]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".52rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.3)", marginBottom:".3rem" }}>{l}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:300, color:"rgba(245,240,232,.75)", letterSpacing:".03em" }}>{v}</div>
            </div>
          ))}
           <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,2.5vw,1.5rem)", fontWeight:300, color:"rgba(245,240,232,.65)", maxWidth:560, lineHeight:1.6, marginBottom:"2.5rem" }}>
         I'm a young develper and entreprenuer on a mission to create homegrown digital products that actually work for African businesses and worldwide
        </p>
        </div>
        
      </div>

      <style>{`
        @keyframes scrollShine { 0%{left:-100%} 50%{left:0%} 100%{left:100%} }
        .scroll-shine { position:absolute; top:0; left:-100%; width:100%; height:100%; background:rgba(245,240,232,.6); animation:scrollShine 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation:blink 1s step-start infinite; display:inline-block; }
      `}</style>
    </section>
  );
}

// ─── VALUE PROPOSITION ───────────────────────────────────────────────────────
function ValueProposition() {
  useReveal();
  const cards = [
    ["01","Full-Stack Development","From idea to deployed product — React, Next.js, Node, Python. Fast, clean, and built to scale. No bloat, no hand-holding."],
    ["02","Healthcare Tech","Solving real inefficiencies in healthcare with software that actually works in the field."],
    ["03","Logistics Systems","Currently designing and building a logistics product from the ground up — routing, tracking, operations. The infrastructure that moves everything."],
    ["04","Founder Mindset","I don't just write code. I think about users, revenue, and growth. Every feature I ship has a reason to exist."],
  ];
  return (
    <section id="value" style={{ background:"#1a3a5c", padding:"7rem 2rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-1, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(214,228,240,.3),transparent)" }}/>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="section-label reveal" style={{ color:"#d6e4f0", marginBottom:"1.5rem" }}>Value Proposition</div>
        <h2 className="reveal" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:400, lineHeight:1.1, color:"#f5f0e8", maxWidth:700, marginBottom:"4rem" }}>
          Where <em style={{ fontStyle:"italic", color:"#d6e4f0" }}>clean code</em><br/>meets real-world problems.
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:2, background:"rgba(245,240,232,.06)" }}>
          {cards.map(([n,t,b]) => (
            <div key={n} className="reveal vp-card" style={{ background:"rgba(26,58,92,.7)", padding:"2.5rem 2rem", transition:"background .3s", cursor:"default" }}
              onMouseOver={e => e.currentTarget.style.background="rgba(36,80,128,.6)"}
              onMouseOut={e => e.currentTarget.style.background="rgba(26,58,92,.7)"}
            >
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:"2.5rem", fontWeight:300, color:"rgba(214,228,240,.2)", letterSpacing:"-.02em", marginBottom:"1rem", lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", color:"#f5f0e8", marginBottom:".75rem" }}>{t}</div>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".7rem", lineHeight:1.75, color:"rgba(214,228,240,.6)", letterSpacing:".02em" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.section-label{font-family:'Geist Mono',monospace;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:#3a6ea5;display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem}.section-label::before{content:'';display:block;width:2rem;height:1px;background:currentColor}.reveal{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:none}`}</style>
    </section>
  );
}

// ─── CV TEASER ───────────────────────────────────────────────────────────────
function CVTeaser() {
  return (
    <section style={{ background:"#f5f0e8", padding:"5rem 2rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ maxWidth:520, width:"100%", textAlign:"center" }}>
        <div className="section-label reveal" style={{ justifyContent:"center", color:"#3a6ea5" }}>Curriculum Vitae</div>
        {/* Pulsing ring */}
        <div className="cv-ring reveal" onClick={() => window.open('/cv','_blank')} style={{ width:140, height:140, border:"1px solid #d6e4f0", borderRadius:"50%", margin:"0 auto 2.5rem", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", cursor:"pointer" }}>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:"2.8rem", color:"#1a3a5c", userSelect:"none" }}>CV</span>
        </div>
        <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"2rem", color:"#0f0e0d", marginBottom:".75rem" }}>See My Full CV</h3>
        <p style={{ fontFamily:"'Geist Mono',monospace", fontSize:".65rem", letterSpacing:".15em", color:"rgba(15,14,13,.45)", textTransform:"uppercase", marginBottom:"2rem", lineHeight:1.8 }}>
          3 years of building products,<br/>solving problems — documented.
        </p>
        <a href="/cv" target="_blank" style={{ display:"inline-flex", alignItems:"center", gap:".75rem", fontFamily:"'Geist Mono',monospace", fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase", textDecoration:"none", color:"#f5f0e8", background:"#1a3a5c", padding:".8rem 2rem", transition:"background .3s" }}
          onMouseOver={e => e.currentTarget.style.background="#245080"}
          onMouseOut={e => e.currentTarget.style.background="#1a3a5c"}
        >Open Curriculum Vitae <span style={{ transition:"transform .3s" }} className="cv-arrow">→</span></a>
      </div>
      <style>{`
        @keyframes ripple{0%{transform:scale(1);opacity:1}100%{transform:scale(1.12);opacity:0}}
        .cv-ring::before,.cv-ring::after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(26,58,92,.15);animation:ripple 3s ease-out infinite}
        .cv-ring::before{width:175px;height:175px;animation-delay:.5s}
        .cv-ring::after{width:215px;height:215px;animation-delay:1s}
        .cv-ring:hover{border-color:#245080;box-shadow:0 0 0 8px rgba(58,110,165,.08)}
      `}</style>
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
  ["3×","Faster Patient Throughput"],
  ["₦0, 0,time","Lost to Paper Records and manual work"],
  ["fast","From Brief to Live Site(Online Presence)"],
  ["100%","Performance"],
  ["100%","Results after building your site"],
];
  
  return (
    <section id="value" style={{ background:"#0f0e0d", padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="section-label reveal" style={{ color:"#3a6ea5" }}>What You Get</div>
        <h2 className="reveal" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4.5vw,3.2rem)", color:"#f5f0e8", marginBottom:"4rem", maxWidth:580, lineHeight:1.15 }}>
          What you <em style={{ fontStyle:"italic", color:"#d6e4f0" }}>actually</em><br/>get working with me.
        </h2>

        {/* ROI strip */}
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:1, background:"rgba(245,240,232,.05)", marginBottom:"5rem" }}>
          {roi.map(([n,l]) => (
            <div key={l} style={{ background:"#1a1917", padding:"2rem 1.5rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4vw,3rem)", color:"#d6e4f0", lineHeight:1, marginBottom:".4rem" }}>{n}</div>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.4)" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"rgba(245,240,232,.05)" }} className="ba-wrap">
          {[
            { label:"Before", dot:"rgba(245,240,232,.25)", tagColor:"rgba(245,240,232,.3)", bg:"rgba(26,26,24,.6)", borderColor:"rgba(245,240,232,.1)", textColor:"rgba(245,240,232,.45)", items:before },
            { label:"After", dot:"#3a6ea5", tagColor:"#d6e4f0", bg:"rgba(26,58,92,.4)", borderColor:"#245080", textColor:"#f5f0e8", items:after },
          ].map(({ label, dot, tagColor, bg, borderColor, textColor, items }) => (
            <div key={label} className="reveal" style={{ background:bg, padding:"3rem 2.5rem" }}>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".58rem", letterSpacing:".25em", textTransform:"uppercase", color:tagColor, display:"flex", alignItems:"center", gap:".5rem", marginBottom:"2rem" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:dot, display:"inline-block", flexShrink:0 }}/>
                {label} Engagement
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                {items.map(t => (
                  <div key={t} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:300, lineHeight:1.55, paddingLeft:"1rem", borderLeft:`1px solid ${borderColor}`, color:textColor }}>{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.ba-wrap{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── STACK ────────────────────────────────────────────────────────────────────
function Stack() {
  useReveal();
  const techs = [
    { key:"nextjs",   label:"Next.js" },
    { key:"react",    label:"React" },
    { key:"python",   label:"Python" },
    { key:"html",     label:"HTML / CSS" },
    { key:"tailwind", label:"Tailwind" },
    { key:"nodejs",   label:"Node.js" },
    { key:"express",  label:"Express" },
    { key:"supabase", label:"Supabase" },
    { key:"mongodb",  label:"MongoDB" },
    { key:"vercel",   label:"Vercel" },
    { key:"github",   label:"GitHub" },
    { key:"ai",       label:"AI Integration" },
  ];
  return (
    <section id="stack" style={{ background:"#eaf2fa", padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="section-label reveal" style={{ color:"#245080" }}>Tech Stack</div>
        <h2 className="reveal" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4.5vw,3rem)", color:"#1a3a5c", marginBottom:"4rem" }}>
          Tools I build with.
        </h2>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:2, background:"rgba(26,58,92,.08)" }}>
          {techs.map(({ key, label }) => (
            <div key={key}
              style={{ background:"#eaf2fa", padding:"2rem 1.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:".85rem", transition:"background .25s, transform .25s", cursor:"default" }}
              onMouseOver={e => { e.currentTarget.style.background="white"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.background="#eaf2fa"; e.currentTarget.style.transform="none"; }}
            >
              <div style={{ color:"#245080" }}>{StackIcons[key]}</div>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".62rem", letterSpacing:".14em", textTransform:"uppercase", color:"rgba(26,58,92,.6)", textAlign:"center" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHOWROOM ────────────────────────────────────────────────────────────────
const SHOWROOM_ITEMS = [
  { tag:"Certificate", title:"SMEDAN Federal Certificate", body:"Government-issued certificate to operate Revisit Technologies.", img:"/smedancertificate.jpg" },
  { tag:"Product",     title:"RevisitHMS", body:"An EMR built for real healthcare workflows — patient records, appointments, and billing in one platform.", img:"/revisitlabs.png" },
  { tag:"Partnership", title:"Enoma Medical Centre", body:"Strategic partnership with Enoma Medical Centre — commencing soon.", img:"/enomamdc.png" },
  { tag:"Product",     title:"Logistics App", body:"Next product — a logistics platform built around how operators actually move things.", img:"/logistics.png" },
  { tag:"Client Work",     title:"Ngo Site", body:"Client Work — Client Requested a custom Ngo Build.", img:"/ngowork1.png" },
  { tag:"Project",     title:"Mockup site", body:"Mockup Inquiry site — Made a Mockup inquiry site for Oga Bole and Foods.", img:"/Ogabole_website.png" },
  { tag:"Internship",     title:"Internship", body:"Full-satck Internship at Syntecxhub at India", img:"/internship1.png" },
  { tag:"Project",     title:"loDine", body:"Premium Resturant webApp", img:"/loDine.png" },
];

function Showroom() {
  const [active, setActive] = useState(0);
  const total = SHOWROOM_ITEMS.length;

  const prev = () => setActive(a => Math.max(0, a - 1));
  const next = () => setActive(a => Math.min(total - 1, a + 1));

  return (
    <section id="showroom" style={{ background:"#e8e0d0", padding:"7rem 0 5rem", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 2rem", marginBottom:"3rem", display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"2rem", flexWrap:"wrap" }}>
        <div>
          <div className="section-label" style={{ color:"#245080" }}>Projects · Partnerships · Achievements · Certificates</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4.5vw,3rem)", color:"#0f0e0d" }}>Showroom</h2>
        </div>
        <div style={{ display:"flex", gap:".75rem" }}>
          <button onClick={prev} disabled={active===0}
            style={{ width:44, height:44, border:"1px solid #2a2825", background:"transparent", cursor:active===0?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", color:"#0f0e0d", opacity:active===0?.25:1, transition:"background .25s" }}
            onMouseOver={e => { if(active!==0) e.currentTarget.style.background="#0f0e0d"; e.currentTarget.style.color="#f5f0e8"; }}
            onMouseOut={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0f0e0d"; }}
          >←</button>
          <button onClick={next} disabled={active===total-1}
            style={{ width:44, height:44, border:"1px solid #2a2825", background:"transparent", cursor:active===total-1?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", color:"#0f0e0d", opacity:active===total-1?.25:1, transition:"background .25s" }}
            onMouseOver={e => { if(active!==total-1) e.currentTarget.style.background="#0f0e0d"; e.currentTarget.style.color="#f5f0e8"; }}
            onMouseOut={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0f0e0d"; }}
          >→</button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding:"0 2rem", maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:2, background:"rgba(15,14,13,.08)" }}>
          {SHOWROOM_ITEMS.map((item, i) => (
            <div key={i}
              style={{ background:"#f5f0e8", overflow:"hidden", cursor:"pointer", transition:"transform .35s cubic-bezier(.16,1,.3,1)", outline: i===active?"2px solid #1a3a5c":"2px solid transparent" }}
              onClick={() => setActive(i)}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-4px)"}
              onMouseOut={e => e.currentTarget.style.transform="none"}
            >
              <div style={{ overflow:"hidden" }}>
                <img src={item.img} alt={item.title} loading="lazy"
                  style={{ width:"100%", height:200, objectFit:"cover", objectPosition:"center top", display:"block", filter:"grayscale(20%)", transition:"filter .4s, transform .5s cubic-bezier(.16,1,.3,1)" }}
                  onMouseOver={e => { e.currentTarget.style.filter="grayscale(0%)"; e.currentTarget.style.transform="scale(1.04)"; }}
                  onMouseOut={e => { e.currentTarget.style.filter="grayscale(20%)"; e.currentTarget.style.transform="none"; }}
                  onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"; }}
                />
              </div>
              <div style={{ padding:"1.5rem" }}>
                <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".56rem", letterSpacing:".22em", textTransform:"uppercase", color:"#245080", marginBottom:".5rem" }}>{item.tag}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"1.25rem", color:"#0f0e0d", marginBottom:".5rem" }}>{item.title}</div>
                <p style={{ fontFamily:"'Geist Mono',monospace", fontSize:".68rem", lineHeight:1.7, color:"rgba(15,14,13,.55)", margin:0 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display:"flex", gap:".5rem", padding:"2rem 2rem 0", maxWidth:1400, margin:"0 auto" }}>
        {SHOWROOM_ITEMS.map((_,i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ width: i===active?40:24, height:2, background: i===active?"#1a3a5c":"rgba(15,14,13,.18)", border:"none", padding:0, cursor:"pointer", transition:"all .3s" }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  useReveal();
  const services = [
    { icon:"◈", title:"Full-Stack Development", items:["React & Next.js frontends","Node.js & Express backends","REST APIs & integrations","Database design & optimisation"] },
    { icon:"◇", title:"Product Design & Build", items:["Idea to launched product","UI/UX design & prototyping","MVP scoping & roadmapping","Iterative build & feedback"] },
    { icon:"△", title:"Web Development", items:["Landing pages & portfolios","Custom web applications","CMS integration","Performance & SEO optimisation"] },
    { icon:"○", title:"Technical Co-Founder", items:["Early-stage startup partner","Architecture & tech decisions","Equity-based engagements","Long-term product ownership"] },
  ];
  return (
    <section id="services" style={{ background:"#eaf2fa", padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="section-label reveal" style={{ color:"#245080" }}>Products & Services</div>
        <h2 className="reveal" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4.5vw,3rem)", color:"#1a3a5c", marginBottom:"4rem" }}>What I deliver.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:2, background:"rgba(26,58,92,.1)" }}>
          {services.map(s => (
            <div key={s.title} className="reveal"
              style={{ background:"#eaf2fa", padding:"2.5rem 2rem", borderTop:"2px solid transparent", transition:"border-color .3s, background .3s" }}
              onMouseOver={e => { e.currentTarget.style.background="white"; e.currentTarget.style.borderColor="#245080"; }}
              onMouseOut={e => { e.currentTarget.style.background="#eaf2fa"; e.currentTarget.style.borderColor="transparent"; }}
            >
              <span style={{ fontSize:"1.5rem", color:"#245080", marginBottom:"1.25rem", display:"block" }}>{s.icon}</span>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", color:"#0f0e0d", marginBottom:"1.25rem" }}>{s.title}</div>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:".55rem" }}>
                {s.items.map(item => (
                  <li key={item} style={{ fontFamily:"'Geist Mono',monospace", fontSize:".66rem", letterSpacing:".04em", color:"rgba(15,14,13,.55)", display:"flex", alignItems:"flex-start", gap:".6rem", lineHeight:1.6 }}>
                    <span style={{ color:"#3a6ea5", flexShrink:0 }}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Freelance note */}
        <div className="reveal" style={{ marginTop:"3rem", padding:"2rem 2.5rem", background:"#1a3a5c", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
          <div>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"1.4rem", color:"#f5f0e8", marginBottom:".4rem" }}>Available for freelance work</div>
            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".68rem", color:"rgba(214,228,240,.55)", letterSpacing:".06em" }}>Open to projects, contracts, and technical co-founder conversations.</div>
          </div>
          <a href="#contact" style={{ fontFamily:"'Geist Mono',monospace", fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase", textDecoration:"none", color:"#0f0e0d", background:"#e8e0d0", padding:".75rem 1.75rem", transition:"background .3s", whiteSpace:"nowrap" }}
            onMouseOver={e => e.currentTarget.style.background="#f5f0e8"}
            onMouseOut={e => e.currentTarget.style.background="#e8e0d0"}
          >Let's Talk →</a>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST ───────────────────────────────────────────────────────────────────
function Trust() {
  useReveal();
  const testimonials = [
    { name:"Dr Iyamu", role:"Onwer of Enoma Medical Center, Hospital", quote:"I Like Your Vision and Drive" },
    { name:"Mr David Uworgiren", role:"Pastor, ", quote:"WoW!WoW!!WoW!!!Thats's my Beloved son, Uchechukwu in action. I'm Very proud of you dear. You have done so well. May my good God so bless and lift you so high in Jesus Name, amen." },
    { name:"Partner Name", role:"Role, Organisation", quote:"Coming soon" },
  ];
  const certs = [
    "SMEDAN Business Registration Certificate",
    "Revisit Technologies — 2023 NDPA Liscense coming soon",
    "Federal Republic of Nigeria — CAC Registered - coming soon",
  ];
  const teamPhotos = [
    "/Founder.png",
    "/team2.png",
    // "/",
    // "/",
  ];

  return (
    <section id="trust" style={{ background:"#1a1917", padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="section-label reveal" style={{ color:"#d6e4f0" }}>Trust & Credibility</div>
        <h2 className="reveal" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,4.5vw,3rem)", color:"#f5f0e8", marginBottom:"5rem" }}>Partnerships & Testimonials</h2>

        {/* Partners */}
        <div className="reveal" style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", marginBottom:"5rem", paddingBottom:"5rem", borderBottom:"1px solid rgba(245,240,232,.07)" }}>
          {["Revisit Technologies","Enoma Medical Centre","SMEDAN · Federal Government"].map(p => (
            <div key={p} style={{ fontFamily:"'Geist Mono',monospace", fontSize:".62rem", letterSpacing:".18em", textTransform:"uppercase", color:"rgba(245,240,232,.35)", border:"1px solid rgba(245,240,232,.12)", padding:".5rem 1.1rem", transition:"color .3s, border-color .3s", cursor:"default" }}
              onMouseOver={e => { e.currentTarget.style.color="#f5f0e8"; e.currentTarget.style.borderColor="rgba(245,240,232,.35)"; }}
              onMouseOut={e => { e.currentTarget.style.color="rgba(245,240,232,.35)"; e.currentTarget.style.borderColor="rgba(245,240,232,.12)"; }}
            >{p}</div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:2, background:"rgba(245,240,232,.04)", marginBottom:"5rem" }}>
          {testimonials.map((t,i) => (
            <div key={i} style={{ background:"#0f0e0d", padding:"2.5rem 2rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"4rem", lineHeight:.8, color:"#245080" }}>"</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", lineHeight:1.65, color:"rgba(245,240,232,.7)", fontStyle:"italic", flex:1, margin:0 }}>{t.quote}</p>
              <div style={{ borderTop:"1px solid rgba(245,240,232,.07)", paddingTop:"1rem" }}>
                <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".68rem", letterSpacing:".1em", color:"#f5f0e8" }}>{t.name}</div>
                <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".6rem", color:"rgba(245,240,232,.35)", marginTop:".2rem" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Team photos */}
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:2, marginBottom:"4rem" }}>
          {teamPhotos.map((src,i) => (
            <div key={i} style={{ aspectRatio:"3/4", overflow:"hidden" }}>
              <img src={src} alt="Team" loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(0%)", transition:"filter .4s, transform .5s" }}
                onMouseOver={e => { e.currentTarget.style.filter="grayscale(0%)"; e.currentTarget.style.transform="scale(1.05)"; }}
                onMouseOut={e => { e.currentTarget.style.filter="grayscale(0%)"; e.currentTarget.style.transform="none"; }}
              />
            </div>
          ))}
        </div>

        {/* Certs */}
        <div className="reveal" style={{ display:"flex", gap:"1.25rem", flexWrap:"wrap", paddingTop:"4rem", borderTop:"1px solid rgba(245,240,232,.07)" }}>
          {certs.map(c => (
            <div key={c} style={{ display:"flex", alignItems:"center", gap:".75rem", border:"1px solid rgba(214,228,240,.18)", padding:".75rem 1.25rem" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#3a6ea5", flexShrink:0 }}/>
              <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".63rem", letterSpacing:".1em", color:"rgba(214,228,240,.6)" }}>{c}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  useReveal();
  return (
    <section id="contact" style={{ background:"#1a3a5c", padding:"8rem 2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }} className="cta-wrap">
        <div className="reveal">
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2.5rem,6vw,4.5rem)", color:"#f5f0e8", lineHeight:1, marginBottom:"2rem" }}>
            Let's build something<br/><em style={{ fontStyle:"italic", color:"#d6e4f0" }}>real.</em>
          </h2>
          <p style={{ fontFamily:"'Geist Mono',monospace", fontSize:".7rem", lineHeight:1.85, color:"rgba(214,228,240,.55)", letterSpacing:".04em", maxWidth:380 }}>
            Freelance projects, technical co-founder conversations, and product partnerships.
            Direct access, contact me directly.
          </p>
        </div>

        <div className="reveal" style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
          {[
            { href:"mailto:support.revisit@gmail.com", icon:"✉", label:"Direct Email", value:"support.revisit@gmail.com" },
            { href:"https://x.com/mahrezbr?s=21", icon:<XIcon size={15}/>, label:"Follow on X", value:"@Mahrezbr" },
            { href:"https://www.linkedin.com/in/unique-uo-19b570341?utm_source=share_via&utm_content=profile&utm_medium=member_ios", icon:<LinkedInIcon size={15}/>, label:"Connect on LinkedIn", value:"Unique Uo" },
          ].map(({ href, icon, label, value }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"1.25rem", textDecoration:"none", padding:"1.25rem 1.5rem", border:"1px solid rgba(245,240,232,.12)", background:"rgba(245,240,232,.04)", color:"#f5f0e8", transition:"background .3s, border-color .3s" }}
              onMouseOver={e => { e.currentTarget.style.background="rgba(245,240,232,.1)"; e.currentTarget.style.borderColor="rgba(245,240,232,.3)"; }}
              onMouseOut={e => { e.currentTarget.style.background="rgba(245,240,232,.04)"; e.currentTarget.style.borderColor="rgba(245,240,232,.12)"; }}
            >
              <div style={{ color:"#d6e4f0", flexShrink:0 }}>{icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".66rem", letterSpacing:".16em", textTransform:"uppercase" }}>{label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", color:"rgba(214,228,240,.7)", marginTop:".15rem" }}>{value}</div>
              </div>
              <div style={{ color:"rgba(245,240,232,.3)", fontSize:"1.1rem" }}>→</div>
            </a>
          ))}

          <div style={{ marginTop:".5rem", background:"#e8e0d0", padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", color:"#2a2825", marginBottom:".6rem" }}>Book a Call/Whatsapp</div>
          (+234) 09060214104 →
          </div>
        </div>
      </div>
      <style>{`@media(max-width:800px){.cta-wrap{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:"#0f0e0d", borderTop:"1px solid rgba(245,240,232,.06)", padding:"2rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.25)" }}>
          © 2026 Unique U Okeke · Revisit Technologies
        </span>
        <div style={{ display:"flex", gap:"1.25rem" }}>
          {["Privacy","Terms"].map(l => (
            <a key={l} href="#" style={{ fontFamily:"'Geist Mono',monospace", fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:"rgba(245,240,232,.25)", textDecoration:"none" }}
              onMouseOver={e => e.currentTarget.style.color="rgba(245,240,232,.6)"}
              onMouseOut={e => e.currentTarget.style.color="rgba(245,240,232,.25)"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
// Section order: Show → Prove → Offer → Close
// 1. Hero        — who you are
// 2. Showroom    — real proof up front (certs, products, partnerships)
// 3. Value       — pitch lands harder after the viewer has seen real work
// 4. Trust       — testimonials reinforce the pitch
// 5. Services    — visitor trusts you now, so the offer converts
// 6. Stack       — backs up the services, shows how you deliver
// 7. ValueHooks  — closing persuasion (Before/After)
// 8. CVTeaser    — deep-dive for committed visitors
// 9. Contact     — always last
export default function PortfolioPage() {
  useReveal();
  return (
    <>
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
    </>
  );
}