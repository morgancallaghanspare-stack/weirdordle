"use client";
import { useState, useEffect, useCallback } from "react";

const PUZZLES = [
  {
    id: 1,
    answers: ["STEWIE GRIFFIN","STEWIE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Megalomaniacal, highly intelligent, secretly sinister" },
      { label: "KNOWN FOR",    value: "British accent, football-shaped head, world domination plots" },
      { label: "RELATIONSHIP", value: "Youngest child of Peter and Lois Griffin" },
    ],
    visualHint: "White onesie, red overalls, football-shaped head",
    image: null,
  },
  {
    id: 2,
    answers: ["PETER GRIFFIN","PETER"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Idiotic, loveable, impulsive, chronically unemployed" },
      { label: "KNOWN FOR",    value: "Constant feuds with the giant chicken, saying 'Ssss... ahhh'" },
      { label: "RELATIONSHIP", value: "Husband of Lois, father of Meg, Chris and Stewie" },
    ],
    visualHint: "Fat, white t-shirt, green trousers, glasses",
    image: null,
  },
  {
    id: 3,
    answers: ["BRIAN GRIFFIN","BRIAN"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Pretentious, intellectual, aspiring writer, alcoholic" },
      { label: "KNOWN FOR",    value: "Unfinished novel, martini in hand, thinks he's smarter than everyone" },
      { label: "RELATIONSHIP", value: "Best friends with Stewie, lives with the Griffin family" },
    ],
    visualHint: "White dog, walks on two legs, usually holding a drink",
    image: null,
  },
  {
    id: 4,
    answers: ["QUAGMIRE","GLENN QUAGMIRE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Supporting character" },
      { label: "PERSONALITY",  value: "Hypersexual, cheerful, occasionally surprisingly deep" },
      { label: "KNOWN FOR",    value: "'Giggity', airline pilot, extremely questionable behaviour" },
      { label: "RELATIONSHIP", value: "Neighbour and friend of Peter Griffin" },
    ],
    visualHint: "Square jaw, tiny eyes, tropical shirt, always grinning",
    image: null,
  },
  {
    id: 5,
    answers: ["MEG GRIFFIN","MEG"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Insecure, desperate for approval, perpetually picked on" },
      { label: "KNOWN FOR",    value: "Being the family punching bag, nobody remembering her name" },
      { label: "RELATIONSHIP", value: "Eldest child of Peter and Lois Griffin" },
    ],
    visualHint: "Pink beanie hat, glasses, pink shirt",
    image: null,
  },
  {
    id: 6,
    answers: ["LOIS GRIFFIN","LOIS"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Patient, sensible, but with a wild past she rarely mentions" },
      { label: "KNOWN FOR",    value: "Being the only sane adult in the house, piano lessons" },
      { label: "RELATIONSHIP", value: "Wife of Peter, mother of Meg, Chris and Stewie" },
    ],
    visualHint: "Red hair, green shirt, pearl necklace",
    image: null,
  },
  {
    id: 7,
    answers: ["CHRIS GRIFFIN","CHRIS"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Main character" },
      { label: "PERSONALITY",  value: "Idiotic, Stupid, impulsive, chronically into female attention" },
      { label: "KNOWN FOR",    value: "Has a special relationship with Herbert'" },
      { label: "RELATIONSHIP", value: "Main family member" },
    ],
    visualHint: "Fat, blue t-shirt, black trousers, hat",
    image: null,
  },
  {
    id: 8,
    answers: ["JOE SWANSON","JOE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Side Character" },
      { label: "PERSONALITY",  value: "macho, father, very employed" },
      { label: "KNOWN FOR",    value: "Demonstrating Justice" },
      { label: "RELATIONSHIP", value: "Best pal of Peter" },
    ],
    visualHint: "Average, Gray t-shirt, Blue trousers, Gets around",
    image: null,
  },
  {
    id: 9,
    answers: ["BONNIE SWANSON","BONNIE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Not a main character" },
      { label: "PERSONALITY",  value: "repressed, disloyal, mother" },
      { label: "KNOWN FOR",    value: "her husband" },
      { label: "RELATIONSHIP", value: "Close friend of Lois Griffin" },
    ],
    visualHint: "Purple Dress, Purple Shoes, Black Hair",
    image: null,
  },
  {
    id: 10,
    answers: ["CLEVELAND BROWN","CLEVELAND"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Not a main character" },
      { label: "PERSONALITY",  value: "Idiotic, bathtub victim " },
      { label: "KNOWN FOR",    value: "His own show" },
      { label: "RELATIONSHIP", value: "Part of Peters gang" },
    ],
    visualHint: "Moustache, Yellow Tee",
    image: null,
  },
  {
    id: 11,
    answers: ["HERBERT THE PERVERT","HERBERT"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Side Character" },
      { label: "PERSONALITY",  value: "Weird, Old" },
      { label: "KNOWN FOR",    value: "Love for children & Chris" },
      { label: "RELATIONSHIP", value: "The town pedophile" },
    ],
    visualHint: "Balding, Long nose, Blue robe, Walking Frame",
    image: null,
  },
  {
    id: 12,
    answers: ["SUSIE SWANSON","SUSIE"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Side Character" },
      { label: "PERSONALITY",  value: "Highly intelligent, Manly" },
      { label: "KNOWN FOR",    value: "Demonstrating Justice" },
      { label: "RELATIONSHIP", value: "Best pal of Peter" },
    ],
    visualHint: "Young, Pink Bow Tie, Green tank top",
    image: null,
  },
  {
    id: 13,
    answers: ["ADAM WEST","MAYOR WEST"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Not a main character" },
      { label: "PERSONALITY",  value: "Odd" },
      { label: "KNOWN FOR",    value: "Being a great leader" },
      { label: "RELATIONSHIP", value: "Related to the whole of Quahog" },
    ],
    visualHint: "Gray suit, Gray hair",
    image: null,
  },
  {
    id: 14,
    answers: ["CARTER","CARTER PEWTERSCHMIDT"],
    clues: [
      { label: "SHOW",         value: "Family Guy" },
      { label: "ROLE",         value: "Not a main character" },
      { label: "PERSONALITY",  value: "Rich, Obnoxious " },
      { label: "KNOWN FOR",    value: "His money" },
      { label: "RELATIONSHIP", value: "Father of a main character" },
    ],
    visualHint: "Suited, Gray hair, Moustache",
    image: null,
  
  }

];

