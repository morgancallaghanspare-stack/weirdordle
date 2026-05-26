"use client";

import { useState, useEffect } from "react";

const categories = [
  {
    id: "phasmophobia",
    name: "Phasmodle",
    subtitle: "Guess the Ghost",
    image: "/images/hub/ghosts.jpeg",
    emoji: "👻",
    description: "Evidence clues revealed one by one. Can you ID the ghost before it hunts?",
    color: "#7B2FBE",
    accent: "#C77DFF",
    bg: "linear-gradient(135deg, #0d0015 0%, #1a0030 100%)",
    tag: "PHASMOPHOBIA",
  },
  {
    id: "crimes",
    name: "Crimedle",
    subtitle: "Guess the Crime",
    image: "/images/hub/crime.png",
    emoji: "🔪",
    description: "Year, location, method. Each clue narrows it down. Justice is served... maybe.",
    color: "#B22222",
    accent: "#FF6B6B",
    bg: "linear-gradient(135deg, #0a0000 0%, #1a0000 100%)",
    tag: "TRUE CRIME",
  },
  {
    id: "griffindle",
    name: "Griffindle",
    subtitle: "Guess the Character",
    image: "/images/hub/familyguy3.jpeg",
    emoji: "🍺",
    description: "From Quahog to your screen. Guess the Family Guy character before time runs out.",
    color: "#1565C0",
    accent: "#64B5F6",
    bg: "linear-gradient(135deg, #00050f 0%, #001525 100%)",
    tag: "FAMILY GUY",
  },
  {
    id: "fnaf",
    name: "Animatronidle",
    subtitle: "Guess the Animatronic",
    image: "/images/hub/freddy.jpeg",
    emoji: "🐻",
    description: "It's 12 AM. The power's low. Can you name them before they reach your office?",
    color: "#E65100",
    accent: "#FFB74D",
    bg: "linear-gradient(135deg, #0a0500 0%, #1a0a00 100%)",
    tag: "FNAF",
  },
  {
    id: "celebrity",
    name: "Dramadle",
    subtitle: "Guess the Scandal",
    image: "/images/hub/drama.png",
    emoji: "🎭",
    description: "The tea is piping hot. Redacted receipts, initials only. Guess the celebrity drama.",
    color: "#880E4F",
    accent: "#F48FB1",
    bg: "linear-gradient(135deg, #0a0008 0%, #1a0015 100%)",
    tag: "CELEBRITY DRAMA",
  },
  {
    id: "siege",
    name: "Operatle",
    subtitle: "Guess the Operator",
    image: "/images/hub/siege.jpeg",
    emoji: "🎯",
    description: "Gadget silhouette. Country flag. Blurred portrait. Who's breaching today?",
    color: "#1B5E20",
    accent: "#69F0AE",
    bg: "linear-gradient(135deg, #000a00 0%, #001500 100%)",
    tag: "RAINBOW SIX SIEGE",
  },
  {
    id: "floridadle",
    name: "Floridadle",
    subtitle: "Guess the Headline",
    image: "/images/hub/florida_man.png",
    emoji: "🐊",
    description: "He did WHAT with an alligator? Guess the Florida Man headline. It's always worse than you think.",
    color: "#F57F17",
    accent: "#FFF176",
    bg: "linear-gradient(135deg, #0a0800 0%, #1a1200 100%)",
    tag: "FLORIDA MAN",
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date(), midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ fontFamily:"'Courier New',monospace", fontSize:"clamp(0.85rem,2.5vw,1.2rem)", color:"#aaa", letterSpacing:"0.15em" }}>
      Next daily puzzles in <span style={{ color:"#fff", fontWeight:"bold" }}>{timeLeft}</span>
    </div>
  );
}

function HowToPlayModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#111",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"20px",padding:"20px 16px",maxWidth:"400px",width:"100%",position:"relative",boxShadow:"0 20px 80px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} style={{ position:"absolute",top:"14px",right:"14px",background:"rgba(255,255,255,0.07)",border:"none",color:"rgba(255,255,255,0.5)",width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"0.85rem" }}>✕</button>

        <div style={{ marginBottom:"20px" }}>
          <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"2.6rem",letterSpacing:"0.06em",color:"#fff",lineHeight:1 }}>HOW TO PLAY</div>
          <div style={{ fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:"rgba(255,255,255,0.35)",letterSpacing:"0.18em",marginTop:"2px" }}>WEIRDORDLE</div>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:"10px",marginBottom:"16px" }}>
          {[
            ["🗓️","Daily puzzles","Every category gets a new puzzle at midnight. Come back every day."],
            ["∞","Free play","Unlimited mode lets you play as many puzzles as you want, any time."],
            ["🔍","Clue system","Clues unlock one at a time — but only after each guess you make. No skipping ahead for free."],
            ["🎨","Visual reveals","Image-based categories hide the visual until you've made enough guesses."],
            ["🏆","Streaks","Keep guessing daily to build your streak. Leaderboards track the best streaks per category."],
            ["📋","Share","Copy your result after each game and flex on your friends."],
          ].map(([icon,title,desc]) => (
            <div key={title} style={{ display:"flex",gap:"12px",alignItems:"flex-start" }}>
              <div style={{ width:"32px",height:"32px",borderRadius:"8px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"1rem" }}>{icon}</div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace",fontSize:"0.82rem",color:"#fff",letterSpacing:"0.12em",marginBottom:"3px",fontWeight:"bold" }}>{title}</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.45)",lineHeight:1.45 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{ width:"100%",padding:"12px",borderRadius:"10px",border:"none",background:"#fff",color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.8rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer" }}>
          GOT IT — LET'S PLAY
        </button>
      </div>
    </div>
  );
}

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", borderRadius:"18px", overflow:"hidden", cursor:"pointer",
        background:cat.bg,
        border:`1px solid ${hovered ? cat.accent : "rgba(255,255,255,0.08)"}`,
        transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform:hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow:hovered ? `0 24px 70px ${cat.color}55, 0 0 0 1px ${cat.accent}33` : "0 4px 24px rgba(0,0,0,0.5)",
        animationDelay:`${index*0.08}s`, animation:"cardIn 0.55s ease both",
        display:"flex", flexDirection:"column",
      }}
    >
      <div style={{ position:"absolute",inset:0,opacity:0.03,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:"-30%",right:"-20%",width:"65%",height:"65%",background:cat.color,borderRadius:"50%",filter:"blur(60px)",opacity:hovered?0.28:0.12,transition:"opacity 0.35s ease",pointerEvents:"none" }} />

      {/* Image area */}
      <div style={{ width:"100%",height:"160px",position:"relative",overflow:"hidden",background:`linear-gradient(180deg,${cat.color}22 0%,transparent 100%)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        {cat.image ? (
          <img src={cat.image} alt={cat.name} style={{ width:"100%",height:"100%",objectFit:"cover",filter:hovered?"brightness(1) saturate(1)":"brightness(0.7) saturate(0.75)",transition:"all 0.35s ease",transform:hovered?"scale(1.06)":"scale(1)" }} />
        ) : (
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:hovered?0.6:0.35,transition:"opacity 0.3s" }}>
            <span style={{ fontSize:"3.8rem",transition:"transform 0.3s",transform:hovered?"scale(1.15)":"scale(1)",display:"block" }}>{cat.emoji}</span>
            <span style={{ fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.15em",color:"rgba(255,255,255,0.4)",border:"1px dashed rgba(255,255,255,0.15)",padding:"3px 8px",borderRadius:"4px" }}>IMAGE COMING SOON</span>
          </div>
        )}
        <span style={{ position:"absolute",top:"12px",right:"12px",fontSize:"0.56rem",fontFamily:"'Courier New',monospace",fontWeight:"bold",letterSpacing:"0.15em",padding:"4px 10px",borderRadius:"5px",background:`${cat.color}bb`,color:cat.accent,border:`1px solid ${cat.color}cc`,backdropFilter:"blur(6px)" }}>{cat.tag}</span>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"55px",background:"linear-gradient(transparent,#080808)",pointerEvents:"none" }} />
      </div>

      {/* Text */}
      <div style={{ padding:"14px 20px 20px",position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column" }}>
        <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(1.5rem,3vw,1.9rem)",fontWeight:900,color:"#fff",letterSpacing:"0.03em",lineHeight:1,marginBottom:"3px" }}>{cat.name}</div>
        <div style={{ fontFamily:"'Courier New',monospace",fontSize:"0.64rem",color:cat.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"10px",opacity:0.85 }}>{cat.subtitle}</div>
        <p style={{ fontFamily:"Georgia,serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.48)",lineHeight:1.55,margin:"0 0 16px 0",flex:1 }}>{cat.description}</p>
        <div style={{ display:"flex",gap:"8px" }}>
         <a href={`/${cat.id}`} style={{ flex:1,padding:"10px 0",borderRadius:"8px",border:"none",background:cat.color,color:"#fff",fontFamily:"'Courier New',monospace",fontSize:"0.7rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>📅 DAILY</a>
<a href={`/${cat.id}/free`} style={{ flex:1,padding:"10px 0",borderRadius:"8px",border:`1px solid ${cat.color}88`,background:"rgba(255,255,255,0.04)",color:cat.accent,fontFamily:"'Courier New',monospace",fontSize:"0.7rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>∞ FREE PLAY</a>
        </div>
      </div>

      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg,${cat.color},${cat.accent},transparent)`,opacity:hovered?1:0.22,transition:"opacity 0.35s" }} />
    </div>
  );
}

