"use client";

"use client";
import { useState, useEffect } from "react";

const PUZZLES = [
  {
    id: 1,
    answers: ["STEWIE GRIFFIN", "STEWIE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Megalomaniacal, highly intelligent, secretly sinister" },
      { label: "KNOWN FOR",    value: "British accent, football-shaped head, world domination plots" },
      { label: "RELATIONSHIP", value: "Youngest child of Peter and Lois Griffin" },
    ],
    visualHint: "White onesie, red overalls, football-shaped head",
    image: "/images/hub/stewie.png",
  },
  {
    id: 2,
    answers: ["PETER GRIFFIN", "PETER"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character — the dad" },
      { label: "PERSONALITY",  value: "Idiotic, loveable, impulsive, chronically unemployed" },
      { label: "KNOWN FOR",    value: "Constant feuds with the giant chicken, saying 'Ssss... ahhh'" },
      { label: "RELATIONSHIP", value: "Husband of Lois, father of Meg, Chris and Stewie" },
    ],
    visualHint: "Fat, white t-shirt, green trousers, glasses",
    image: "/images/hub/peter.png",
  },
  {
  id: 3,
  answers: ["BRIAN GRIFFIN", "BRIAN"],
  clues: [
    { label: "SHOW",         value: "Family Guy" },
    { label: "ROLE",         value: "Main character — the family dog" },
    { label: "PERSONALITY",  value: "Pretentious, intellectual, aspiring writer, alcoholic" },
    { label: "KNOWN FOR",    value: "Unfinished novel, martini in hand, thinks he's smarter than everyone" },
    { label: "RELATIONSHIP", value: "Best friends with Stewie, lives with the Griffin family" },
  ],
  visualHint: "White dog, walks on two legs, usually holding a drink",
  image: "/images/hub/Brian_Griffin.png",
},
{
  id: 4,
  answers: ["QUAGMIRE", "GLENN QUAGMIRE"],
  clues: [
    { label: "SHOW",         value: "Family Guy" },
    { label: "ROLE",         value: "Supporting character — Peter's neighbour" },
    { label: "PERSONALITY",  value: "Hypersexual, cheerful, occasionally surprisingly deep" },
    { label: "KNOWN FOR",    value: "'Giggity', airline pilot, extremely questionable behaviour" },
    { label: "RELATIONSHIP", value: "Neighbour and friend of Peter Griffin" },
  ],
  visualHint: "Square jaw, tiny eyes, white shirt, always grinning",
  image: null,
},
{
  id: 5,
  answers: ["MEG GRIFFIN", "MEG"],
  clues: [
    { label: "SHOW",         value: "Family Guy" },
    { label: "ROLE",         value: "Main character — the eldest daughter" },
    { label: "PERSONALITY",  value: "Insecure, desperate for approval, perpetually picked on" },
    { label: "KNOWN FOR",    value: "Being the family punching bag, nobody remembering her name" },
    { label: "RELATIONSHIP", value: "Eldest child of Peter and Lois Griffin" },
  ],
  visualHint: "Pink beanie hat, glasses, pink shirt",
  image: null,
},
{
  id: 6,
  answers: ["LOIS GRIFFIN", "LOIS"],
  clues: [
    { label: "SHOW",         value: "Family Guy" },
    { label: "ROLE",         value: "Main character — the mum" },
    { label: "PERSONALITY",  value: "Patient, sensible, but with a wild past she rarely mentions" },
    { label: "KNOWN FOR",    value: "Being the only sane adult in the house, piano lessons" },
    { label: "RELATIONSHIP", value: "Wife of Peter, mother of Meg, Chris and Stewie" },
  ],
  visualHint: "Red hair, green shirt, pearl necklace",
  image: null,
},
];

function getDailyPuzzle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return PUZZLES[day % PUZZLES.length];
}

const MAX = 6;
const BLUE = "#1565C0";
const YELLOW = "#FFD600";
const RED = "#E53935";
const GREEN = "#43A047";
const WHITE = "#FFFFFF";

