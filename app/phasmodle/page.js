"use client";
import { useState, useEffect } from "react";

// ============================================================
//  GHOST DATABASE
//  Each ghost has 4 attributes:
//  - speed: SLOW / NORMAL / FAST / VARIABLE
//  - evidence: array of 3 evidence types
//  - blink: SLOW / NORMAL / FAST / NONE (how fast it blinks when hunting)
//  - ability: short description of unique ability
// ============================================================
const GHOSTS = [
  {
    id: 1,
    name: "Spirit",
    speed: "NORMAL",
    evidence: ["EMF 5", "SPIRIT BOX", "GHOST WRITING"],
    blink: "NORMAL",
    ability: "Smudge sticks stop hunts for longer",
    image: null,
  },
  {
    id: 2,
    name: "Wraith",
    speed: "NORMAL",
    evidence: ["EMF 5", "SPIRIT BOX", "D.O.T.S"],
    blink: "NORMAL",
    ability: "Teleports to players, never steps in salt",
    image: null,
  },
  {
    id: 3,
    name: "Phantom",
    speed: "NORMAL",
    evidence: ["SPIRIT BOX", "ULTRAVIOLET", "D.O.T.S"],
    blink: "SLOW",
    ability: "Taking a photo makes it disappear temporarily",
    image: null,
  },
  {
    id: 4,
    name: "Poltergeist",
    speed: "NORMAL",
    evidence: ["SPIRIT BOX", "ULTRAVIOLET", "GHOST WRITING"],
    blink: "NORMAL",
    ability: "Throws multiple items at once",
    image: null,
  },
  {
    id: 5,
    name: "Banshee",
    speed: "NORMAL",
    evidence: ["ULTRAVIOLET", "GHOST ORB", "D.O.T.S"],
    blink: "NORMAL",
    ability: "Targets one player exclusively, screams on parabolic mic",
    image: null,
  },
  {
    id: 6,
    name: "Jinn",
    speed: "FAST",
    evidence: ["EMF 5", "ULTRAVIOLET", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "Moves fast if target is far away, can't use ability if fuse is off",
    image: null,
  },
  {
    id: 7,
    name: "Mare",
    speed: "NORMAL",
    evidence: ["SPIRIT BOX", "GHOST ORB", "GHOST WRITING"],
    blink: "FAST",
    ability: "Hunts earlier in darkness, turns off lights",
    image: null,
  },
  {
    id: 8,
    name: "Revenant",
    speed: "VARIABLE",
    evidence: ["GHOST ORB", "GHOST WRITING", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "Very slow when roaming, extremely fast when chasing",
    image: null,
  },
  {
    id: 9,
    name: "Shade",
    speed: "NORMAL",
    evidence: ["EMF 5", "GHOST WRITING", "FREEZING TEMPS"],
    blink: "SLOW",
    ability: "Rarely hunts when players are nearby, shy ghost",
    image: null,
  },
  {
    id: 10,
    name: "Demon",
    speed: "NORMAL",
    evidence: ["ULTRAVIOLET", "GHOST WRITING", "FREEZING TEMPS"],
    blink: "FAST",
    ability: "Hunts more often and earlier than any other ghost",
    image: null,
  },
  {
    id: 11,
    name: "Yurei",
    speed: "NORMAL",
    evidence: ["GHOST ORB", "FREEZING TEMPS", "D.O.T.S"],
    blink: "NORMAL",
    ability: "Drops sanity faster, smudging traps it in its room",
    image: null,
  },
  {
    id: 12,
    name: "Oni",
    speed: "FAST",
    evidence: ["EMF 5", "FREEZING TEMPS", "D.O.T.S"],
    blink: "FAST",
    ability: "More active when players nearby, never creates ghost mist",
    image: null,
  },
  {
    id: 13,
    name: "Yokai",
    speed: "NORMAL",
    evidence: ["SPIRIT BOX", "GHOST ORB", "D.O.T.S"],
    blink: "FAST",
    ability: "Talking near it triggers hunts, can only hear nearby during hunt",
    image: null,
  },
  {
    id: 14,
    name: "Hantu",
    speed: "VARIABLE",
    evidence: ["ULTRAVIOLET", "GHOST ORB", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "Faster in cold rooms, slower in warm rooms",
    image: null,
  },
  {
    id: 15,
    name: "Goryo",
    speed: "NORMAL",
    evidence: ["EMF 5", "ULTRAVIOLET", "D.O.T.S"],
    blink: "SLOW",
    ability: "D.O.T.S only visible on camera, rarely leaves ghost room",
    image: null,
  },
  {
    id: 16,
    name: "Myling",
    speed: "NORMAL",
    evidence: ["EMF 5", "ULTRAVIOLET", "GHOST WRITING"],
    blink: "SLOW",
    ability: "Very quiet footsteps during hunts, louder on parabolic mic",
    image: null,
  },
  {
    id: 17,
    name: "Onryo",
    speed: "NORMAL",
    evidence: ["SPIRIT BOX", "GHOST ORB", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "Flames prevent hunts — blowing one out can trigger a hunt",
    image: null,
  },
  {
    id: 18,
    name: "The Twins",
    speed: "VARIABLE",
    evidence: ["EMF 5", "SPIRIT BOX", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "One twin lures, one hunts — different speeds",
    image: null,
  },
  {
    id: 19,
    name: "Raiju",
    speed: "FAST",
    evidence: ["EMF 5", "GHOST ORB", "D.O.T.S"],
    blink: "NORMAL",
    ability: "Speeds up near active electronic equipment",
    image: null,
  },
  {
    id: 20,
    name: "Obake",
    speed: "NORMAL",
    evidence: ["EMF 5", "ULTRAVIOLET", "GHOST ORB"],
    blink: "FAST",
    ability: "Can shapeshift fingerprints, may leave 6-fingered print",
    image: null,
  },
  {
    id: 21,
    name: "The Mimic",
    speed: "VARIABLE",
    evidence: ["SPIRIT BOX", "ULTRAVIOLET", "FREEZING TEMPS"],
    blink: "VARIABLE",
    ability: "Copies other ghosts' behaviours and abilities",
    image: null,
  },
  {
    id: 22,
    name: "Moroi",
    speed: "VARIABLE",
    evidence: ["SPIRIT BOX", "GHOST WRITING", "FREEZING TEMPS"],
    blink: "NORMAL",
    ability: "Faster as your sanity drops, curse through spirit box",
    image: null,
  },
  {
    id: 23,
    name: "Deogen",
    speed: "VARIABLE",
    evidence: ["SPIRIT BOX", "GHOST WRITING", "D.O.T.S"],
    blink: "SLOW",
    ability: "Always knows where you are, very slow when close to player",
    image: null,
  },
  {
    id: 24,
    name: "Thaye",
    speed: "VARIABLE",
    evidence: ["GHOST ORB", "GHOST WRITING", "D.O.T.S"],
    blink: "FAST",
    ability: "Starts fast and aggressive, slows down and ages over time",
    image: null,
  },
  {
    id: 25,
    name: "Dayan",
    speed: "VARIABLE",
    evidence: ["GHOST ORB", "SPIRIT BOX", "EMF 5"],
    blink: "NORMAL",
    ability: "Becomes fast when you move, slow when you dont",
    image: null,
  },
  {
    id: 26,
    name: "Aswang",
    speed: "NORMAL",
    evidence: ["FREEZING TEMPS", "GHOST WRITING", "D.O.T.S"],
    blink: "NORMAL",
    ability: "Cannot kill if you are hidden",
    image: null,
  },
  {
    id: 27,
    name: "Kormos",
    speed: "VARIABLE",
    evidence: ["GHOST ORB", "SPIRIT BOX", "ULTRAVIOLET"],
    blink: "FAST",
    ability: "Is blind with incredible hearing",
    image: null,
  },
  {
    id: 28,
    name: "Gallu",
    speed: "VARIABLE",
    evidence: ["EMF 5", "SPIRIT BOX", "ULTRAVIOLET"],
    blink: "NORMAL",
    ability: "More agressive after using protective equipment",
    image: null,
  },
  {
    id: 29,
    name: "Obambo",
    speed: "VARIABLE",
    evidence: ["ULTRAVIOLET", "GHOST WRITING", "D.O.T.S"],
    blink: "FAST",
    ability: "Switches between calm and agressive states",
    image: null,
  },
];

function getDailyGhost() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return GHOSTS[day % GHOSTS.length];
}

const MAX = 5;
const BG = "#0a0f0a";
const GREEN = "#4ade80";
const RED = "#ef4444";
const PANEL = "#111a11";
const BORDER = "#1f3320";
const ACCENT = "#4ade80";
const DIM = "#334433";

// Evidence badge colors
const EVIDENCE_COLORS = {
  "EMF 5":          "#f59e0b",
  "SPIRIT BOX":     "#818cf8",
  "ULTRAVIOLET":    "#a855f7",
  "GHOST ORB":      "#22d3ee",
  "GHOST WRITING":  "#fb7185",
  "FREEZING TEMPS": "#67e8f9",
  "D.O.T.S":        "#86efac",
};

function EvidenceBadge({ label }) {
  const color = EVIDENCE_COLORS[label] || "#aaa";
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:"4px",
      padding:"2px 7px", borderRadius:"4px",
      background:`${color}22`, border:`1px solid ${color}66`,
      fontFamily:"'Courier New',monospace", fontSize:"0.52rem",
      color, letterSpacing:"0.08em", whiteSpace:"nowrap",
    }}>{label}</span>
  );
}

// The Phasmophobia-style ID badge
function GhostIDBadge({ ghost, guessCount, gameState }) {
  const revealed = gameState !== "playing";
  return (
    <div style={{
      width:"100%", maxWidth:"280px", margin:"0 auto",
      background:"linear-gradient(160deg,#0d1f0e,#0a150b)",
      border:`1px solid ${revealed?"#4ade8066":"#1f3320"}`,
      borderRadius:"8px", overflow:"hidden",
      boxShadow: revealed
        ? "0 0 40px rgba(74,222,128,0.15), 0 0 80px rgba(74,222,128,0.05)"
        : "0 0 20px rgba(0,0,0,0.8)",
      transition:"all 0.8s ease",
      fontFamily:"'Courier New',monospace",
    }}>
      {/* Badge header bar */}
      <div style={{
        background:"#0d1f0e",
        borderBottom:`1px solid ${BORDER}`,
        padding:"8px 12px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:revealed?"#4ade80":"#ef4444",boxShadow:revealed?"0 0 8px #4ade80":"0 0 8px #ef4444",animation:"pulse 2s ease infinite"}}/>
          <span style={{fontSize:"0.5rem",color:"#4ade8088",letterSpacing:"0.2em"}}>PHASMO INVESTIGATION UNIT</span>
        </div>
        <span style={{fontSize:"0.5rem",color:"#4ade8044",letterSpacing:"0.1em"}}>ID-{String(ghost?.id || "??").padStart(3,"0")}</span>
      </div>

      {/* Ghost image / silhouette */}
      <div style={{
        height:"160px", position:"relative",
        background:"linear-gradient(180deg,#061008,#0a150b)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
        borderBottom:`1px solid ${BORDER}`,
      }}>
        {/* Spooky scanlines */}
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)",pointerEvents:"none",zIndex:2}}/>

        {/* Green tint overlay */}
        <div style={{position:"absolute",inset:0,background:"rgba(74,222,128,0.03)",pointerEvents:"none",zIndex:1}}/>

        {ghost?.image && revealed ? (
          <img src={ghost.image} alt={ghost.name} style={{width:"100%",height:"100%",objectFit:"contain",filter:"brightness(0.85) saturate(0.8)",zIndex:0}}/>
        ) : (
          // Ghost silhouette
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",zIndex:3}}>
            <div style={{
              width:"70px", height:"90px", position:"relative",
              filter: revealed ? "none" : "blur(0px)",
            }}>
              {/* Ghost body shape */}
              <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
                <path d="M35 5 C15 5 5 20 5 40 C5 60 5 75 5 85 C5 85 12 78 17 85 C22 78 27 85 35 85 C43 85 48 78 53 85 C58 78 65 85 65 85 C65 75 65 60 65 40 C65 20 55 5 35 5Z"
                  fill={revealed?"rgba(74,222,128,0.15)":"rgba(74,222,128,0.08)"}
                  stroke={revealed?"rgba(74,222,128,0.6)":"rgba(74,222,128,0.2)"}
                  strokeWidth="1"
                />
                {revealed && <>
                  <circle cx="25" cy="38" r="5" fill="rgba(74,222,128,0.8)"/>
                  <circle cx="45" cy="38" r="5" fill="rgba(74,222,128,0.8)"/>
                </>}
                {!revealed && <>
                  <circle cx="25" cy="38" r="4" fill="rgba(74,222,128,0.15)"/>
                  <circle cx="45" cy="38" r="4" fill="rgba(74,222,128,0.15)"/>
                </>}
              </svg>
            </div>
            <div style={{
              fontFamily:"'Courier New',monospace",
              fontSize: revealed ? "1rem" : "0.65rem",
              color: revealed ? "#4ade80" : "#4ade8044",
              letterSpacing:"0.15em",
              textShadow: revealed ? "0 0 20px rgba(74,222,128,0.8)" : "none",
              transition:"all 0.8s ease",
            }}>
              {revealed ? ghost?.name?.toUpperCase() : "IDENTITY UNKNOWN"}
            </div>
          </div>
        )}

        {/* Guess counter overlay */}
        <div style={{position:"absolute",top:"8px",right:"8px",zIndex:4,display:"flex",gap:"4px"}}>
          {Array.from({length:MAX}).map((_,i)=>(
            <div key={i} style={{width:"8px",height:"8px",borderRadius:"2px",background:i<guessCount?"#ef444488":i===guessCount&&gameState==="playing"?"#4ade8088":"#1f3320",transition:"background 0.3s"}}/>
          ))}
        </div>
      </div>

      {/* Classification strip */}
      <div style={{
        padding:"8px 12px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:`1px solid ${BORDER}`,
      }}>
        <div>
          <div style={{fontSize:"0.42rem",color:"#4ade8055",letterSpacing:"0.18em",marginBottom:"2px"}}>CLASSIFICATION</div>
          <div style={{fontSize:"0.65rem",color:revealed?"#4ade80":"#4ade8033",letterSpacing:"0.12em",transition:"color 0.8s"}}>
            {revealed ? "IDENTIFIED" : "UNKNOWN ENTITY"}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"0.42rem",color:"#4ade8055",letterSpacing:"0.18em",marginBottom:"2px"}}>THREAT LEVEL</div>
          <div style={{fontSize:"0.65rem",color:"#ef4444",letterSpacing:"0.12em"}}>HIGH</div>
        </div>
      </div>

      {/* Barcode */}
      <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"1px"}}>
        {Array.from({length:28}).map((_,i)=>(
          <div key={i} style={{width:i%3===0?"2px":"1px",height:i%5===0?"16px":"12px",background:"#4ade8033",borderRadius:"1px"}}/>
        ))}
      </div>
    </div>
  );
}

