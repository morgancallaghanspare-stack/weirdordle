"use client";


import { supabase } from "../../../lib/supabase";
import { recordGameResult } from "../../../lib/auth";



import { useState, useEffect, useCallback } from "react";

const PUZZLES = [
  {
    id: 1,
    answers: ["ALLIGATOR WRESTLING","WRESTLED AN ALLIGATOR","WRESTLING AN ALLIGATOR","WRESTLE ALLIGATOR","GATOR WRESTLING"],
    clues: [
      { label: "YEAR",     value: "2019" },
      { label: "COUNTY",   value: "Collier County, FL" },
      { label: "CHARGES",  value: "Misdemeanor — unlicensed alligator handling" },
      { label: "WITNESS",  value: '"He just... climbed on it. Nobody asked him to."' },
      { label: "OUTCOME",  value: "Released with a warning. The gator was unharmed." },
    ],
    headline: "Florida Man Arrested After Wrestling 9-Foot Alligator in a Walmart Parking Lot",
    subline: "Witnesses described the scene as 'completely unprovoked'",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 2,
    answers: ["CHEESE THEFT","STEALING CHEESE","ATE CHEESE","EATING CHEESE","STOLE CHEESE"],
    clues: [
      { label: "YEAR",    value: "2021" },
      { label: "COUNTY",  value: "Broward County, FL" },
      { label: "CHARGES", value: "Petty theft — $47 worth of cheese" },
      { label: "WITNESS", value: '"He just kept eating it in the aisle. Didn\'t even stop when we approached."' },
      { label: "OUTCOME", value: "Banned from all Publix locations in the state." },
    ],
    headline: "Florida Man Arrested for Eating $47 Worth of Cheese in Supermarket, Refusing to Pay",
    subline: "Staff said he 'showed no remorse whatsoever'",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 3,
    answers: ["SWORD FIGHT WITH ROOMMATE","SWORD FIGHT","SWORDFIGHT","MEDIEVAL SWORD FIGHT","FOUGHT ROOMMATE WITH SWORD"],
    clues: [
      { label: "YEAR",    value: "2020" },
      { label: "COUNTY",  value: "Hillsborough County, FL" },
      { label: "CHARGES", value: "Aggravated assault with a deadly weapon" },
      { label: "WITNESS", value: '"They were arguing about the last Hot Pocket."' },
      { label: "OUTCOME", value: "Both men required stitches. Neither pressed charges." },
    ],
    headline: "Florida Man Challenges Roommate to Sword Fight Over Last Hot Pocket, Both Hospitalised",
    subline: "Deputies arrived to find two men in medieval cosplay gear",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 4,
    answers: ["LAWNMOWER DUI","DRUNK DRIVING LAWNMOWER","DUI ON LAWNMOWER","RIDING LAWNMOWER DRUNK"],
    clues: [
      { label: "YEAR",    value: "2018" },
      { label: "COUNTY",  value: "Polk County, FL" },
      { label: "CHARGES", value: "DUI — blood alcohol 3x the legal limit" },
      { label: "WITNESS", value: '"He was very relaxed about the whole thing."' },
      { label: "OUTCOME", value: "Lawnmower impounded. License suspended 6 months." },
    ],
    headline: "Florida Man Arrested for Driving Lawnmower Drunk Down Highway at 4am",
    subline: "Officers said he 'didn't see what the big deal was'",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 5,
    answers: ["WAFFLE HOUSE FIGHT","FIGHTING AT WAFFLE HOUSE","WAFFLE HOUSE BRAWL","ATTACKED WAFFLE HOUSE"],
    clues: [
      { label: "YEAR",    value: "2022" },
      { label: "COUNTY",  value: "Orange County, FL" },
      { label: "CHARGES", value: "Aggravated battery with a breakfast item" },
      { label: "WITNESS", value: '"He threw the syrup first. That escalated things."' },
      { label: "OUTCOME", value: "Banned for life from all Waffle House locations." },
    ],
    headline: "Florida Man Starts Brawl at Waffle House After Dispute Over Syrup, Hits Staff with Waffle",
    subline: "Surveillance footage described as 'hard to watch but impossible to look away from'",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 6,
    answers: ["FED MCDONALDS TO ALLIGATOR","FEEDING ALLIGATOR MCDONALDS","FED ALLIGATOR","ALLIGATOR MCDONALDS"],
    clues: [
      { label: "YEAR",    value: "2020" },
      { label: "COUNTY",  value: "Brevard County, FL" },
      { label: "CHARGES", value: "Illegal feeding of wildlife — Class C misdemeanor" },
      { label: "WITNESS", value: '"The gator seemed to enjoy the nuggets actually."' },
      { label: "OUTCOME", value: "Fined $500. The alligator was relocated." },
    ],
    headline: "Florida Man Caught Feeding McDonald's Chicken Nuggets to Alligator Outside Drive-Thru",
    subline: "Fish and Wildlife officers said it was 'a first' in their combined 40 years of service",
    sceneImage: null, mugshot: null, hintImage: null,
  },
  {
    id: 7,
    answers: ["THREW PIZZA AT GIRLFRIEND","PIZZA ATTACK","ASSAULTED WITH PIZZA","HIT GIRLFRIEND WITH PIZZA"],
    clues: [
      { label: "YEAR",    value: "2021" },
      { label: "COUNTY",  value: "Pinellas County, FL" },
      { label: "CHARGES", value: "Domestic battery with a food item" },
      { label: "WITNESS", value: '"It was a full large pepperoni. Still in the box."' },
      { label: "OUTCOME", value: "Released on $500 bail. The pizza was destroyed." },
    ],
    headline: "Florida Man Arrested for Throwing Entire Pizza at Girlfriend During Argument About Toppings",
    subline: "Deputies noted it was 'still warm' upon arrival",
    sceneImage: null, mugshot: null, hintImage: null,
  },
];