function Timer() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date(), mid = new Date();
      mid.setHours(24,0,0,0);
      const d = mid - now;
      setT(`${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);
  return <span style={{fontFamily:"'Courier New',monospace",fontSize:"1rem",color:YELLOW,fontWeight:"bold"}}>{t}</span>;
}

// Retro TV frame around the character image
function TVFrame({ puzzle, guessCount, gameState }) {
  const isVisualUnlocked = guessCount >= 5 || gameState !== "playing";
  const blur = isVisualUnlocked ? 0 : 999;

  return (
    <div style={{
      position:"relative",
      width:"100%",
      maxWidth:"340px",
      margin:"0 auto",
      flexShrink:0,
    }}>
      {/* TV outer shell */}
      <div style={{
        background:"linear-gradient(145deg,#e8e0d0,#c8bfaa)",
        borderRadius:"28px",
        padding:"14px 14px 44px",
        boxShadow:"0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4), 0 0 0 3px #a89880",
        position:"relative",
      }}>
        {/* TV brand badge */}
        <div style={{
          position:"absolute",top:"8px",left:"50%",transform:"translateX(-50%)",
          fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"0.7rem",
          color:"#888",letterSpacing:"0.2em",
        }}>QUAHOG-VISION</div>

        {/* Screen bezel */}
        <div style={{
          background:"#111",
          borderRadius:"16px",
          padding:"6px",
          boxShadow:"inset 0 4px 16px rgba(0,0,0,0.8), 0 0 0 2px #555",
          marginTop:"16px",
        }}>
          {/* Screen content */}
          <div style={{
            borderRadius:"12px",
            overflow:"hidden",
            aspectRatio:"4/3",
            background: isVisualUnlocked
              ? `linear-gradient(135deg,${BLUE}33,#001525)`
              : "#0a0a1a",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            position:"relative",
          }}>
            {/* Scanline overlay for retro effect */}
            <div style={{
              position:"absolute",inset:0,zIndex:2,
              backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
              pointerEvents:"none",borderRadius:"12px",
            }}/>

            {puzzle.image && isVisualUnlocked ? (
              <img src={puzzle.image} alt="?" style={{width:"100%",height:"100%",objectFit:"cover",filter:`blur(${blur}px)`,transition:"filter 1s ease"}}/>
            ) : isVisualUnlocked ? (
              <div style={{textAlign:"center",zIndex:1,padding:"12px"}}>
                <div style={{fontSize:"3.5rem",marginBottom:"8px",filter:"drop-shadow(0 0 20px rgba(255,214,0,0.6))"}}>
                  {guessCount === 0 ? "?" : "👤"}
                </div>
                <div style={{
                  fontFamily:"'Courier New',monospace",fontSize:"0.55rem",
                  color:"rgba(255,255,255,0.3)",border:"1px dashed rgba(255,255,255,0.15)",
                  padding:"3px 8px",borderRadius:"4px",
                }}>ADD IMAGE</div>
              </div>
            ) : (
              // Static / locked screen
              <div style={{textAlign:"center",zIndex:1,padding:"16px"}}>
                <div style={{
                  fontFamily:"'Bebas Neue',Impact,sans-serif",
                  fontSize:"clamp(1.2rem,3vw,1.8rem)",
                  color:"rgba(255,255,255,0.15)",
                  letterSpacing:"0.1em",
                  lineHeight:1.2,
                  marginBottom:"8px",
                }}>
                  WHO IS IT?
                </div>
                {/* Static noise dots */}
                <div style={{
                  display:"grid",gridTemplateColumns:"repeat(8,1fr)",
                  gap:"3px",opacity:0.3,
                }}>
                  {Array.from({length:32}).map((_,i)=>(
                    <div key={i} style={{
                      width:"100%",aspectRatio:"1",
                      borderRadius:"50%",
                      background:`rgba(255,255,255,${i*0.037+0.1}*0.8)`,
                    }}/>
                  ))}
                </div>
                <div style={{
                  marginTop:"10px",
                  fontFamily:"'Courier New',monospace",
                  fontSize:"0.6rem",
                  color:"rgba(255,255,255,0.2)",
                  letterSpacing:"0.1em",
                }}>
                  {5-Math.min(guessCount,4)} GUESS{5-Math.min(guessCount,4)===1?"":"ES"} TO UNLOCK
                </div>
              </div>
            )}

            {/* Visual hint banner at bottom of screen */}
            {isVisualUnlocked && gameState === "playing" && (
              <div style={{
                position:"absolute",bottom:0,left:0,right:0,zIndex:3,
                background:"rgba(0,0,0,0.85)",
                padding:"6px 10px",
                fontFamily:"'Nunito',Arial,sans-serif",
                fontSize:"0.65rem",fontWeight:800,
                color:YELLOW,
                textAlign:"center",
                animation:"fadeIn 0.5s ease",
              }}>
                🎨 {puzzle.visualHint}
              </div>
            )}
          </div>
        </div>

        {/* TV controls row */}
        <div style={{
          position:"absolute",bottom:"10px",left:"50%",transform:"translateX(-50%)",
          display:"flex",alignItems:"center",gap:"10px",
        }}>
          {/* Channel knob */}
          <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"linear-gradient(135deg,#888,#555)",boxShadow:"0 2px 4px rgba(0,0,0,0.4)"}}/>
          {/* Speaker grille */}
          <div style={{display:"flex",gap:"2px"}}>
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} style={{width:"2px",height:"12px",background:"#888",borderRadius:"1px"}}/>
            ))}
          </div>
          {/* Power button */}
          <div style={{width:"14px",height:"14px",borderRadius:"50%",background:"#c0392b",boxShadow:"0 0 6px rgba(192,57,43,0.5)"}}/>
        </div>

        {/* TV legs */}
        <div style={{position:"absolute",bottom:"-14px",left:"20%",width:"12%",height:"14px",background:"linear-gradient(180deg,#c8bfaa,#a89880)",borderRadius:"0 0 4px 4px"}}/>
        <div style={{position:"absolute",bottom:"-14px",right:"20%",width:"12%",height:"14px",background:"linear-gradient(180deg,#c8bfaa,#a89880)",borderRadius:"0 0 4px 4px"}}/>
      </div>
    </div>
  );
}