// A single guess row showing attribute comparison
function GuessRow({ guessedGhost, answerGhost }) {
  const speedMatch = guessedGhost.speed === answerGhost.speed;
  const blinkMatch = guessedGhost.blink === answerGhost.blink;
  const evidenceMatch = JSON.stringify([...guessedGhost.evidence].sort()) === JSON.stringify([...answerGhost.evidence].sort());
  const abilityMatch = guessedGhost.ability === answerGhost.ability;

 const Cell = ({ label, value, match, wide, answerEvidence }) => {
    if (label === "Evidence" && Array.isArray(value) && answerEvidence) {
      const allMatch = value.every(e => answerEvidence.includes(e)) && value.length === answerEvidence.length;
      return (
        <div style={{flex:wide?2:1,padding:"8px",background:allMatch?"rgba(74,222,128,0.12)":"rgba(239,68,68,0.04)",border:`1px solid ${allMatch?"rgba(74,222,128,0.4)":"rgba(239,68,68,0.2)"}`,borderRadius:"6px",animation:"rowIn 0.4s ease both"}}>
          <div style={{fontSize:"0.42rem",color:allMatch?"#4ade8077":"#ef444477",letterSpacing:"0.14em",marginBottom:"6px",textTransform:"uppercase"}}>Evidence</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>
            {value.map(e=>{
              const matched = answerEvidence.includes(e);
              const color = EVIDENCE_COLORS[e] || "#aaa";
              return (
                <span key={e} style={{
                  display:"inline-flex",alignItems:"center",gap:"4px",
                  padding:"3px 8px",borderRadius:"4px",
                  background: matched ? `${color}33` : "rgba(239,68,68,0.1)",
                  border: `1px solid ${matched ? color+"88" : "rgba(239,68,68,0.3)"}`,
                  fontFamily:"'Courier New',monospace",fontSize:"0.52rem",
                  color: matched ? color : "#ef444488",
                  letterSpacing:"0.06em",
                  boxShadow: matched ? `0 0 8px ${color}44` : "none",
                  transition:"all 0.3s ease",
                  textDecoration: matched ? "none" : "line-through",
                }}>
                  {matched ? "✓" : "✗"} {e}
                </span>
              );
            })}
          </div>
          <div style={{marginTop:"5px",fontSize:"0.55rem",color:allMatch?"#4ade8077":"rgba(255,255,255,0.2)",letterSpacing:"0.08em"}}>
            {value.filter(e=>answerEvidence.includes(e)).length}/{value.length} match
          </div>
        </div>
      );
    }
    return (
      <div style={{flex:wide?2:1,padding:"8px",background:match?"rgba(74,222,128,0.12)":"rgba(239,68,68,0.08)",border:`1px solid ${match?"rgba(74,222,128,0.4)":"rgba(239,68,68,0.3)"}`,borderRadius:"6px",transition:"all 0.4s ease",animation:"rowIn 0.4s ease both"}}>
        <div style={{fontSize:"0.42rem",color:match?"#4ade8077":"#ef444477",letterSpacing:"0.14em",marginBottom:"4px",textTransform:"uppercase"}}>{label}</div>
        <div style={{fontSize:"0.65rem",color:match?"#4ade80":"#ef4444",fontWeight:"bold",letterSpacing:"0.06em",lineHeight:1.3}}>{value}</div>
        <div style={{marginTop:"4px",fontSize:"0.7rem"}}>{match?"✅":"❌"}</div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"4px",animation:"rowIn 0.5s ease both"}}>
      {/* Ghost name header */}
      <div style={{
        padding:"6px 10px",
        background:"#0d1f0e",
        border:`1px solid ${BORDER}`,
        borderRadius:"6px",
        display:"flex", alignItems:"center", gap:"8px",
      }}>
        <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4ade8066"}}/>
        <span style={{fontSize:"0.7rem",color:"#4ade80",letterSpacing:"0.1em",fontWeight:"bold"}}>{guessedGhost.name.toUpperCase()}</span>
        <span style={{fontSize:"0.5rem",color:"#4ade8044",marginLeft:"auto",letterSpacing:"0.1em"}}>
          {[speedMatch,evidenceMatch,blinkMatch,abilityMatch].filter(Boolean).length}/4 MATCH
        </span>
      </div>
      {/* Attribute cells */}
      <div style={{display:"flex",gap:"4px"}}>
        <Cell label="Speed"    value={guessedGhost.speed}    match={speedMatch}   />
        <Cell label="Evidence" value={guessedGhost.evidence} match={evidenceMatch} wide answerEvidence={answerGhost.evidence}/>
        <Cell label="Blink"    value={guessedGhost.blink}    match={blinkMatch}   />
        <Cell label="Ability"  value={guessedGhost.ability}  match={abilityMatch} wide />
      </div>
    </div>
  );
}