function getRandomPuzzle(excludeId) {
  const pool = PUZZLES.filter(p => p.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

const MAX = 6;
const BLUE = "#1565C0";
const YELLOW = "#FFD600";
const RED = "#E53935";
const GREEN = "#43A047";
const WHITE = "#FFFFFF";

// Reuse the same TV frame from daily
function TVFrame({ puzzle, guessCount, gameState }) {
  const isVisualUnlocked = guessCount >= 5 || gameState !== "playing";
  return (
    <div style={{position:"relative",width:"100%",maxWidth:"340px",margin:"0 auto",flexShrink:0}}>
      <div style={{background:"linear-gradient(145deg,#e8e0d0,#c8bfaa)",borderRadius:"28px",padding:"14px 14px 44px",boxShadow:"0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4), 0 0 0 3px #a89880",position:"relative"}}>
        <div style={{position:"absolute",top:"8px",left:"50%",transform:"translateX(-50%)",fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"0.7rem",color:"#888",letterSpacing:"0.2em"}}>QUAHOG-VISION</div>
        <div style={{background:"#111",borderRadius:"16px",padding:"6px",boxShadow:"inset 0 4px 16px rgba(0,0,0,0.8), 0 0 0 2px #555",marginTop:"16px"}}>
          <div style={{borderRadius:"12px",overflow:"hidden",aspectRatio:"4/3",maxHeight:"200px",background:isVisualUnlocked?`linear-gradient(135deg,${BLUE}33,#001525)`:"#0a0a1a",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <div style={{position:"absolute",inset:0,zIndex:2,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",pointerEvents:"none",borderRadius:"12px"}}/>
            {puzzle.image && isVisualUnlocked ? (
              <img src={puzzle.image} alt="?" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
            ) : isVisualUnlocked ? (
              <div style={{textAlign:"center",zIndex:1,padding:"12px"}}>
                <div style={{fontSize:"3.5rem",marginBottom:"8px"}}>👤</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.55rem",color:"rgba(255,255,255,0.3)",border:"1px dashed rgba(255,255,255,0.15)",padding:"3px 8px",borderRadius:"4px"}}>ADD IMAGE</div>
              </div>
            ) : (
              <div style={{textAlign:"center",zIndex:1,padding:"16px"}}>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:"rgba(255,255,255,0.15)",letterSpacing:"0.1em",lineHeight:1.2,marginBottom:"8px"}}>WHO IS IT?</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:"3px",opacity:0.3}}>
                  {Array.from({length:32}).map((_,i)=>(
                    <div key={i} style={{width:"100%",aspectRatio:"1",borderRadius:"50%",background:`rgba(255,255,255,${(i*0.037+0.1)%0.8})`}}/>
                  ))}
                </div>
                <div style={{marginTop:"10px",fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:"rgba(255,255,255,0.2)",letterSpacing:"0.1em"}}>
                  {5-Math.min(guessCount,4)} GUESS{5-Math.min(guessCount,4)===1?"":"ES"} TO UNLOCK
                </div>
              </div>
            )}
            {isVisualUnlocked && gameState==="playing" && (
              <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3,background:"rgba(0,0,0,0.85)",padding:"6px 10px",fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.65rem",fontWeight:800,color:YELLOW,textAlign:"center"}}>
                🎨 {puzzle.visualHint}
              </div>
            )}
          </div>
        </div>
        <div style={{position:"absolute",bottom:"10px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"linear-gradient(135deg,#888,#555)",boxShadow:"0 2px 4px rgba(0,0,0,0.4)"}}/>
          <div style={{display:"flex",gap:"2px"}}>
            {Array.from({length:6}).map((_,i)=>(<div key={i} style={{width:"2px",height:"12px",background:"#888",borderRadius:"1px"}}/>))}
          </div>
          <div style={{width:"14px",height:"14px",borderRadius:"50%",background:"#c0392b",boxShadow:"0 0 6px rgba(192,57,43,0.5)"}}/>
        </div>
        <div style={{position:"absolute",bottom:"-14px",left:"20%",width:"12%",height:"14px",background:"linear-gradient(180deg,#c8bfaa,#a89880)",borderRadius:"0 0 4px 4px"}}/>
        <div style={{position:"absolute",bottom:"-14px",right:"20%",width:"12%",height:"14px",background:"linear-gradient(180deg,#c8bfaa,#a89880)",borderRadius:"0 0 4px 4px"}}/>
      </div>
    </div>
  );
}

export default function App() {
  const [puzzle,    setPuzzle]    = useState(() => PUZZLES[Math.floor(Math.random() * PUZZLES.length)]);
  const [revealed,  setRevealed]  = useState(1);
  const [guesses,   setGuesses]   = useState([]);
  const [input,     setInput]     = useState("");
  const [state,     setState]     = useState("playing");
  const [shaking,   setShaking]   = useState(false);
  const [newClue,   setNewClue]   = useState(null);
  const [showHelp,  setShowHelp]  = useState(false);
  const [showResult,setShowResult]= useState(false);
  const [streak,    setStreak]    = useState(0);
  const [gamesPlayed,setGamesPlayed] = useState(0);
  const [wins,      setWins]      = useState(0);

  const isVisualUnlocked = guesses.length >= 5 || state !== "playing";

  const revealNext = (i) => {
    if (i >= puzzle.clues.length) return;
    setNewClue(i); setRevealed(i+1);
  };

  const guess = () => {
    const v = input.trim().toUpperCase();
    if (!v || state !== "playing") return;
    const ok = puzzle.answers.some(a => a.toUpperCase() === v);
    const next = [...guesses, {text:v, ok}];
    setGuesses(next); setInput("");
    if (ok) {
      setState("won"); setRevealed(puzzle.clues.length);
      setStreak(s=>s+1); setWins(w=>w+1); setGamesPlayed(g=>g+1);
      setTimeout(()=>setShowResult(true),600);
    } else {
      setShaking(true); setTimeout(()=>setShaking(false),500);
      if (next.length >= MAX) {
        setState("lost"); setRevealed(puzzle.clues.length);
        setStreak(0); setGamesPlayed(g=>g+1);
        setTimeout(()=>setShowResult(true),600);
      } else {
        setTimeout(()=>revealNext(revealed),500);
      }
    }
  };

  const playAgain = useCallback(() => {
    const next = getRandomPuzzle(puzzle.id);
    setPuzzle(next);
    setRevealed(1); setGuesses([]); setInput("");
    setState("playing"); setNewClue(null); setShowResult(false);
  }, [puzzle.id]);

  const copy = () => navigator.clipboard.writeText(
    ["WEIRDORDLE — Griffindle ∞ 🍺",
     state==="won"?`Got it in ${guesses.length}/${MAX}`:"Missed it",
     guesses.map(g=>g.ok?"🟩":"🟥").join(""),
     `Free Play Streak: ${streak}`,
     "weirdordle.com"].join("\n")
  );

  const winPct = gamesPlayed > 0 ? Math.round((wins/gamesPlayed)*100) : 0;

  return (
    <div style={{minHeight:"100vh",width:"100vw",background:"#FFF9F0",fontFamily:"'Nunito',Arial,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>
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
      `}</style>

      {/* Result modal */}
      {showResult && (
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.3s ease"}}>
          <div style={{background:WHITE,borderRadius:"22px",padding:"28px",maxWidth:"380px",width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",border:`3px solid ${state==="won"?"#A5D6A7":"#FFCDD2"}`}}>
            <div style={{textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"8px"}}>{state==="won"?"🎉":"💀"}</div>
              <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"1.3rem",fontWeight:900,color:state==="won"?GREEN:RED,marginBottom:"4px"}}>
                {state==="won"?`Got it in ${guesses.length}/${MAX}!`:"Game Over!"}
              </div>
              <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:700,color:"#888",marginBottom:"12px"}}>
                The answer was <strong style={{color:"#333"}}>{puzzle.answers[0]}</strong>
              </div>
              {/* Guess squares */}
              <div style={{display:"flex",gap:"6px",justifyContent:"center",marginBottom:"12px"}}>
                {guesses.map((g,i)=>(
                  <div key={i} style={{width:"28px",height:"28px",borderRadius:"6px",background:g.ok?GREEN:RED,display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontSize:"0.8rem"}}>
                    {g.ok?"✓":"✗"}
                  </div>
                ))}
              </div>
              {/* Streak */}
              {streak > 0 && (
                <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#FFF9E6",border:"2px solid #FFD600",borderRadius:"20px",padding:"4px 14px",marginBottom:"4px"}}>
                  <span style={{fontSize:"1rem"}}>🔥</span>
                  <span style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.75rem",fontWeight:900,color:"#b8860b"}}>Streak: {streak}</span>
                </div>
              )}
            </div>

            {/* Session stats */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"20px"}}>
              {[[gamesPlayed,"Games Played"],[`${winPct}%`,"Win Rate"]].map(([v,l])=>(
                <div key={l} style={{background:"#f0f4ff",borderRadius:"12px",padding:"10px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:BLUE,lineHeight:1}}>{v}</div>
                  <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.55rem",fontWeight:800,color:"#aaa",letterSpacing:"0.08em"}}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              <button onClick={playAgain} style={{width:"100%",padding:"13px",borderRadius:"14px",border:"none",background:BLUE,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,letterSpacing:"0.06em",cursor:"pointer",boxShadow:"0 4px 0px #0d47a1"}}>
                🔄 PLAY AGAIN
              </button>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={copy} style={{flex:1,padding:"10px",borderRadius:"12px",border:`2px solid ${BLUE}22`,background:"#f0f4ff",color:BLUE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.7rem",fontWeight:800,cursor:"pointer"}}>
                  📋 SHARE
                </button>
                <a href="/" style={{flex:1,padding:"10px",borderRadius:"12px",border:`2px solid ${BLUE}22`,background:"#f0f4ff",color:BLUE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.7rem",fontWeight:800,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  🏠 HOME
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOW TO PLAY */}
      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:WHITE,border:`3px solid ${BLUE}`,borderRadius:"22px",padding:"28px",maxWidth:"400px",width:"100%",position:"relative",boxShadow:"0 20px 60px rgba(21,101,192,0.25)"}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"14px",right:"14px",background:"#f0f4ff",border:"none",color:"#aaa",width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem",fontWeight:"bold"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
              <span style={{fontSize:"1.8rem"}}>🍺</span>
              <div>
                <div style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"1.3rem",fontWeight:900,color:BLUE}}>FREE PLAY</div>
                <div style={{fontSize:"0.65rem",fontWeight:800,color:"#aaa",letterSpacing:"0.1em"}}>GRIFFINDLE · UNLIMITED</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"13px",marginBottom:"20px"}}>
              {[
                ["∞","Unlimited puzzles","Random Family Guy character every time — play as many as you want."],
                ["📺","TV screen","The character image unlocks on the TV after your 5th guess."],
                ["🔒","Locked clues","Wrong guesses unlock the next clue automatically."],
                ["🔥","Streak","Win consecutive games to build your free play streak."],
                ["🔄","Play again","New random character instantly after each game."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"10px",background:"#EEF2FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"1rem"}}>{icon}</div>
                  <div>
                    <div style={{fontSize:"0.75rem",fontWeight:900,color:BLUE,marginBottom:"2px"}}>{title}</div>
                    <div style={{fontSize:"0.72rem",fontWeight:600,color:"#666",lineHeight:1.4}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHelp(false)} style={{width:"100%",padding:"13px",borderRadius:"14px",border:"none",background:BLUE,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,cursor:"pointer",boxShadow:"0 4px 0px #0d47a1"}}>
              GOT IT — LET'S PLAY!
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{background:BLUE,padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 3px 0px #0d47a1",flexShrink:0,position:"relative",zIndex:10}}>
        <a href="/" style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.3rem",letterSpacing:"0.06em",color:"rgba(255,255,255,0.6)",cursor:"pointer",textDecoration:"none"}}>← WEIRDORDLE</a>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"1.3rem",animation:"wiggle 2s ease infinite"}}>🍺</span>
          <span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",letterSpacing:"0.05em",color:WHITE}}>GRIFFINDLE</span>
          <span style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.6rem",fontWeight:900,color:"#000",background:YELLOW,padding:"2px 8px",borderRadius:"10px"}}>FREE PLAY</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <a href="/griffindle" style={{fontFamily:"'Courier New',monospace",fontSize:"0.6rem",fontWeight:"bold",color:YELLOW,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",padding:"3px 10px",borderRadius:"20px",textDecoration:"none"}}>📅 DAILY</a>
          <button onClick={()=>setShowHelp(true)} style={{width:"30px",height:"30px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:WHITE,fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        </div>
      </div>

      {/* ATTEMPT DOTS */}
      <div style={{background:"#EEF2FF",padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"2px solid #dde3ff",flexShrink:0}}>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {Array.from({length:MAX}).map((_,i)=>(
            <div key={i} style={{width:"22px",height:"22px",borderRadius:"50%",border:`2px solid ${i<guesses.length?(guesses[i].ok?GREEN:RED):i===guesses.length&&state==="playing"?BLUE:"#ccc"}`,background:i<guesses.length?(guesses[i].ok?GREEN:RED):i===guesses.length&&state==="playing"?`${BLUE}22`:"transparent",transition:"all 0.3s",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem"}}>
              {i<guesses.length&&(guesses[i].ok?"✓":"✗")}
            </div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {streak > 0 && <span style={{fontSize:"0.7rem",fontWeight:800,color:"#b8860b",background:"#FFF9E6",border:"2px solid #FFD600",borderRadius:"20px",padding:"2px 10px"}}>🔥 {streak}</span>}
          <span style={{fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.65rem",fontWeight:800,color:"#888"}}>
            {state==="playing"?`${MAX-guesses.length} left`:state==="won"?"🎉 Got it!":"💀 Game over"}
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"grid",gridTemplateColumns:"360px 1fr",gap:"20px",padding:"20px",minHeight:0,overflow:"hidden"}}>

        {/* LEFT — TV + stats */}
        <div style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center",minHeight:0}}>
          <TVFrame puzzle={puzzle} guessCount={guesses.length} gameState={state}/>

          <div style={{width:"100%",background:WHITE,borderRadius:"16px",padding:"14px 16px",border:"2px solid #EEF2FF",boxShadow:"0 2px 12px rgba(21,101,192,0.08)"}}>
            <div style={{fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",marginBottom:"10px",textTransform:"uppercase"}}>Session Stats</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px",textAlign:"center"}}>
              {[[gamesPlayed,"PLAYED"],[`${winPct}%`,"WIN %"],[streak,"STREAK 🔥"]].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:BLUE,lineHeight:1}}>{v}</div>
                  <div style={{fontSize:"0.5rem",fontWeight:800,color:"#aaa",letterSpacing:"0.08em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — clues + guesses */}
        <div style={{display:"flex",flexDirection:"column",gap:"12px",minHeight:0,overflow:"hidden"}}>
          <div style={{flex:1,background:WHITE,borderRadius:"16px",padding:"16px",border:"2px solid #EEF2FF",boxShadow:"0 2px 12px rgba(21,101,192,0.06)",display:"flex",flexDirection:"column",gap:"8px",overflow:"auto",minHeight:0}}>
            <div style={{fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",flexShrink:0,textTransform:"uppercase"}}>Character File</div>
            {puzzle.clues.map((clue,i)=>{
              const rev = i < revealed;
              return (
                <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start",padding:"10px 12px",borderRadius:"12px",flexShrink:0,background:rev?`${BLUE}0f`:"#f8f9ff",border:`2px solid ${rev?BLUE+"33":"#EEF2FF"}`,opacity:rev?1:0.4,transition:"all 0.4s ease",animation:i===newClue&&rev?"clueIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both":"none"}}>
                  <div style={{width:"26px",height:"26px",borderRadius:"8px",background:rev?BLUE:"#dde3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.7rem",fontWeight:900,color:rev?WHITE:"#aab",transition:"all 0.4s",boxShadow:rev?"0 2px 8px rgba(21,101,192,0.3)":"none"}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"0.55rem",fontWeight:900,letterSpacing:"0.14em",color:rev?BLUE:"#bbb",marginBottom:"2px",textTransform:"uppercase"}}>{clue.label}</div>
                    <div style={{fontSize:"0.85rem",fontWeight:700,color:rev?"#222":"#ddd",lineHeight:1.35,wordBreak:"break-word"}}>{rev?clue.value:"Hidden"}</div>
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",gap:"10px",alignItems:"flex-start",padding:"10px 12px",borderRadius:"12px",flexShrink:0,background:isVisualUnlocked?"#FFF9E6":"#f8f9ff",border:`2px solid ${isVisualUnlocked?YELLOW:"#EEF2FF"}`,opacity:isVisualUnlocked?1:0.4,transition:"all 0.5s ease"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"8px",background:isVisualUnlocked?YELLOW:"#dde3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.9rem"}}>🎨</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.55rem",fontWeight:900,letterSpacing:"0.14em",color:isVisualUnlocked?"#b8860b":"#bbb",marginBottom:"2px",textTransform:"uppercase"}}>Visual Hint</div>
                <div style={{fontSize:"0.85rem",fontWeight:700,color:isVisualUnlocked?"#222":"#ddd",lineHeight:1.35}}>{isVisualUnlocked?puzzle.visualHint:"Unlocks on 5th guess"}</div>
              </div>
            </div>
            {state==="playing"&&revealed<puzzle.clues.length&&(
              <div style={{padding:"8px 12px",borderRadius:"10px",border:"2px dashed #dde3ff",textAlign:"center",flexShrink:0,fontSize:"0.65rem",fontWeight:800,color:"#bbb"}}>
                🔒 {puzzle.clues.length-revealed} clue{puzzle.clues.length-revealed===1?"":"s"} locked — keep guessing!
              </div>
            )}
          </div>

          <div style={{background:WHITE,borderRadius:"16px",padding:"14px 16px",border:"2px solid #EEF2FF",flexShrink:0}}>
            <div style={{fontSize:"0.6rem",fontWeight:900,letterSpacing:"0.14em",color:"#aaa",marginBottom:"8px",textTransform:"uppercase"}}>Guesses</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px",minHeight:"24px"}}>
              {guesses.length===0
                ? <span style={{fontSize:"0.75rem",fontWeight:700,color:"#ccc"}}>No guesses yet — who do you think it is?</span>
                : guesses.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",padding:"4px 12px",borderRadius:"20px",background:g.ok?"#E8F5E9":"#FFEBEE",border:`2px solid ${g.ok?"#A5D6A7":"#FFCDD2"}`,animation:"fadeIn 0.3s ease"}}>
                    <span style={{fontSize:"0.75rem"}}>{g.ok?"✅":"❌"}</span>
                    <span style={{fontSize:"0.75rem",fontWeight:800,color:g.ok?GREEN:RED,textTransform:"uppercase"}}>{g.text}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* FIXED INPUT */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"10px 20px 14px",background:"linear-gradient(transparent,#FFF9F0 25%)"}}>
        {state==="playing" ? (
          <div style={{display:"flex",gap:"8px",animation:shaking?"shake 0.5s ease":"none"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&guess()}
              placeholder="Type the character's name..."
              style={{flex:1,padding:"12px 18px",borderRadius:"14px",border:`2px solid ${BLUE}`,background:WHITE,color:"#111",fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.9rem",fontWeight:700,boxShadow:"0 2px 12px rgba(21,101,192,0.12)"}}/>
            <button onClick={guess} style={{padding:"12px 24px",borderRadius:"14px",border:"none",background:BLUE,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,letterSpacing:"0.06em",cursor:"pointer",boxShadow:"0 4px 0px #0d47a1",whiteSpace:"nowrap"}}>GUESS</button>
          </div>
        ) : (
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setShowResult(true)} style={{flex:2,padding:"12px",borderRadius:"14px",border:"none",background:BLUE,color:WHITE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,cursor:"pointer",boxShadow:"0 4px 0px #0d47a1"}}>
              📊 VIEW RESULT
            </button>
            <button onClick={playAgain} style={{flex:1,padding:"12px",borderRadius:"14px",border:`2px solid ${BLUE}`,background:"transparent",color:BLUE,fontFamily:"'Nunito',Arial,sans-serif",fontSize:"0.8rem",fontWeight:900,cursor:"pointer"}}>
              🔄 AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}