export default function App() {
  const PUZZLE = getDailyPuzzle();
  const [revealed,  setRevealed]  = useState(1);
  const [guesses,   setGuesses]   = useState([]);
  const [input,     setInput]     = useState("");
  const [state,     setState]     = useState("playing");
  const [shaking,   setShaking]   = useState(false);
  const [newClue,   setNewClue]   = useState(null);
  const [showHelp,  setShowHelp]  = useState(false);

  const revealNext = (i) => {
    if (i >= PUZZLE.clues.length) return;
    setNewClue(i); setRevealed(i+1);
  };

  const guess = () => {
    const v = input.trim().toUpperCase();
    if (!v || state !== "playing") return;
    const ok = PUZZLE.answers.some(a => a.toUpperCase() === v);
    const next = [...guesses, {text:v, ok}];
    setGuesses(next); setInput("");
    if (ok) { setState("won"); setRevealed(PUZZLE.clues.length); }
    else {
      setShaking(true); setTimeout(()=>setShaking(false),500);
      if (next.length >= MAX) { setState("lost"); setRevealed(PUZZLE.clues.length); }
      else setTimeout(()=>revealNext(revealed), 500);
    }
  };

  const copy = () => navigator.clipboard.writeText(
    ["WEIRDORDLE — Griffindle 🍺",
     state==="won" ? `Got it in ${guesses.length}/${MAX}` : "Missed it",
     guesses.map(g=>g.ok?"🟩":"🟥").join(""),
     "weirdordle.com"].join("\n")
  );

  const isVisualUnlocked = guesses.length >= 5 || state !== "playing";

  return (
    <div style={{
      minHeight:"100vh", width:"100vw",
      background:"#FFF9F0",
      fontFamily:"'Nunito',Arial,sans-serif",
      display:"flex", flexDirection:"column",
      overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@700;800;900&display=swap');
        html{font-size:18px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
        @keyframes clueIn{from{opacity:0;transform:translateY(10px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}
        button:active{transform:scale(0.97);}
      `}</style>

      {/* ── TOP NAV ── */}
      <div style={{
        background:BLUE,
        padding:"10px 20px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 3px 0px #0d47a1",
        flexShrink:0,
        position:"relative", zIndex:10,
      }}>
        <a href="/" style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.3rem",letterSpacing:"0.06em",color:"rgba(255,255,255,0.6)",cursor:"pointer",textDecoration:"none"}}>← WEIRDORDLE</a>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"1.3rem",animation:"wiggle 2s ease infinite"}}>🍺</span>
          <span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",letterSpacing:"0.05em",color:WHITE}}>GRIFFINDLE</span>
          <span style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.6rem",fontWeight:900,color:BLUE,background:YELLOW,padding:"2px 8px",borderRadius:"10px",letterSpacing:"0.05em"}}>FAMILY GUY</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.6rem",fontWeight:"bold",letterSpacing:"0.12em",color:BLUE,background:YELLOW,padding:"3px 10px",borderRadius:"20px"}}>DAILY</div>
          <button onClick={()=>setShowHelp(true)} style={{width:"30px",height:"30px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:WHITE,fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        </div>
      </div>

      {/* ── ATTEMPT DOTS ── */}
      <div style={{
        background:"#EEF2FF",
        padding:"8px 20px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:"2px solid #dde3ff",
        flexShrink:0,
      }}>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {Array.from({length:MAX}).map((_,i)=>(
            <div key={i} style={{
              width:"22px",height:"22px",borderRadius:"50%",
              border:`2px solid ${i<guesses.length?(guesses[i].ok?GREEN:RED):i===guesses.length&&state==="playing"?BLUE:"#ccc"}`,
              background:i<guesses.length?(guesses[i].ok?GREEN:RED):i===guesses.length&&state==="playing"?`${BLUE}22`:"transparent",
              transition:"all 0.3s",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"0.6rem",
            }}>
              {i<guesses.length&&(guesses[i].ok?"✓":"✗")}
            </div>
          ))}
        </div>
        <span style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.65rem",fontWeight:800,color:"#888"}}>
          {state==="playing"?`${MAX-guesses.length} guesses left`:state==="won"?"🎉 You got it!":"💀 Game over"}
        </span>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex:1, display:"grid",
        gridTemplateColumns:"360px 1fr",
        gap:"20px",
        padding:"20px",
        minHeight:0, overflow:"hidden",
      }}>

        {/* LEFT — TV + stats */}
        <div style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center",minHeight:0}}>
          <TVFrame puzzle={PUZZLE} guessCount={guesses.length} gameState={state} />

          {/* Stats card */}
          <div style={{
            width:"100%",background:WHITE,borderRadius:"16px",
            padding:"14px 16px",
            border:"2px solid #EEF2FF",
            boxShadow:"0 2px 12px rgba(21,101,192,0.08)",
          }}>
            <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",marginBottom:"10px",textTransform:"uppercase"}}>Your Stats</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",textAlign:"center"}}>
              {[["1","PLAYED"],["100%","WIN %"],["1","STREAK"],["1","BEST"]].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:BLUE,lineHeight:1}}>{v}</div>
                  <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.5rem",fontWeight:800,color:"#aaa",letterSpacing:"0.08em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next puzzle timer */}
          <div style={{
            width:"100%",background:BLUE,borderRadius:"14px",
            padding:"10px 16px",textAlign:"center",
            boxShadow:"0 4px 0px #0d47a1",
          }}>
            <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.55rem",fontWeight:800,color:"rgba(255,255,255,0.5)",letterSpacing:"0.14em",marginBottom:"3px",textTransform:"uppercase"}}>Next Griffindle In</div>
            <Timer/>
          </div>
        </div>

        {/* RIGHT — clues + guesses */}
        <div style={{display:"flex",flexDirection:"column",gap:"12px",minHeight:0,overflow:"hidden"}}>

          {/* Clue cards */}
          <div style={{
            flex:1,background:WHITE,borderRadius:"16px",
            padding:"16px",border:"2px solid #EEF2FF",
            boxShadow:"0 2px 12px rgba(21,101,192,0.06)",
            display:"flex",flexDirection:"column",gap:"8px",
            overflow:"auto",minHeight:0,
          }}>
            <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",flexShrink:0,textTransform:"uppercase"}}>Character File</div>

            {PUZZLE.clues.map((clue,i)=>{
              const rev = i < revealed;
              return (
                <div key={i} style={{
                  display:"flex",gap:"10px",alignItems:"flex-start",
                  padding:"10px 12px",borderRadius:"12px",flexShrink:0,
                  background:rev?`${BLUE}0f`:"#f8f9ff",
                  border:`2px solid ${rev?BLUE+"33":"#EEF2FF"}`,
                  opacity:rev?1:0.4,
                  transition:"all 0.4s ease",
                  animation:i===newClue&&rev?"clueIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both":"none",
                }}>
                  <div style={{
                    width:"26px",height:"26px",borderRadius:"8px",
                    background:rev?BLUE:"#dde3ff",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0,fontFamily:"'Nunito',Arial,sans-serif",
                    fontSize:"0.7rem",fontWeight:900,
                    color:rev?WHITE:"#aab",
                    transition:"all 0.4s",
                    boxShadow:rev?"0 2px 8px rgba(21,101,192,0.3)":"none",
                  }}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"0.55rem",fontWeight:900,letterSpacing:"0.14em",color:rev?BLUE:"#bbb",marginBottom:"2px",textTransform:"uppercase"}}>{clue.label}</div>
                    <div style={{fontSize:"0.85rem",fontWeight:700,color:rev?"#222":"#ddd",lineHeight:1.35,wordBreak:"break-word"}}>{rev?clue.value:"Hidden"}</div>
                  </div>
                </div>
              );
            })}

            {/* Visual hint clue card */}
            <div style={{
              display:"flex",gap:"10px",alignItems:"flex-start",
              padding:"10px 12px",borderRadius:"12px",flexShrink:0,
              background:isVisualUnlocked?"#FFF9E6":"#f8f9ff",
              border:`2px solid ${isVisualUnlocked?YELLOW:"#EEF2FF"}`,
              opacity:isVisualUnlocked?1:0.4,
              transition:"all 0.5s ease",
              animation:guesses.length===5?"clueIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both":"none",
              boxShadow:isVisualUnlocked?"0 2px 12px rgba(255,214,0,0.2)":"none",
            }}>
              <div style={{width:"26px",height:"26px",borderRadius:"8px",background:isVisualUnlocked?YELLOW:"#dde3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.9rem",boxShadow:isVisualUnlocked?"0 2px 8px rgba(255,214,0,0.4)":"none"}}>🎨</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.55rem",fontWeight:900,letterSpacing:"0.14em",color:isVisualUnlocked?"#b8860b":"#bbb",marginBottom:"2px",textTransform:"uppercase"}}>Visual Hint</div>
                <div style={{fontSize:"0.85rem",fontWeight:700,color:isVisualUnlocked?"#222":"#ddd",lineHeight:1.35}}>{isVisualUnlocked?PUZZLE.visualHint:"Unlocks on 5th guess"}</div>
              </div>
            </div>

            {/* Locked indicator */}
            {state==="playing"&&revealed<PUZZLE.clues.length&&(
              <div style={{padding:"8px 12px",borderRadius:"10px",border:"2px dashed #dde3ff",textAlign:"center",flexShrink:0,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.65rem",fontWeight:800,color:"#bbb"}}>
                🔒 {PUZZLE.clues.length-revealed} clue{PUZZLE.clues.length-revealed===1?"":"s"} locked — keep guessing!
              </div>
            )}
          </div>

          {/* Guesses */}
          <div style={{
            background:WHITE,borderRadius:"16px",
            padding:"14px 16px",border:"2px solid #EEF2FF",
            boxShadow:"0 2px 12px rgba(21,101,192,0.06)",
            flexShrink:0,
          }}>
            <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",marginBottom:"8px",textTransform:"uppercase"}}>Guesses</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px",minHeight:"24px"}}>
              {guesses.length===0
                ? <span style={{fontSize:"0.75rem",fontWeight:700,color:"#ccc"}}>No guesses yet — who do you think it is?</span>
                : guesses.map((g,i)=>(
                  <div key={i} style={{
                    display:"flex",alignItems:"center",gap:"5px",
                    padding:"4px 12px",borderRadius:"20px",
                    background:g.ok?"#E8F5E9":"#FFEBEE",
                    border:`2px solid ${g.ok?"#A5D6A7":"#FFCDD2"}`,
                    animation:"fadeIn 0.3s ease",
                    boxShadow:g.ok?"0 2px 8px rgba(67,160,71,0.2)":"none",
                  }}>
                    <span style={{fontSize:"0.75rem"}}>{g.ok?"✅":"❌"}</span>
                    <span style={{fontSize:"0.75rem",fontWeight:800,color:g.ok?GREEN:RED,textTransform:"uppercase",letterSpacing:"0.04em"}}>{g.text}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM INPUT ── */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:50,
        padding:"10px 20px 14px",
        background:"linear-gradient(transparent,#FFF9F0 25%)",
      }}>
        {state==="playing" ? (
          <div style={{display:"flex",gap:"8px",animation:shaking?"shake 0.5s ease":"none",maxWidth:"100%"}}>
            <input
              value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&guess()}
              placeholder="Type the character's name..."
              style={{
                flex:1,padding:"12px 18px",borderRadius:"14px",
                border:`2px solid ${BLUE}`,background:WHITE,
                color:"#111",fontFamily:"'Nunito',Arial,sans-serif",
                fontSize:"0.9rem",fontWeight:700,
                boxShadow:"0 2px 12px rgba(21,101,192,0.12)",
              }}
            />
            <button onClick={guess} style={{
              padding:"12px 24px",borderRadius:"14px",border:"none",
              background:BLUE,color:WHITE,
              fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,
              letterSpacing:"0.06em",cursor:"pointer",
              boxShadow:"0 4px 0px #0d47a1",
              whiteSpace:"nowrap",
            }}>GUESS</button>
          </div>
        ) : (
          <div style={{
            background:state==="won"?"#E8F5E9":"#FFEBEE",
            border:`2px solid ${state==="won"?"#A5D6A7":"#FFCDD2"}`,
            borderRadius:"16px",padding:"12px 18px",
            display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",
            animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
            boxShadow:`0 4px 20px ${state==="won"?"rgba(67,160,71,0.2)":"rgba(229,57,53,0.15)"}`,
          }}>
            <div>
              <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"1rem",fontWeight:900,color:state==="won"?GREEN:RED}}>
                {state==="won"?`🎉 Got it in ${guesses.length}!`:"💀 Game over"} — {PUZZLE.answers[0]}
              </div>
              <div style={{fontSize:"0.7rem",fontWeight:700,color:"#888"}}>Family Guy · New character at midnight</div>
            </div>
            <button onClick={copy} style={{padding:"9px 18px",borderRadius:"12px",border:"none",background:state==="won"?GREEN:RED,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.7rem",fontWeight:900,cursor:"pointer",whiteSpace:"nowrap",boxShadow:`0 3px 0px ${state==="won"?"#2e7d32":"#b71c1c"}`}}>
              SHARE
            </button>
          </div>
        )}
      </div>

      {/* ── HOW TO PLAY MODAL ── */}
      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WHITE,border:`3px solid ${BLUE}`,borderRadius:"22px",padding:"28px",maxWidth:"400px",width:"100%",position:"relative",boxShadow:"0 20px 60px rgba(21,101,192,0.25)"}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"14px",right:"14px",background:"#f0f4ff",border:"none",color:"#aaa",width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem",fontWeight:"bold"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
              <span style={{fontSize:"1.8rem",animation:"wiggle 2s ease infinite"}}>🍺</span>
              <div>
                <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"1.4rem",fontWeight:900,color:BLUE}}>HOW TO PLAY</div>
                <div style={{fontSize:"0.65rem",fontWeight:800,color:"#aaa",letterSpacing:"0.1em"}}>GRIFFINDLE</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"13px",marginBottom:"20px"}}>
              {[
                ["📺","Look at the TV","The character image is hidden on the TV screen — it unlocks after your 5th guess."],
                ["🔍","Read the clues","Character file clues reveal after each wrong guess — no skipping ahead!"],
                ["💬","Make your guess","Type the character's name and hit GUESS. First name alone works too."],
                ["🎨","5th guess visual","Survive to guess 5 and the TV screen unlocks showing colour hints."],
                ["6","Six attempts","Six guesses total. Fewer = more bragging rights."],
                ["📋","Share it","Hit SHARE after the game. New character every day at midnight."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"10px",background:"#EEF2FF",border:`2px solid ${BLUE}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"1rem"}}>{icon}</div>
                  <div>
                    <div style={{fontSize:"0.75rem",fontWeight:900,color:BLUE,marginBottom:"2px"}}>{title}</div>
                    <div style={{fontSize:"0.72rem",fontWeight:600,color:"#666",lineHeight:1.4}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHelp(false)} style={{width:"100%",padding:"13px",borderRadius:"14px",border:"none",background:BLUE,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,letterSpacing:"0.06em",cursor:"pointer",boxShadow:"0 4px 0px #0d47a1"}}>
              GOT IT — LET'S PLAY!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}