// Ghost journal dropdown
function GhostJournal({ onSelect, usedNames }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const available = GHOSTS.filter(g =>
    !usedNames.includes(g.name) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{position:"relative",flex:1}}>
      <div
        onClick={()=>setOpen(o=>!o)}
        style={{
          padding:"10px 14px", borderRadius:"8px",
          border:`1px solid ${open?"#4ade8066":"#1f3320"}`,
          background:"#0d1f0e", color:"#4ade80",
          fontFamily:"'Courier New',monospace", fontSize:"0.75rem",
          letterSpacing:"0.08em", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          userSelect:"none",
        }}
      >
        <span style={{color:"#4ade8066"}}>▶ SELECT GHOST FROM JOURNAL...</span>
        <span style={{fontSize:"0.6rem",opacity:0.5}}>{open?"▲":"▼"}</span>
      </div>

      {open && (
        <div style={{
          position:"absolute", bottom:"110%", left:0, right:0,
          background:"#0a150b", border:`1px solid #1f3320`,
          borderRadius:"8px", overflow:"hidden",
          boxShadow:"0 -10px 40px rgba(0,0,0,0.8)",
          zIndex:100, maxHeight:"280px",
          display:"flex", flexDirection:"column",
        }}>
          {/* Search */}
          <div style={{padding:"8px",borderBottom:`1px solid ${BORDER}`}}>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search ghost..."
              autoFocus
              style={{width:"100%",background:"#061008",border:`1px solid ${BORDER}`,borderRadius:"4px",padding:"6px 10px",color:"#4ade80",fontFamily:"'Courier New',monospace",fontSize:"0.7rem",outline:"none"}}
            />
          </div>
          {/* Ghost list */}
          <div style={{overflowY:"auto",flex:1}}>
            {available.length === 0 ? (
              <div style={{padding:"12px",textAlign:"center",color:"#4ade8044",fontSize:"0.65rem",fontFamily:"'Courier New',monospace"}}>NO GHOSTS FOUND</div>
            ) : available.map(g=>(
              <div
                key={g.id}
                onClick={()=>{onSelect(g);setOpen(false);setSearch("");}}
                style={{
                  padding:"10px 14px",
                  borderBottom:`1px solid ${BORDER}`,
                  cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"10px",
                  transition:"background 0.15s",
                  fontFamily:"'Courier New',monospace",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="#0d1f0e"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4ade8055",flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.72rem",color:"#4ade80",letterSpacing:"0.08em"}}>{g.name}</div>
                  <div style={{display:"flex",gap:"3px",marginTop:"3px",flexWrap:"wrap"}}>
                    {g.evidence.map(e=><EvidenceBadge key={e} label={e}/>)}
                  </div>
                </div>
                <div style={{fontSize:"0.55rem",color:"#4ade8044",letterSpacing:"0.08em"}}>{g.speed}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Win/lose modal
function ResultModal({ answer, guesses, gameState, onClose }) {
  const won = gameState === "won";
  const copy = () => navigator.clipboard.writeText(
    ["WEIRDORDLE — Phasmodle 👻",
     won ? `Identified in ${guesses.length}/${MAX}` : "Entity unidentified",
     guesses.map(g => {
       const sm = g.speed===answer.speed, em = JSON.stringify([...g.evidence].sort())===JSON.stringify([...answer.evidence].sort()), bm = g.blink===answer.blink, am = g.ability===answer.ability;
       return `${g.name}: ${[sm,em,bm,am].map(m=>m?"🟩":"🟥").join("")}`;
     }).join("\n"),
     "weirdordle.com"].join("\n")
  );

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.3s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0a150b",border:`1px solid ${won?"#4ade8055":"#ef444455"}`,borderRadius:"12px",padding:"28px",maxWidth:"400px",width:"100%",fontFamily:"'Courier New',monospace",boxShadow:`0 0 60px ${won?"rgba(74,222,128,0.1)":"rgba(239,68,68,0.1)"}`,animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both"}}>
        <div style={{textAlign:"center",marginBottom:"20px"}}>
          <div style={{fontSize:"2.5rem",marginBottom:"8px"}}>{won?"👻":"💀"}</div>
          <div style={{fontSize:"1.2rem",fontWeight:"bold",color:won?"#4ade80":"#ef4444",letterSpacing:"0.1em",marginBottom:"6px"}}>
            {won?`IDENTIFIED IN ${guesses.length}/${MAX}`:"ENTITY ESCAPED"}
          </div>
          <div style={{fontSize:"0.65rem",color:"#4ade8066",letterSpacing:"0.12em",marginBottom:"4px"}}>THE GHOST WAS</div>
          <div style={{fontSize:"1.4rem",color:"#4ade80",letterSpacing:"0.15em",textShadow:"0 0 20px rgba(74,222,128,0.5)"}}>{answer.name.toUpperCase()}</div>
        </div>

        {/* Evidence summary */}
        <div style={{background:"#0d1f0e",border:`1px solid ${BORDER}`,borderRadius:"8px",padding:"12px",marginBottom:"16px"}}>
          <div style={{fontSize:"0.5rem",color:"#4ade8055",letterSpacing:"0.18em",marginBottom:"8px"}}>EVIDENCE</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"8px"}}>
            {answer.evidence.map(e=><EvidenceBadge key={e} label={e}/>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginTop:"8px"}}>
            {[["SPEED",answer.speed],["BLINK",answer.blink]].map(([l,v])=>(
              <div key={l}>
                <div style={{fontSize:"0.42rem",color:"#4ade8044",letterSpacing:"0.14em",marginBottom:"2px"}}>{l}</div>
                <div style={{fontSize:"0.65rem",color:"#4ade80"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={copy} style={{flex:1,padding:"10px",borderRadius:"8px",border:`1px solid #4ade8044`,background:"transparent",color:"#4ade80",fontFamily:"'Courier New',monospace",fontSize:"0.62rem",letterSpacing:"0.1em",cursor:"pointer"}}>📋 COPY RESULT</button>
          <button onClick={onClose} style={{flex:1,padding:"10px",borderRadius:"8px",border:"none",background:"#4ade8022",color:"#4ade80",fontFamily:"'Courier New',monospace",fontSize:"0.62rem",letterSpacing:"0.1em",cursor:"pointer"}}>VIEW BOARD</button>
        </div>

        <div style={{textAlign:"center",marginTop:"12px",fontSize:"0.5rem",color:"#4ade8033",letterSpacing:"0.12em"}}>
          NEW GHOST AT MIDNIGHT · WEIRDORDLE.COM
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const ANSWER = getDailyGhost();
  const [guesses,    setGuesses]    = useState([]);
  const [state,      setState]      = useState("playing");
  const [showResult, setShowResult] = useState(false);
  const [showHelp,   setShowHelp]   = useState(false);

  const handleGuess = (ghost) => {
    if (state !== "playing") return;
    const next = [...guesses, ghost];
    setGuesses(next);
    if (ghost.name === ANSWER.name) {
      setState("won");
      setTimeout(()=>setShowResult(true), 800);
    } else if (next.length >= MAX) {
      setState("lost");
      setTimeout(()=>setShowResult(true), 800);
    }
  };

  const usedNames = guesses.map(g=>g.name);

  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:BG,color:"#fff",fontFamily:"'Courier New',monospace",display:"flex",flexDirection:"column",padding:"10px 14px 70px",gap:"8px",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        html{font-size:18px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes rowIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes flicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.6}94%{opacity:1}96%{opacity:0.8}97%{opacity:1}}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#061008;}
        ::-webkit-scrollbar-thumb{background:#1f3320;border-radius:2px;}
      `}</style>

      {/* Scanline effect */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:"2px",background:"rgba(74,222,128,0.03)",animation:"scanline 6s linear infinite",pointerEvents:"none",zIndex:100}}/>
      {/* BG grid */}
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(74,222,128,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.015) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none",zIndex:0}}/>
      {/* Vignette */}
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.6) 100%)",pointerEvents:"none",zIndex:0}}/>

      {showResult && <ResultModal answer={ANSWER} guesses={guesses} gameState={state} onClose={()=>setShowResult(false)}/>}

      {/* HOW TO PLAY */}
      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0a150b",border:"1px solid #1f3320",borderRadius:"12px",padding:"24px",maxWidth:"380px",width:"100%",position:"relative",boxShadow:"0 0 60px rgba(74,222,128,0.08)"}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(74,222,128,0.06)",border:"none",color:"#4ade8066",width:"26px",height:"26px",borderRadius:"50%",cursor:"pointer",fontSize:"0.8rem"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
              <span style={{fontSize:"1.4rem"}}>👻</span>
              <div>
                <div style={{fontSize:"1.1rem",fontWeight:"bold",color:"#4ade80",letterSpacing:"0.1em"}}>HOW TO PLAY</div>
                <div style={{fontSize:"0.52rem",color:"#4ade8055",letterSpacing:"0.14em"}}>PHASMODLE</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {[
                ["📖","Pick a ghost","Open the journal and select any ghost you think it might be."],
                ["🟩","Green = match","If a category matches the answer it turns green. Red means it's different."],
                ["⚡","4 categories","Speed, Evidence, Blink rate and Ability — all must match to identify the ghost."],
                ["5️⃣","Five attempts","You only get 5 guesses — choose carefully using the evidence."],
                ["👻","ID badge","The ghost's identity is hidden on the ID badge until you identify it correctly."],
                ["📋","Share","Copy your result after the game. New ghost every day at midnight."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"6px",background:"rgba(74,222,128,0.06)",border:"1px solid #1f3320",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>{icon}</div>
                  <div>
                    <div style={{fontSize:"0.62rem",color:"#4ade80",letterSpacing:"0.1em",marginBottom:"2px"}}>{title}</div>
                    <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)",lineHeight:1.4}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHelp(false)} style={{marginTop:"20px",width:"100%",padding:"10px",borderRadius:"8px",border:"none",background:"rgba(74,222,128,0.12)",color:"#4ade80",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.12em",cursor:"pointer",border:"1px solid #1f3320"}}>
              UNDERSTOOD — BEGIN INVESTIGATION
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"8px",borderBottom:`1px solid ${BORDER}`,flexShrink:0,position:"relative",zIndex:1,animation:"flicker 8s ease infinite"}}>
        <a href="/" style={{fontSize:"0.9rem",letterSpacing:"0.06em",color:"#4ade8055",cursor:"pointer",textDecoration:"none",transition:"color 0.2s"}}>← WEIRDORDLE</a>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"1.1rem"}}>👻</span>
          <span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",letterSpacing:"0.06em",color:"#4ade80",textShadow:"0 0 20px rgba(74,222,128,0.4)"}}>PHASMODLE</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <div style={{fontSize:"0.52rem",letterSpacing:"0.14em",color:"#0a150b",background:"#4ade80",padding:"3px 8px",borderRadius:"20px",fontWeight:"bold"}}>DAILY</div>
          <button onClick={()=>setShowHelp(true)} style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #1f3320",background:"rgba(74,222,128,0.06)",color:"#4ade80",fontSize:"0.9rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        </div>
      </div>

      {/* ATTEMPT BAR */}
      <div style={{display:"flex",alignItems:"center",gap:"5px",flexShrink:0,position:"relative",zIndex:1}}>
        {Array.from({length:MAX}).map((_,i)=>(
          <div key={i} style={{flex:1,height:"3px",borderRadius:"2px",transition:"background 0.3s",
            background:i<guesses.length?(guesses[i].name===ANSWER.name?"#4ade80":"#ef4444"):i===guesses.length&&state==="playing"?"#4ade8044":"#1f3320"}}/>
        ))}
        <span style={{fontSize:"0.48rem",color:"#4ade8044",letterSpacing:"0.1em",marginLeft:"4px",whiteSpace:"nowrap"}}>
          {state==="playing"?`${MAX-guesses.length} LEFT`:state==="won"?"✅ ID'D":"❌ ESCAPED"}
        </span>
      </div>

      {/* MAIN GRID */}
      <div style={{flex:1,display:"grid",gridTemplateColumns:"300px 1fr",gap:"12px",minHeight:0,position:"relative",zIndex:1}}>

        {/* LEFT — ID badge + legend */}
        <div style={{display:"flex",flexDirection:"column",gap:"10px",minHeight:0}}>
          <GhostIDBadge ghost={ANSWER} guessCount={guesses.length} gameState={state}/>

          {/* Evidence legend */}
          <div style={{background:PANEL,border:`1px solid ${BORDER}`,borderRadius:"8px",padding:"10px",flex:1,overflow:"auto"}}>
            <div style={{fontSize:"0.45rem",color:"#4ade8055",letterSpacing:"0.18em",marginBottom:"8px"}}>EVIDENCE TYPES</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
              {Object.entries(EVIDENCE_COLORS).map(([label,color])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:color,flexShrink:0}}/>
                  <span style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.06em"}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — guess history */}
        <div style={{display:"flex",flexDirection:"column",gap:"8px",minHeight:0,overflow:"auto"}}>
          <div style={{fontSize:"0.45rem",color:"#4ade8055",letterSpacing:"0.18em",flexShrink:0}}>INVESTIGATION LOG</div>

          {guesses.length === 0 && (
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#4ade8022",fontSize:"0.65rem",letterSpacing:"0.12em",textAlign:"center",lineHeight:2}}>
              NO ENTRIES YET<br/>SELECT A GHOST TO BEGIN
            </div>
          )}

          {guesses.map((g,i)=>(
            <GuessRow key={i} guessedGhost={g} answerGhost={ANSWER}/>
          ))}
        </div>
      </div>

      {/* FIXED BOTTOM — ghost journal */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"8px 14px 12px",background:`linear-gradient(transparent,${BG} 30%)`}}>
        {state==="playing" ? (
          <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
            <GhostJournal onSelect={handleGuess} usedNames={usedNames}/>
            <button onClick={()=>setShowResult(true)} style={{padding:"10px 14px",borderRadius:"8px",border:`1px solid ${BORDER}`,background:PANEL,color:"#4ade8066",fontFamily:"'Courier New',monospace",fontSize:"0.55rem",letterSpacing:"0.08em",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
              📋 RESULT
            </button>
          </div>
        ) : (
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setShowResult(true)} style={{flex:1,padding:"10px",borderRadius:"8px",border:`1px solid #4ade8044`,background:"rgba(74,222,128,0.08)",color:"#4ade80",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.1em",cursor:"pointer"}}>
              👻 {state==="won"?"VIEW RESULT":"SEE ANSWER"}
            </button>
            <a href="/" style={{flex:1,padding:"10px",borderRadius:"8px",border:`1px solid ${BORDER}`,background:PANEL,color:"#4ade8066",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.1em",cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
              🏠 HOME
            </a>
          </div>
        )}
      </div>
    </div>
  );
}