function getRandomPuzzle(excludeId) {
  const pool = PUZZLES.filter(p => p.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

const MAX = 6;
const COLOR = "#F57F17";
const ACCENT = "#FFF176";

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
  return <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.9rem",color:ACCENT,fontWeight:"bold",letterSpacing:"0.1em"}}>{t}</span>;
}

function NewspaperPopup({ puzzle, gameState, guesses, onPlayAgain, onHome, onCopy, streak }) {
  const won = gameState === "won";
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.3s ease"}}>
      <div style={{position:"relative",maxWidth:"480px",width:"100%",animation:"newspaperIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both"}}>

        {/* Result banner */}
        <div style={{textAlign:"center",marginBottom:"12px",fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(1.6rem,5vw,2.2rem)",letterSpacing:"0.05em",color:won?"#4CAF50":"#FF6B6B",textShadow:won?"0 0 30px #4CAF5088":"0 0 30px #FF6B6B88"}}>
          {won ? `🎉 GOT IT IN ${guesses.length}/${MAX}!` : `😬 YIKES... IT WAS...`}
        </div>

        {/* Streak badge */}
        {streak > 1 && (
          <div style={{textAlign:"center",marginBottom:"8px"}}>
            <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.65rem",color:"#111",background:ACCENT,padding:"3px 12px",borderRadius:"20px",fontWeight:"bold",letterSpacing:"0.1em"}}>
              🔥 FREE PLAY STREAK: {streak}
            </span>
          </div>
        )}

        {/* Newspaper */}
        <div style={{background:"#f5f0e8",borderRadius:"8px",overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.7), 0 0 0 2px rgba(0,0,0,0.3)",fontFamily:"Georgia,'Times New Roman',serif",color:"#111"}}>
          <div style={{background:"#111",padding:"10px 16px 8px",textAlign:"center",borderBottom:"3px double #f5f0e8"}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"0.55rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.2em",marginBottom:"4px"}}>
              EST. WHENEVER · WEIRDORDLE.COM · FREE PLAY EDITION
            </div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(1.4rem,5vw,2rem)",fontWeight:"bold",color:"#f5f0e8",letterSpacing:"0.08em",lineHeight:1}}>The Florida Gazette</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",marginTop:"4px"}}>"IF IT HAPPENED IN FLORIDA, WE PRINTED IT"</div>
          </div>
          <div style={{height:"2px",background:"#111"}}/>
          <div style={{height:"1px",background:"#111",margin:"2px 0"}}/>
          <div style={{padding:"14px 18px 10px",borderBottom:"1px solid #ccc"}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(1rem,3.5vw,1.4rem)",fontWeight:"bold",lineHeight:1.2,marginBottom:"6px"}}>{puzzle.headline}</div>
            <div style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"0.78rem",color:"#555",lineHeight:1.4}}>{puzzle.subline}</div>
          </div>
          <div style={{padding:"12px 18px",fontSize:"0.78rem",lineHeight:1.6,color:"#333",borderBottom:"1px solid #ccc"}}>
            <p style={{marginBottom:"8px"}}>Authorities in <strong>{puzzle.clues[1]?.value}</strong> responded to reports of a disturbance in {puzzle.clues[0]?.value}, where a local man was involved in what officials described as "one of the stranger calls we've had this month."</p>
            <p style={{fontStyle:"italic",color:"#555"}}>"{puzzle.clues[3]?.value?.replace(/^"|"$/g,"")}" — Eyewitness</p>
          </div>
          <div style={{background:"#111",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em"}}>
              ANSWER: <span style={{color:ACCENT,fontWeight:"bold"}}>{puzzle.answers[0]}</span>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              {guesses.map((g,i)=>(
                <div key={i} style={{width:"10px",height:"10px",borderRadius:"2px",background:g.ok?"#4CAF50":"#B22222"}}/>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{display:"flex",gap:"8px",marginTop:"14px"}}>
          <button onClick={onPlayAgain} style={{flex:2,padding:"12px",borderRadius:"10px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer"}}>
            🔄 PLAY AGAIN
          </button>
          <button onClick={onCopy} style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"rgba(255,255,255,0.6)",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",letterSpacing:"0.1em",cursor:"pointer"}}>
            📋 COPY
          </button>
          <button onClick={onHome} style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"rgba(255,255,255,0.6)",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",letterSpacing:"0.1em",cursor:"pointer"}}>
            🏠 HOME
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:"10px",fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>
          UNLIMITED MODE · WEIRDORDLE.COM
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [puzzle,    setPuzzle]    = useState(() => PUZZLES[Math.floor(Math.random() * PUZZLES.length)]);
  const [revealed,  setRevealed]  = useState(1);
  const [revImgs,   setRevImgs]   = useState(0);
  const [guesses,   setGuesses]   = useState([]);
  const [input,     setInput]     = useState("");
  const [state,     setState]     = useState("playing");
  const [shaking,   setShaking]   = useState(false);
  const [newClue,   setNewClue]   = useState(null);
  const [showHelp,  setShowHelp]  = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [streak,    setStreak]    = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [wins,      setWins]      = useState(0);

  const reveal = (i) => {
    if (i >= puzzle.clues.length) return;
    setNewClue(i); setRevealed(i+1);
    if (i===1) setRevImgs(1);
    if (i===2) setRevImgs(2);
    if (i===3) setRevImgs(3);
  };

  const guess = () => {
    const v = input.trim().toUpperCase();
    if (!v || state !== "playing") return;
    const ok = puzzle.answers.some(a => a.toUpperCase() === v);
    const next = [...guesses, {text:v, ok}];
    setGuesses(next); setInput("");
    if (ok) {
      setState("won");
      supabase.auth.getUser().then(({data:{user}})=>{ if(user) recordGameResult({userId:user.id,category:"floridadle-free",won:true}); });
      setRevealed(puzzle.clues.length); setRevImgs(3);
      setStreak(s => s+1);
      setWins(w => w+1);
      setGamesPlayed(g => g+1);
      setTimeout(() => setShowPaper(true), 600);
    } else {
      setShaking(true); setTimeout(()=>setShaking(false),500);
      if (next.length >= MAX) {
        setState("lost");
        setRevealed(puzzle.clues.length); setRevImgs(3);
        setStreak(0);
        setGamesPlayed(g => g+1);
        setTimeout(() => setShowPaper(true), 600);
      } else {
        setTimeout(()=>reveal(revealed), 500);
      }
    }
  };

  const playAgain = useCallback(() => {
    const next = getRandomPuzzle(puzzle.id);
    setPuzzle(next);
    setRevealed(1); setRevImgs(0);
    setGuesses([]); setInput("");
    setState("playing");
    setNewClue(null);
    setShowPaper(false);
  }, [puzzle.id]);

  const copy = () => navigator.clipboard.writeText(
    ["WEIRDORDLE — Floridadle ∞ 🐊",
     state==="won" ? `Got it in ${guesses.length}/${MAX}` : `Missed it`,
     guesses.map(g=>g.ok?"🟩":"🟥").join(""),
     `Free Play Streak: ${streak}`,
     "weirdordle.com"].join("\n")
  );

  const winPct = gamesPlayed > 0 ? Math.round((wins/gamesPlayed)*100) : 0;

  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:"#080808",color:"#fff",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",padding:"10px 14px 60px 14px",gap:"8px",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        html{font-size:18px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
        @keyframes clueIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes newspaperIn{from{opacity:0;transform:scale(0.88) translateY(24px) rotate(-1deg)}to{opacity:1;transform:scale(1) translateY(0) rotate(0deg)}}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
      `}</style>

      <div style={{position:"fixed",top:0,left:0,right:0,height:"2px",background:"rgba(255,255,255,0.02)",animation:"scanline 8s linear infinite",pointerEvents:"none",zIndex:100}}/>
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none",zIndex:0}}/>

      {showPaper && (
        <NewspaperPopup
          puzzle={puzzle} gameState={state} guesses={guesses} streak={streak}
          onPlayAgain={playAgain} onHome={()=>window.location.href="/"} onCopy={copy}
        />
      )}

      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:`1px solid ${COLOR}55`,borderRadius:"16px",padding:"24px",maxWidth:"380px",width:"100%",position:"relative",boxShadow:`0 0 60px ${COLOR}33`}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",width:"26px",height:"26px",borderRadius:"50%",cursor:"pointer",fontSize:"0.8rem"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <span style={{fontSize:"1.4rem"}}>🐊</span>
              <div>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:"#fff"}}>FREE PLAY</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.55rem",color:ACCENT,letterSpacing:"0.12em"}}>FLORIDADLE · UNLIMITED</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {[
                ["∞","Unlimited puzzles","Random Florida Man headline every time — play as many as you want."],
                ["🔒","Locked clues","Wrong guesses unlock the next clue. No skipping ahead for free."],
                ["📰","Newspaper reveal","Win or lose, the real headline pops up as a newspaper front page."],
                ["🔥","Streak","Win consecutive puzzles to build your free play streak."],
                ["🔄","Play again","Hit Play Again after each game for a new random puzzle instantly."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"7px",background:`${COLOR}22`,border:`1px solid ${COLOR}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>{icon}</div>
                  <div>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.62rem",color:ACCENT,letterSpacing:"0.1em",marginBottom:"2px"}}>{title}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",lineHeight:1.4}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHelp(false)} style={{marginTop:"20px",width:"100%",padding:"10px",borderRadius:"8px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer"}}>
              GOT IT — LET'S PLAY
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"8px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0,position:"relative",zIndex:1}}>
        <a href="/" style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.3rem",letterSpacing:"0.06em",opacity:0.5,cursor:"pointer",color:"#fff",textDecoration:"none"}}>← WEIRDORDLE</a>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"1.1rem"}}>🐊</span>
          <span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",letterSpacing:"0.04em",background:`linear-gradient(135deg,#fff,${ACCENT})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>FLORIDADLE</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {/* Free play badge */}
          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.14em",color:"#000",background:ACCENT,padding:"3px 8px",borderRadius:"20px",fontWeight:"bold"}}>∞ FREE</div>
          {/* Daily link */}
          <a href="/floridadle" style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.14em",color:ACCENT,background:`${COLOR}22`,border:`1px solid ${COLOR}44`,padding:"3px 8px",borderRadius:"20px",textDecoration:"none"}}>📅 DAILY</a>
          <button onClick={()=>setShowHelp(true)} style={{width:"28px",height:"28px",borderRadius:"50%",border:`1px solid ${COLOR}66`,background:`${COLOR}22`,color:ACCENT,fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
        </div>
      </div>

      {/* ATTEMPT BAR */}
      <div style={{display:"flex",alignItems:"center",gap:"5px",flexShrink:0,position:"relative",zIndex:1}}>
        {Array.from({length:MAX}).map((_,i)=>(
          <div key={i} style={{flex:1,height:"4px",borderRadius:"2px",transition:"background 0.3s",
            background:i<guesses.length?(guesses[i].ok?"#4CAF50":"#B22222"):i===guesses.length&&state==="playing"?COLOR:"rgba(255,255,255,0.08)"}}/>
        ))}
        <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",marginLeft:"4px",whiteSpace:"nowrap"}}>
          {state==="playing"?`${MAX-guesses.length} LEFT`:state==="won"?"✅ WON":"❌ OVER"}
        </span>
      </div>

      {/* MAIN GRID */}
      <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 200px",gap:"10px",minHeight:0,position:"relative",zIndex:1}}>

        {/* LEFT — clues + guesses */}
        <div style={{display:"flex",flexDirection:"column",gap:"7px",minHeight:0,overflow:"hidden"}}>
          <div style={{flex:1,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",padding:"10px",display:"flex",flexDirection:"column",gap:"5px",overflow:"auto",minHeight:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",letterSpacing:"0.18em",color:"rgba(255,255,255,0.25)",marginBottom:"2px",flexShrink:0}}>CASE FILE</div>
            {puzzle.clues.map((clue,i)=>{
              const rev = i < revealed;
              return (
                <div key={i} style={{display:"flex",gap:"7px",alignItems:"flex-start",padding:"7px 9px",borderRadius:"7px",flexShrink:0,
                  background:rev?`${COLOR}11`:"rgba(255,255,255,0.01)",
                  border:`1px solid ${rev?COLOR+"33":"rgba(255,255,255,0.04)"}`,
                  opacity:rev?1:0.2,transition:"all 0.4s ease",
                  animation:i===newClue&&rev?"clueIn 0.4s ease both":"none"}}>
                  <div style={{width:"18px",height:"18px",borderRadius:"4px",background:rev?COLOR:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Courier New',monospace",fontSize:"0.55rem",fontWeight:"bold",color:rev?"#000":"rgba(255,255,255,0.15)",transition:"all 0.4s"}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.48rem",letterSpacing:"0.14em",color:rev?ACCENT:"rgba(255,255,255,0.15)",marginBottom:"1px"}}>{clue.label}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:"0.78rem",color:rev?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.08)",fontStyle:clue.value.startsWith('"')?"italic":"normal",lineHeight:1.3,wordBreak:"break-word"}}>{rev?clue.value:"••••••••••••"}</div>
                  </div>
                </div>
              );
            })}
            {state==="playing"&&revealed<puzzle.clues.length&&(
              <div style={{padding:"6px 8px",borderRadius:"6px",border:`1px dashed ${COLOR}33`,background:"transparent",color:"rgba(255,255,255,0.25)",fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.08em",flexShrink:0,textAlign:"center",userSelect:"none"}}>
                🔒 {puzzle.clues.length-revealed} clue{puzzle.clues.length-revealed===1?"":"s"} locked — make a guess to unlock
              </div>
            )}
          </div>

          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",padding:"8px 10px",flexShrink:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",letterSpacing:"0.15em",color:"rgba(255,255,255,0.25)",marginBottom:"5px"}}>GUESSES</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"4px",minHeight:"20px"}}>
              {guesses.length===0
                ? <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.55rem",color:"rgba(255,255,255,0.12)"}}>No guesses yet...</span>
                : guesses.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"4px",padding:"3px 8px",borderRadius:"5px",border:`1px solid ${g.ok?"#4CAF5055":"#B2222255"}`,background:g.ok?"rgba(76,175,80,0.08)":"rgba(178,34,34,0.08)",animation:"fadeIn 0.3s ease"}}>
                    <span style={{fontSize:"0.65rem"}}>{g.ok?"✅":"❌"}</span>
                    <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.62rem",color:g.ok?"#4CAF50":"#FF6B6B",textTransform:"uppercase"}}>{g.text}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* RIGHT — stats + streak + timer */}
        <div style={{display:"flex",flexDirection:"column",gap:"7px",minHeight:0,overflow:"hidden"}}>

          {/* Streak */}
          <div style={{background:`${COLOR}22`,border:`1px solid ${COLOR}55`,borderRadius:"9px",padding:"10px",textAlign:"center",flexShrink:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.48rem",letterSpacing:"0.14em",color:ACCENT,marginBottom:"4px"}}>FREE STREAK 🔥</div>
            <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"2rem",color:ACCENT,lineHeight:1}}>{streak}</div>
          </div>

          {/* Session stats */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"9px",padding:"8px 10px",flexShrink:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.48rem",letterSpacing:"0.14em",color:"rgba(255,255,255,0.22)",marginBottom:"6px"}}>SESSION</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px"}}>
              {[[gamesPlayed,"PLAYED"],[`${winPct}%`,"WIN%"]].map(([v,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.3rem",color:ACCENT,lineHeight:1}}>{v}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.4rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.06em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily reminder */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"9px",padding:"7px 10px",textAlign:"center",flexShrink:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.46rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.12em",marginBottom:"3px"}}>DAILY RESETS IN</div>
            <Timer/>
          </div>

          {/* Play again shortcut */}
          {state!=="playing" && (
            <button onClick={playAgain} style={{padding:"10px",borderRadius:"9px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.58rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer",flexShrink:0}}>
              🔄 PLAY AGAIN
            </button>
          )}
        </div>
      </div>

      {/* FIXED INPUT */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"8px 14px 12px",background:"linear-gradient(transparent,rgba(8,8,8,0.98) 28%)"}}>
        {state==="playing" ? (
          <div style={{display:"flex",gap:"6px",animation:shaking?"shake 0.5s ease":"none",maxWidth:"calc(100% - 214px)"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&guess()}
              placeholder="What did he do?" style={{flex:1,padding:"9px 12px",borderRadius:"8px",border:`1px solid ${COLOR}55`,background:"rgba(8,8,8,0.98)",color:"#fff",fontFamily:"Georgia,serif",fontSize:"0.82rem"}}/>
            <button onClick={guess} style={{padding:"9px 16px",borderRadius:"8px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",fontWeight:"bold",letterSpacing:"0.08em",cursor:"pointer",whiteSpace:"nowrap"}}>GUESS</button>
          </div>
        ) : (
          <div style={{display:"flex",gap:"8px",alignItems:"center",maxWidth:"calc(100% - 214px)"}}>
            <button onClick={()=>setShowPaper(true)} style={{flex:1,padding:"9px",borderRadius:"8px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",fontWeight:"bold",letterSpacing:"0.08em",cursor:"pointer"}}>
              📰 READ THE PAPER
            </button>
            <button onClick={playAgain} style={{flex:1,padding:"9px",borderRadius:"8px",border:`1px solid ${COLOR}55`,background:"transparent",color:ACCENT,fontFamily:"'Courier New',monospace",fontSize:"0.65rem",fontWeight:"bold",letterSpacing:"0.08em",cursor:"pointer"}}>
              🔄 PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}