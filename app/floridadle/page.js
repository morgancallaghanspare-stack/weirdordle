"use client";

import { supabase } from "../../lib/supabase";
import { recordGameResult } from "../../lib/auth";


import { useState, useEffect } from "react";

// ============================================================
//  PUZZLE DATABASE
//  To add more puzzles: copy one object, change all the fields.
//  The daily puzzle is picked by taking today's date number
//  and using it to index into this array (it cycles automatically).
// ============================================================
const PUZZLES = [
  {
    id: 1,
    // Multiple accepted answers — add as many variations as make sense
    answers: ["ALLIGATOR WRESTLING","WRESTLED AN ALLIGATOR","WRESTLING AN ALLIGATOR","WRESTLE ALLIGATOR","GATOR WRESTLING"],
    // Hint image shown after 4th wrong guess — put in /public/images/floridadle/
    hintImage: null, // e.g. "/images/floridadle/gator-hint.jpg"
    clues: [
      { label: "YEAR",     value: "2019" },
      { label: "COUNTY",   value: "Collier County, FL" },
      { label: "CHARGES",  value: "Misdemeanor — unlicensed alligator handling" },
      { label: "WITNESS",  value: '"He just... climbed on it. Nobody asked him to."' },
      { label: "OUTCOME",  value: "Released with a warning. The gator was unharmed." },
    ],
    headline:  "Florida Man Arrested After Wrestling 9-Foot Alligator in a Walmart Parking Lot",
    subline:   "Witnesses described the scene as 'completely unprovoked'",
    // image paths — put your images in /public/images/ in your Next.js project
    // e.g. sceneImage: "/images/floridadle/gator-walmart.jpg"
    sceneImage:  null,
    mugshot:     null,
  },
  {
    id: 2,
    answers: ["CHEESE THEFT","STEALING CHEESE","ATE CHEESE","EATING CHEESE","STOLE CHEESE"],
    hintImage: null,
    clues: [
      { label: "YEAR",    value: "2021" },
      { label: "COUNTY",  value: "Broward County, FL" },
      { label: "CHARGES", value: "Petty theft — $47 worth of cheese" },
      { label: "WITNESS", value: '"He just kept eating it in the aisle. Didn\'t even stop when we approached."' },
      { label: "OUTCOME", value: "Banned from all Publix locations in the state." },
    ],
    headline: "Florida Man Arrested for Eating $47 Worth of Cheese in Supermarket, Refusing to Pay",
    subline:  "Staff said he 'showed no remorse whatsoever'",
    sceneImage: null,
    mugshot:    null,
  },
  {
    id: 3,
    answers: ["SWORD FIGHT WITH ROOMMATE","SWORD FIGHT","SWORDFIGHT","MEDIEVAL SWORD FIGHT","FOUGHT ROOMMATE WITH SWORD"],
    hintImage: null,
    clues: [
      { label: "YEAR",    value: "2020" },
      { label: "COUNTY",  value: "Hillsborough County, FL" },
      { label: "CHARGES", value: "Aggravated assault with a deadly weapon" },
      { label: "WITNESS", value: '"They were arguing about the last Hot Pocket."' },
      { label: "OUTCOME", value: "Both men required stitches. Neither pressed charges." },
    ],
    headline: "Florida Man Challenges Roommate to Sword Fight Over Last Hot Pocket, Both Hospitalised",
    subline:  "Deputies arrived to find two men in medieval cosplay gear",
    sceneImage: null,
    mugshot:    null,
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

// ── Daily puzzle picker ──
// Uses the day of the year so the puzzle changes every midnight automatically.
function getDailyPuzzle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  return PUZZLES[dayOfYear % PUZZLES.length];
}

const MAX   = 6;
const COLOR = "#F57F17";
const ACCENT= "#FFF176";

// ── Countdown timer ──
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

// ── Newspaper popup ──
function NewspaperPopup({ puzzle, gameState, guesses, onClose, onCopy }) {
  const won = gameState === "won";
  return (
    <div
      onClick={onClose}
      style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.3s ease"}}
    >
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          position:"relative",maxWidth:"480px",width:"100%",
          animation:"newspaperIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Result banner above paper */}
        <div style={{
          textAlign:"center",marginBottom:"12px",
          fontFamily:"'Bebas Neue',Impact,sans-serif",
          fontSize:"clamp(1.6rem,5vw,2.4rem)",
          letterSpacing:"0.05em",
          color: won ? "#4CAF50" : "#FF6B6B",
          textShadow: won ? "0 0 30px #4CAF5088" : "0 0 30px #FF6B6B88",
        }}>
          {won
            ? `🎉 GOT IT IN ${guesses.length}/${MAX}!`
            : `😬 YIKES... IT WAS...`}
        </div>

        {/* The newspaper */}
        <div style={{
          background:"#f5f0e8",
          borderRadius:"8px",
          overflow:"hidden",
          boxShadow:"0 30px 80px rgba(0,0,0,0.7), 0 0 0 2px rgba(0,0,0,0.3)",
          fontFamily:"Georgia,'Times New Roman',serif",
          color:"#111",
        }}>
          {/* Newspaper masthead */}
          <div style={{
            background:"#111",
            padding:"10px 16px 8px",
            textAlign:"center",
            borderBottom:"3px double #f5f0e8",
          }}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"0.55rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.2em",marginBottom:"4px"}}>
              EST. WHENEVER · WEIRDORDLE.COM · {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase()}
            </div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(1.4rem,5vw,2rem)",fontWeight:"bold",color:"#f5f0e8",letterSpacing:"0.08em",lineHeight:1}}>
              The Florida Gazette
            </div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",marginTop:"4px"}}>
              "IF IT HAPPENED IN FLORIDA, WE PRINTED IT"
            </div>
          </div>

          {/* Divider line */}
          <div style={{height:"2px",background:"#111",margin:"0"}}/>
          <div style={{height:"1px",background:"#111",margin:"2px 0"}}/>

          {/* Main headline */}
          <div style={{padding:"14px 18px 10px",borderBottom:"1px solid #ccc"}}>
            <div style={{
              fontFamily:"Georgia,serif",
              fontSize:"clamp(1rem,3.5vw,1.4rem)",
              fontWeight:"bold",
              lineHeight:1.2,
              marginBottom:"6px",
              color:"#111",
            }}>
              {puzzle.headline}
            </div>
            <div style={{
              fontFamily:"Georgia,serif",
              fontStyle:"italic",
              fontSize:"0.78rem",
              color:"#555",
              lineHeight:1.4,
            }}>
              {puzzle.subline}
            </div>
          </div>

          {/* Image + story columns */}
          <div style={{display:"grid",gridTemplateColumns:puzzle.sceneImage?"1fr 1fr":"1fr",gap:0}}>

            {/* Scene image or decorative placeholder */}
            {puzzle.sceneImage ? (
              <img src={puzzle.sceneImage} alt="scene" style={{width:"100%",height:"160px",objectFit:"cover",borderRight:"1px solid #ccc"}}/>
            ) : (
              <div style={{
                padding:"12px 18px",
                borderRight: puzzle.mugshot ? "1px solid #ccc" : "none",
                fontSize:"0.78rem",lineHeight:1.6,color:"#333",
              }}>
                <p style={{marginBottom:"8px"}}>
                  Authorities in <strong>{puzzle.clues[1]?.value}</strong> responded to reports of a disturbance on {puzzle.clues[0]?.value}, where a local man was found to have been involved in what officials described as &quot;one of the stranger calls we've had this month.&quot;
                </p>
                <p>
                  The suspect, whose name has not been released, was charged with <em>{puzzle.clues[2]?.value?.toLowerCase()}</em>. {puzzle.clues[4]?.value}
                </p>
              </div>
            )}

            {/* Mugshot or quote block */}
            {puzzle.mugshot ? (
              <img src={puzzle.mugshot} alt="mugshot" style={{width:"100%",height:"160px",objectFit:"cover"}}/>
            ) : !puzzle.sceneImage && (
              <div style={{
                padding:"12px 18px",
                background:"#ede8d8",
                borderTop:"1px solid #ccc",
                fontSize:"0.82rem",
              }}>
                <div style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"0.9rem",color:"#333",lineHeight:1.5,marginBottom:"6px"}}>
                  "{puzzle.clues[3]?.value?.replace(/^"|"$/g,"")}"
                </div>
                <div style={{fontSize:"0.6rem",color:"#888",letterSpacing:"0.08em"}}>— EYEWITNESS STATEMENT</div>
              </div>
            )}
          </div>

          {/* Footer strip */}
          <div style={{
            background:"#111",padding:"8px 16px",
            display:"flex",alignItems:"center",justifyContent:"space-between",
          }}>
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
          <button onClick={onCopy} style={{flex:1,padding:"11px",borderRadius:"10px",border:"none",background:COLOR,color:"#000",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer"}}>
            📋 COPY RESULT
          </button>
          <button onClick={onClose} style={{flex:1,padding:"11px",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"rgba(255,255,255,0.6)",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",letterSpacing:"0.1em",cursor:"pointer"}}>
            VIEW STATS
          </button>
        </div>

        <div style={{textAlign:"center",marginTop:"10px",fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>
          NEW FLORIDA MAN AT MIDNIGHT · WEIRDORDLE.COM
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const PUZZLE = getDailyPuzzle();

  const [revealed,   setRevealed]   = useState(1);
  const [revImgs,    setRevImgs]    = useState(0);
  const [guesses,    setGuesses]    = useState([]);
  const [input,      setInput]      = useState("");
  const [state,      setState]      = useState("playing");
  const [shaking,    setShaking]    = useState(false);
  const [newClue,    setNewClue]    = useState(null);
  const [showHelp,   setShowHelp]   = useState(false);
  const [showPaper,  setShowPaper]  = useState(false);

  const reveal = (i) => {
    if (i >= PUZZLE.clues.length) return;
    setNewClue(i); setRevealed(i+1);
    if (i===1) setRevImgs(1);
    if (i===2) setRevImgs(2);
    if (i===3) setRevImgs(3); // 3 = hint image also revealed
  };

  const guess = () => {
    const v = input.trim().toUpperCase();
    if (!v || state !== "playing") return;
    const ok = PUZZLE.answers.some(a => a.toUpperCase() === v);
    const next = [...guesses, {text:v, ok}];
    setGuesses(next); setInput("");
    if (ok) {
      setState("won");
      supabase.auth.getUser().then(({data:{user}})=>{ if(user) recordGameResult({userId:user.id,category:"floridadle",won:true}); });
      setRevealed(PUZZLE.clues.length); setRevImgs(2);
      setTimeout(() => setShowPaper(true), 600);
    } else {
      setShaking(true); setTimeout(()=>setShaking(false),500);
      if (next.length >= MAX) {
        setState("lost");
        supabase.auth.getUser().then(({data:{user}})=>{ if(user) recordGameResult({userId:user.id,category:"floridadle",won:false}); });
        setRevealed(PUZZLE.clues.length); setRevImgs(2);
        setTimeout(() => setShowPaper(true), 600);
      } else {
        setTimeout(()=>reveal(revealed), 500);
      }
    }
  };

  const copy = () => navigator.clipboard.writeText(
    ["WEIRDORDLE — Floridadle 🐊",
     state==="won" ? `Got it in ${guesses.length}/${MAX}` : `Missed it (${MAX}/${MAX})`,
     guesses.map(g=>g.ok?"🟩":"🟥").join(""),
     "weirdordle.com"].join("\n")
  );

  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:"#080808",color:"#fff",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",padding:"10px 14px 60px 14px",gap:"8px",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
       *{box-sizing:border-box;margin:0;padding:0;}
html{font-size:24px;}
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

      {/* Newspaper popup */}
      {showPaper && (
        <NewspaperPopup
          puzzle={PUZZLE}
          gameState={state}
          guesses={guesses}
          onClose={()=>setShowPaper(false)}
          onCopy={copy}
        />
      )}

      {/* HOW TO PLAY MODAL */}
      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:`1px solid ${COLOR}55`,borderRadius:"16px",padding:"24px",maxWidth:"380px",width:"100%",position:"relative",boxShadow:`0 0 60px ${COLOR}33`}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",width:"26px",height:"26px",borderRadius:"50%",cursor:"pointer",fontSize:"0.8rem"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <span style={{fontSize:"1.4rem"}}>🐊</span>
              <div>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",letterSpacing:"0.04em",color:"#fff"}}>HOW TO PLAY</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.55rem",color:ACCENT,letterSpacing:"0.12em"}}>FLORIDADLE</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {[
                ["🔍","Read the clues","Each clue reveals more about what the Florida Man did. Only one clue starts revealed."],
                ["💬","Make your guess","Type what you think happened and hit GUESS."],
                ["🔒","Locked clues","Wrong guesses unlock the next clue automatically — you can't skip ahead for free."],
                ["🖼️","Images unlock","Scene photos and mugshots reveal as you use more clues."],
                ["📰","Newspaper","Win or lose, a newspaper front page pops up with the real headline and story."],
                ["📋","Share","Copy your result and flex. New Florida Man every day at midnight."],
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
          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.14em",color:ACCENT,background:`${COLOR}22`,border:`1px solid ${COLOR}44`,padding:"3px 8px",borderRadius:"20px"}}>DAILY</div>
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

        {/* LEFT */}
        <div style={{display:"flex",flexDirection:"column",gap:"7px",minHeight:0,overflow:"hidden"}}>
          <div style={{flex:1,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",padding:"10px",display:"flex",flexDirection:"column",gap:"5px",overflow:"auto",minHeight:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",letterSpacing:"0.18em",color:"rgba(255,255,255,0.25)",marginBottom:"2px",flexShrink:0}}>CASE FILE</div>
            {PUZZLE.clues.map((clue,i)=>{
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
            {state==="playing"&&revealed<PUZZLE.clues.length&&(
              <div style={{padding:"6px 8px",borderRadius:"6px",border:`1px dashed ${COLOR}33`,background:"transparent",color:"rgba(255,255,255,0.25)",fontFamily:"'Courier New',monospace",fontSize:"0.52rem",letterSpacing:"0.08em",flexShrink:0,textAlign:"center",userSelect:"none"}}>
                🔒 {PUZZLE.clues.length-revealed} clue{PUZZLE.clues.length-revealed===1?"":"s"} locked — make a guess to unlock
              </div>
            )}
          </div>

          {/* Guesses */}
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

        {/* RIGHT */}
        <div style={{display:"flex",flexDirection:"column",gap:"7px",minHeight:0,overflow:"hidden"}}>
          {PUZZLE.images && PUZZLE.images.map((img,i)=>{
            const rev = i < revImgs;
            return (
              <div key={i} style={{flex:1,borderRadius:"9px",overflow:"hidden",border:`1px solid ${rev?COLOR+"44":"rgba(255,255,255,0.05)"}`,background:"rgba(255,255,255,0.02)",transition:"all 0.4s",display:"flex",flexDirection:"column",minHeight:0}}>
                <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",background:rev?`linear-gradient(135deg,${COLOR}15,transparent)`:"rgba(0,0,0,0.2)",transition:"background 0.4s",position:"relative",minHeight:0}}>
                  {rev
                    ? <><span style={{fontSize:"1.6rem",animation:"fadeIn 0.4s"}}>🐊</span><span style={{fontFamily:"'Courier New',monospace",fontSize:"0.44rem",color:"rgba(255,255,255,0.2)",border:"1px dashed rgba(255,255,255,0.1)",padding:"2px 6px",borderRadius:"3px"}}>ADD IMAGE</span></>
                    : <><span style={{fontSize:"1.1rem",opacity:0.15}}>🔒</span><span style={{fontFamily:"'Courier New',monospace",fontSize:"0.44rem",color:"rgba(255,255,255,0.12)",letterSpacing:"0.1em"}}>LOCKED</span></>
                  }
                  <div style={{position:"absolute",top:"5px",left:"5px",fontFamily:"'Courier New',monospace",fontSize:"0.44rem",letterSpacing:"0.1em",padding:"2px 6px",borderRadius:"3px",background:"rgba(0,0,0,0.65)",color:rev?ACCENT:"rgba(255,255,255,0.15)",border:`1px solid ${rev?COLOR+"44":"rgba(255,255,255,0.05)"}`,backdropFilter:"blur(4px)"}}>{img.label}</div>
                </div>
                <div style={{padding:"4px 8px",fontFamily:"'Courier New',monospace",fontSize:"0.46rem",color:rev?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.08)",letterSpacing:"0.05em",borderTop:"1px solid rgba(255,255,255,0.04)",flexShrink:0,transition:"color 0.4s",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{img.caption}</div>
              </div>
            );
          })}

          {/* BIG HINT IMAGE — unlocks after 4th guess (revImgs >= 3) */}
          {(() => {
            const hintRevealed = revImgs >= 3;
            return (
              <div style={{
                flexShrink:0, borderRadius:"9px", overflow:"hidden",
                border:`2px solid ${hintRevealed ? "#FF6B6B" : "rgba(255,255,255,0.05)"}`,
                background:"rgba(255,255,255,0.02)",
                transition:"all 0.5s ease",
                boxShadow: hintRevealed ? "0 0 20px rgba(255,107,107,0.25)" : "none",
              }}>
                <div style={{
                  height:"80px", display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:"4px",
                  position:"relative",
                  background: hintRevealed
                    ? "linear-gradient(135deg,rgba(255,107,107,0.15),rgba(245,127,23,0.1))"
                    : "rgba(0,0,0,0.2)",
                  transition:"background 0.5s",
                }}>
                  {PUZZLE.hintImage && hintRevealed ? (
                    <img src={PUZZLE.hintImage} alt="hint" style={{width:"100%",height:"100%",objectFit:"cover",animation:"fadeIn 0.6s ease"}}/>
                  ) : hintRevealed ? (
                    <>
                      <span style={{fontSize:"1.4rem",animation:"fadeIn 0.4s"}}>🔥</span>
                      <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.44rem",color:"rgba(255,255,255,0.3)",border:"1px dashed rgba(255,255,255,0.15)",padding:"2px 6px",borderRadius:"3px"}}>ADD HINT IMAGE</span>
                    </>
                  ) : (
                    <>
                      <span style={{fontSize:"1rem",opacity:0.15}}>🔒</span>
                      <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.42rem",color:"rgba(255,255,255,0.12)",letterSpacing:"0.08em",textAlign:"center",padding:"0 6px"}}>BIG HINT</span>
                    </>
                  )}
                  <div style={{
                    position:"absolute", top:"5px", left:"5px",
                    fontFamily:"'Courier New',monospace", fontSize:"0.42rem", letterSpacing:"0.1em",
                    padding:"2px 6px", borderRadius:"3px",
                    background:"rgba(0,0,0,0.7)",
                    color: hintRevealed ? "#FF6B6B" : "rgba(255,255,255,0.15)",
                    border:`1px solid ${hintRevealed ? "#FF6B6B44" : "rgba(255,255,255,0.05)"}`,
                    backdropFilter:"blur(4px)",
                  }}>
                    {hintRevealed ? "🔥 BIG HINT" : `🔒 GUESS ${4 - Math.min(guesses.length,3)} MORE`}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Stats */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"9px",padding:"8px 10px",flexShrink:0}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.48rem",letterSpacing:"0.14em",color:"rgba(255,255,255,0.22)",marginBottom:"6px"}}>STATS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"2px"}}>
              {[["1","PLAYED"],["100%","WIN%"],["1","STREAK"],["1","BEST"]].map(([v,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.1rem",color:ACCENT,lineHeight:1}}>{v}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.4rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.06em",marginTop:"1px"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown + re-open newspaper if game ended */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"9px",padding:"7px 10px",textAlign:"center",flexShrink:0}}>
            {state !== "playing" ? (
              <button onClick={()=>setShowPaper(true)} style={{width:"100%",padding:"6px",borderRadius:"6px",border:`1px solid ${COLOR}55`,background:`${COLOR}22`,color:ACCENT,fontFamily:"'Courier New',monospace",fontSize:"0.52rem",fontWeight:"bold",letterSpacing:"0.1em",cursor:"pointer"}}>
                📰 VIEW NEWSPAPER
              </button>
            ) : (
              <>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.46rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.12em",marginBottom:"3px"}}>NEXT IN</div>
                <Timer/>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM INPUT */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"8px 14px 12px",background:"linear-gradient(transparent, rgba(8,8,8,0.98) 28%)"}}>
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
            <button onClick={copy} style={{padding:"9px 14px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"rgba(255,255,255,0.5)",fontFamily:"'Courier New',monospace",fontSize:"0.62rem",cursor:"pointer",whiteSpace:"nowrap"}}>COPY</button>
          </div>
        )}
      </div>
    </div>
  );
}