const PARTICLE_CONFIG = [
  {catIndex:0,x:4, delay:0,  size:44,rotation:-12},
  {catIndex:3,x:11,delay:3.5,size:36,rotation:8  },
  {catIndex:1,x:19,delay:1.2,size:50,rotation:-5 },
  {catIndex:6,x:27,delay:5,  size:38,rotation:14 },
  {catIndex:2,x:35,delay:2,  size:46,rotation:-18},
  {catIndex:4,x:44,delay:7,  size:34,rotation:6  },
  {catIndex:5,x:52,delay:0.8,size:52,rotation:-8 },
  {catIndex:0,x:61,delay:4.2,size:38,rotation:20 },
  {catIndex:3,x:69,delay:1.8,size:42,rotation:-15},
  {catIndex:6,x:76,delay:6,  size:36,rotation:10 },
  {catIndex:2,x:83,delay:2.8,size:48,rotation:-4 },
  {catIndex:5,x:91,delay:4.8,size:40,rotation:16 },
];

function FloatingParticle({ cat, delay, x, size, rotation }) {
  return (
    <div style={{ position:"fixed",left:`${x}%`,bottom:"-15%",width:`${size}px`,height:`${size}px`,opacity:0,animation:`floatUp ${10+delay*1.5}s ease-in-out ${delay}s infinite`,pointerEvents:"none",zIndex:0,userSelect:"none",filter:`drop-shadow(0 0 8px ${cat.color}88)` }}>
      {cat.image ? (
        <img src={cat.image} alt="" style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"10px",opacity:0.18,transform:`rotate(${rotation}deg)` }} />
      ) : (
        <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:`${size*0.7}px`,transform:`rotate(${rotation}deg)`,opacity:0.18 }}>{cat.emoji}</div>
      )}
    </div>
  );
}

export default function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ minHeight:"100vh",background:"#080808",color:"#fff",fontFamily:"Georgia,serif",position:"relative",overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes cardIn{from{opacity:0;transform:translateY(32px) scale(0.94)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes floatUp{0%{transform:translateY(0) rotate(0deg);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translateY(-115vh) rotate(25deg);opacity:0}}
        @keyframes titlePop{from{opacity:0;transform:scale(0.82) translateY(-24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes subtitleIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#111;}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:3px;}
      `}</style>

      <div style={{ position:"fixed",top:0,left:0,right:0,height:"2px",background:"rgba(255,255,255,0.025)",animation:"scanline 8s linear infinite",pointerEvents:"none",zIndex:100 }} />
      <div style={{ position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none",zIndex:0 }} />

      {PARTICLE_CONFIG.map((p,i) => <FloatingParticle key={i} cat={categories[p.catIndex]} x={p.x} delay={p.delay} size={p.size} rotation={p.rotation} />)}

      {/* ? button — top right corner */}
      <button onClick={() => setShowHelp(true)} style={{ position:"fixed",top:"16px",right:"16px",zIndex:150,width:"36px",height:"36px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.7)",fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",transition:"all 0.2s" }}>?</button>

      {showHelp && <HowToPlayModal onClose={() => setShowHelp(false)} />}

      <div style={{ position:"relative",zIndex:1,maxWidth:"1140px",margin:"0 auto",padding:"clamp(24px,5vw,64px) clamp(16px,4vw,40px)" }}>

        {/* Header */}
        <div style={{ textAlign:"center",marginBottom:"clamp(40px,6vw,72px)" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",padding:"5px 16px",marginBottom:"22px",fontFamily:"'Courier New',monospace",fontSize:"0.62rem",letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)" }}>
            <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#4CAF50",display:"inline-block",animation:"pulse 2s ease infinite" }} />
            DAILY PUZZLES LIVE
          </div>

          <h1 style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(4rem,16vw,10rem)",fontWeight:900,letterSpacing:"0.06em",lineHeight:0.88,animation:"titlePop 0.65s cubic-bezier(0.34,1.56,0.64,1) both",background:"linear-gradient(175deg,#ffffff 0%,#666666 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:"14px",userSelect:"none" }}>
            WEIRDORDLE
          </h1>

          <p style={{ fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"clamp(0.85rem,2vw,1.05rem)",color:"rgba(255,255,255,0.38)",letterSpacing:"0.04em",animation:"subtitleIn 0.6s ease 0.3s both",marginBottom:"26px" }}>
            Daily puzzles for unwell people.
          </p>

          <CountdownTimer />
        </div>

        {/* Grid */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,310px),1fr))",gap:"clamp(14px,2vw,22px)",marginBottom:"64px" }}>
          {categories.map((cat,i) => <CategoryCard key={cat.id} cat={cat} index={i} />)}
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"32px",fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:"rgba(255,255,255,0.18)",letterSpacing:"0.12em" }}>
          NEW PUZZLES DROP AT MIDNIGHT · STREAKS RESET DAILY · NO CHEATING (we're watching 👀)
        </div>
      </div>
    </div>
  );
}