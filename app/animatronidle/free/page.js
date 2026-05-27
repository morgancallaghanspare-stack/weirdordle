"use client";
import { useState, useEffect, useCallback } from "react";

const ANIMATRONICS = [
  { id:1,  name:"Freddy Fazbear",    game:"FNAF 1",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 3",   behaviour:"BLINDSPOT / DOOR",    image:null, silhouette:null },
  { id:2,  name:"Bonnie",            game:"FNAF 1",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 1",   behaviour:"LEFT DOOR",           image:null, silhouette:null },
  { id:3,  name:"Chica",             game:"FNAF 1",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 1",   behaviour:"RIGHT DOOR",          image:null, silhouette:null },
  { id:4,  name:"Foxy",              game:"FNAF 1",          type:"ANIMATRONIC",   location:"PIRATE COVE",       activeFrom:"NIGHT 2",   behaviour:"SPRINT / LEFT DOOR",  image:null, silhouette:null },
  { id:5,  name:"Golden Freddy",     game:"FNAF 1",          type:"HALLUCINATION", location:"OFFICE",            activeFrom:"NIGHT 1",   behaviour:"CRASH GAME",          image:null, silhouette:null },
  { id:6,  name:"Toy Freddy",        game:"FNAF 2",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 1",   behaviour:"MUSIC BOX / MASK",    image:null, silhouette:null },
  { id:7,  name:"Toy Bonnie",        game:"FNAF 2",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 1",   behaviour:"VENTS / MASK",        image:null, silhouette:null },
  { id:8,  name:"Toy Chica",         game:"FNAF 2",          type:"ANIMATRONIC",   location:"SHOW STAGE",        activeFrom:"NIGHT 1",   behaviour:"VENTS / MASK",        image:null, silhouette:null },
  { id:9,  name:"Mangle",            game:"FNAF 2",          type:"ANIMATRONIC",   location:"PRIZE CORNER",      activeFrom:"NIGHT 2",   behaviour:"VENTS / CEILING",     image:null, silhouette:null },
  { id:10, name:"Balloon Boy",       game:"FNAF 2",          type:"ANIMATRONIC",   location:"GAME AREA",         activeFrom:"NIGHT 2",   behaviour:"VENTS / DRAINS POWER",image:null, silhouette:null },
  { id:11, name:"The Puppet",        game:"FNAF 2",          type:"PUPPET",        location:"PRIZE CORNER",      activeFrom:"NIGHT 1",   behaviour:"MUSIC BOX",           image:null, silhouette:null },
  { id:12, name:"Withered Freddy",   game:"FNAF 2",          type:"ANIMATRONIC",   location:"PARTS & SERVICE",   activeFrom:"NIGHT 3",   behaviour:"BLINDSPOT / MASK",    image:null, silhouette:null },
  { id:13, name:"Withered Bonnie",   game:"FNAF 2",          type:"ANIMATRONIC",   location:"PARTS & SERVICE",   activeFrom:"NIGHT 1",   behaviour:"LEFT VENT / MASK",    image:null, silhouette:null },
  { id:14, name:"Withered Chica",    game:"FNAF 2",          type:"ANIMATRONIC",   location:"PARTS & SERVICE",   activeFrom:"NIGHT 1",   behaviour:"RIGHT VENT / MASK",   image:null, silhouette:null },
  { id:15, name:"Withered Foxy",     game:"FNAF 2",          type:"ANIMATRONIC",   location:"PARTS & SERVICE",   activeFrom:"NIGHT 2",   behaviour:"FLASH LIGHT",         image:null, silhouette:null },
  { id:16, name:"Shadow Freddy",     game:"FNAF 2",          type:"HALLUCINATION", location:"PARTS & SERVICE",   activeFrom:"RARE",      behaviour:"CRASH GAME",          image:null, silhouette:null },
  { id:17, name:"Shadow Bonnie",     game:"FNAF 2",          type:"HALLUCINATION", location:"OFFICE",            activeFrom:"RARE",      behaviour:"CRASH GAME",          image:null, silhouette:null },
  { id:18, name:"Springtrap",        game:"FNAF 3",          type:"SPRINGLOCK",    location:"BACKSTAGE",         activeFrom:"NIGHT 1",   behaviour:"VENTS / AUDIO LURE",  image:null, silhouette:null },
  { id:19, name:"Phantom Freddy",    game:"FNAF 3",          type:"PHANTOM",       location:"CAM 08",            activeFrom:"NIGHT 1",   behaviour:"HALLUCINATION",       image:null, silhouette:null },
  { id:20, name:"Phantom Chica",     game:"FNAF 3",          type:"PHANTOM",       location:"ARCADE",            activeFrom:"NIGHT 2",   behaviour:"HALLUCINATION",       image:null, silhouette:null },
  { id:21, name:"Phantom Foxy",      game:"FNAF 3",          type:"PHANTOM",       location:"OFFICE",            activeFrom:"NIGHT 2",   behaviour:"HALLUCINATION",       image:null, silhouette:null },
  { id:22, name:"Phantom Mangle",    game:"FNAF 3",          type:"PHANTOM",       location:"OFFICE",            activeFrom:"NIGHT 3",   behaviour:"STATIC / JUMPSCARE",  image:null, silhouette:null },
  { id:23, name:"Phantom Puppet",    game:"FNAF 3",          type:"PHANTOM",       location:"CAM 08",            activeFrom:"NIGHT 3",   behaviour:"HALLUCINATION",       image:null, silhouette:null },
  { id:24, name:"Phantom BB",        game:"FNAF 3",          type:"PHANTOM",       location:"CAM 07",            activeFrom:"NIGHT 1",   behaviour:"HALLUCINATION",       image:null, silhouette:null },
  { id:25, name:"Nightmare Freddy",  game:"FNAF 4",          type:"NIGHTMARE",     location:"BED",               activeFrom:"NIGHT 1",   behaviour:"FREDDIES ON BED",     image:null, silhouette:null },
  { id:26, name:"Nightmare Bonnie",  game:"FNAF 4",          type:"NIGHTMARE",     location:"LEFT DOOR",         activeFrom:"NIGHT 1",   behaviour:"LEFT DOOR / CLOSET",  image:null, silhouette:null },
  { id:27, name:"Nightmare Chica",   game:"FNAF 4",          type:"NIGHTMARE",     location:"RIGHT DOOR",        activeFrom:"NIGHT 1",   behaviour:"RIGHT DOOR / KITCHEN",image:null, silhouette:null },
  { id:28, name:"Nightmare Foxy",    game:"FNAF 4",          type:"NIGHTMARE",     location:"CLOSET",            activeFrom:"NIGHT 2",   behaviour:"CLOSET / HALLWAY",    image:null, silhouette:null },
  { id:29, name:"Nightmare Fredbear",game:"FNAF 4",          type:"NIGHTMARE",     location:"BED",               activeFrom:"NIGHT 5",   behaviour:"ALL LOCATIONS",       image:null, silhouette:null },
  { id:30, name:"Nightmare",         game:"FNAF 4",          type:"NIGHTMARE",     location:"BED",               activeFrom:"NIGHT 7",   behaviour:"ALL LOCATIONS",       image:null, silhouette:null },
  { id:31, name:"Circus Baby",       game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"CIRCUS GALLERY",    activeFrom:"NIGHT 1",   behaviour:"MINI GAME / DIRECT",  image:null, silhouette:null },
  { id:32, name:"Ballora",           game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"BALLORA GALLERY",   activeFrom:"NIGHT 2",   behaviour:"SOUND CUES / CRAWL",  image:null, silhouette:null },
  { id:33, name:"Funtime Freddy",    game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"PARTS & SERVICE",   activeFrom:"NIGHT 3",   behaviour:"BON-BON / BUTTON",    image:null, silhouette:null },
  { id:34, name:"Funtime Foxy",      game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"FUNTIME AUDITORIUM",activeFrom:"NIGHT 4",   behaviour:"SOUND CUES / DIRECT", image:null, silhouette:null },
  { id:35, name:"Ennard",            game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"SCOOPING ROOM",     activeFrom:"NIGHT 5",   behaviour:"VENTS / DIRECT",      image:null, silhouette:null },
  { id:36, name:"Bidybab",           game:"SISTER LOCATION", type:"ANIMATRONIC",   location:"CIRCUS GALLERY",    activeFrom:"NIGHT 1",   behaviour:"CRAWL UNDER DESK",    image:null, silhouette:null },
  { id:37, name:"Scrap Baby",        game:"FNAF 6",          type:"ANIMATRONIC",   location:"VENTS",             activeFrom:"NIGHT 1",   behaviour:"VENTS / AUDIO",       image:null, silhouette:null },
  { id:38, name:"Molten Freddy",     game:"FNAF 6",          type:"ANIMATRONIC",   location:"VENTS",             activeFrom:"NIGHT 1",   behaviour:"VENTS / AUDIO",       image:null, silhouette:null },
  { id:39, name:"Scraptrap",         game:"FNAF 6",          type:"SPRINGLOCK",    location:"OUTSIDE",           activeFrom:"NIGHT 2",   behaviour:"AUDIO LURE / DIRECT", image:null, silhouette:null },
  { id:40, name:"Lefty",             game:"FNAF 6",          type:"PUPPET",        location:"VENTS",             activeFrom:"NIGHT 1",   behaviour:"AUDIO / HEAT / NOISE",image:null, silhouette:null },
  { id:41, name:"Glamrock Freddy",   game:"SECURITY BREACH", type:"ANIMATRONIC",   location:"ROCKSTAR ROW",      activeFrom:"ALL NIGHTS",behaviour:"HELPER / ALLY",       image:null, silhouette:null },
  { id:42, name:"Roxanne Wolf",      game:"SECURITY BREACH", type:"ANIMATRONIC",   location:"ROXY RACEWAY",      activeFrom:"ALL NIGHTS",behaviour:"SPRINT / SIGHT",      image:null, silhouette:null },
  { id:43, name:"Montgomery Gator",  game:"SECURITY BREACH", type:"ANIMATRONIC",   location:"MONTY GOLF",        activeFrom:"ALL NIGHTS",behaviour:"CHARGE / BREAK DOORS",image:null, silhouette:null },
  { id:44, name:"Glamrock Chica",    game:"SECURITY BREACH", type:"ANIMATRONIC",   location:"MAZERCISE",         activeFrom:"ALL NIGHTS",behaviour:"SOUND / EATING",      image:null, silhouette:null },
  { id:45, name:"Vanny",             game:"SECURITY BREACH", type:"HUMAN",         location:"EVERYWHERE",        activeFrom:"ALL NIGHTS",behaviour:"STALKING / DIRECT",   image:null, silhouette:null },
  { id:46, name:"The Blob",          game:"SECURITY BREACH", type:"ANIMATRONIC",   location:"UNDERGROUND",       activeFrom:"ENDGAME",   behaviour:"ENDGAME BOSS",        image:null, silhouette:null },
];

function getRandomAnimatronic(excludeId) {
  const pool = ANIMATRONICS.filter(a => a.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

const MAX = 6;
const POWER_STAGES = [
  { time:"12 AM", pct:99, color:"#cc0000" },
  { time:"1 AM",  pct:80, color:"#bb0000" },
  { time:"2 AM",  pct:60, color:"#aa0000" },
  { time:"3 AM",  pct:35, color:"#dd2200" },
  { time:"4 AM",  pct:15, color:"#ff2200" },
  { time:"5 AM",  pct:4,  color:"#ff0000" },
];

const TYPE_COLORS = {
  "ANIMATRONIC":"#64b5f6","PHANTOM":"#ce93d8","NIGHTMARE":"#ef5350",
  "HALLUCINATION":"#80cbc4","SPRINGLOCK":"#ffb74d","PUPPET":"#f48fb1","HUMAN":"#a5d6a7",
};

function TypeBadge({ label }) {
  const color = TYPE_COLORS[label] || "#aaa";
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:"4px",background:`${color}22`,border:`1px solid ${color}55`,fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color,letterSpacing:"0.08em",whiteSpace:"nowrap"}}>{label}</span>;
}

function CRTMonitor({ answer, guessCount, gameState, jumpscaring, poweredDown }) {
  const stage = POWER_STAGES[Math.min(guessCount, MAX-1)];
  const showSilhouette = guessCount >= 5 && gameState === "playing";
  const isOver = gameState !== "playing";

  return (
    <div style={{width:"100%",position:"relative",userSelect:"none"}}>
      <div style={{background:"linear-gradient(160deg,#2a2a2a,#1a1a1a)",borderRadius:"12px 12px 6px 6px",padding:"12px 12px 0",boxShadow:"0 0 0 2px #111, 0 8px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",position:"relative"}}>
        <div style={{position:"absolute",top:"6px",left:"50%",transform:"translateX(-50%)",fontFamily:"'Courier New',monospace",fontSize:"0.42rem",color:"#444",letterSpacing:"0.2em"}}>FAZBEAR SECURITY SYSTEMS</div>
        <div style={{background:"#0a0a0a",borderRadius:"6px 6px 0 0",padding:"8px",boxShadow:"inset 0 0 20px rgba(0,0,0,0.8)"}}>
          <div style={{borderRadius:"4px",overflow:"hidden",aspectRatio:"4/3",background:jumpscaring?"#ff0000":"#000",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 0 30px rgba(0,0,0,0.9)"}}>
            <div style={{position:"absolute",inset:0,zIndex:10,backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,0.35) 0px,rgba(0,0,0,0.35) 1px,transparent 1px,transparent 3px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",inset:0,zIndex:9,background:"rgba(200,0,0,0.04)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",inset:0,zIndex:8,background:"radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.4) 100%)",pointerEvents:"none"}}/>
            {jumpscaring ? (
              <div style={{zIndex:11,textAlign:"center",padding:"12px",animation:"jumpIn 0.08s ease both"}}>
                <div style={{fontSize:"clamp(3rem,8vw,5rem)",lineHeight:1}}>😱</div>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(0.9rem,2vw,1.2rem)",color:"#fff",letterSpacing:"0.1em",marginTop:"8px"}}>IT WAS {answer.name.toUpperCase()}</div>
              </div>
            ) : poweredDown ? (
              <div style={{zIndex:11,textAlign:"center",padding:"16px",animation:"fadeIn 0.5s ease"}}>
                <div style={{fontSize:"clamp(2rem,5vw,3.5rem)",filter:"grayscale(1) brightness(0.3)",marginBottom:"8px"}}>🤖</div>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(0.85rem,2vw,1.1rem)",color:"rgba(200,0,0,0.6)",letterSpacing:"0.12em",marginBottom:"4px"}}>{answer.name.toUpperCase()}</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"rgba(200,0,0,0.35)",letterSpacing:"0.1em"}}>POWERED DOWN</div>
              </div>
            ) : showSilhouette ? (
              <div style={{zIndex:11,textAlign:"center",padding:"16px",animation:"fadeIn 0.5s ease"}}>
                <div style={{width:"clamp(60px,12vw,90px)",height:"clamp(80px,16vw,120px)",background:"rgba(200,0,0,0.06)",border:"1px solid rgba(200,0,0,0.15)",borderRadius:"6px",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(2rem,5vw,3rem)",filter:"brightness(0.15)"}}>🤖</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(200,0,0,0.45)",letterSpacing:"0.12em"}}>SILHOUETTE DETECTED</div>
              </div>
            ) : isOver ? (
              <div style={{zIndex:11,textAlign:"center",padding:"16px"}}>
                {answer.image ? <img src={answer.image} alt={answer.name} style={{maxHeight:"140px",objectFit:"contain",animation:"fadeIn 0.5s ease"}}/> : <div style={{fontSize:"clamp(2rem,5vw,3.5rem)",marginBottom:"8px",animation:"fadeIn 0.5s ease"}}>🤖</div>}
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"clamp(0.85rem,2vw,1.1rem)",color:gameState==="won"?"#cc0000":"#ff3300",letterSpacing:"0.12em",textShadow:gameState==="won"?"0 0 16px #cc000088":"0 0 16px #ff330088"}}>{answer.name.toUpperCase()}</div>
              </div>
            ) : (
              <div style={{zIndex:11,textAlign:"center",padding:"20px"}}>
                <div style={{width:"clamp(50px,10vw,70px)",height:"clamp(50px,10vw,70px)",margin:"0 auto 10px",border:"1px solid rgba(200,0,0,0.15)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                  <span style={{fontSize:"clamp(1.2rem,3vw,1.8rem)",opacity:0.12,color:"#cc0000"}}>?</span>
                  <div style={{position:"absolute",inset:"-3px",borderRadius:"50%",border:"1px solid transparent",borderTop:"1px solid rgba(200,0,0,0.3)",animation:"spin 3s linear infinite"}}/>
                </div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(200,0,0,0.35)",letterSpacing:"0.14em"}}>ENTITY UNIDENTIFIED</div>
                {guessCount < 5 && <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.45rem",color:"rgba(200,0,0,0.2)",letterSpacing:"0.1em",marginTop:"4px"}}>SILHOUETTE AT {5-guessCount} MORE WRONG</div>}
              </div>
            )}
            <div style={{position:"absolute",top:"6px",left:"8px",zIndex:12,fontFamily:"'Courier New',monospace",fontSize:"0.45rem",color:"rgba(200,0,0,0.45)",letterSpacing:"0.12em"}}>CAM 1A</div>
            <div style={{position:"absolute",top:"6px",right:"8px",zIndex:12,fontFamily:"'Courier New',monospace",fontSize:"0.45rem",color:"rgba(200,0,0,0.45)",letterSpacing:"0.12em"}}>{new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}</div>
            <div style={{position:"absolute",bottom:"6px",left:"8px",zIndex:12,display:"flex",alignItems:"center",gap:"4px"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#ff0000",boxShadow:"0 0 6px #ff0000",animation:"pulse 1s ease infinite"}}/>
              <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.42rem",color:"rgba(255,0,0,0.7)",letterSpacing:"0.1em"}}>REC</span>
            </div>
          </div>
        </div>
        <div style={{background:"#1a1a1a",borderTop:"1px solid #111",padding:"8px 12px",display:"flex",alignItems:"center",gap:"10px",borderRadius:"0 0 4px 4px"}}>
          <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:"#555",letterSpacing:"0.12em",whiteSpace:"nowrap",minWidth:"40px"}}>{stage.time}</span>
          <div style={{flex:1,height:"8px",background:"#0a0a0a",borderRadius:"4px",overflow:"hidden",border:"1px solid #222"}}>
            <div style={{height:"100%",width:`${stage.pct}%`,background:stage.color,borderRadius:"4px",transition:"width 1s ease, background 0.5s ease",boxShadow:`0 0 8px ${stage.color}88`}}/>
          </div>
          <span style={{fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:stage.color,letterSpacing:"0.1em",whiteSpace:"nowrap",textShadow:`0 0 8px ${stage.color}`,minWidth:"60px",textAlign:"right"}}>PWR {stage.pct}%</span>
        </div>
      </div>
      <div style={{width:"30%",height:"16px",background:"linear-gradient(180deg,#1e1e1e,#141414)",margin:"0 auto"}}/>
      <div style={{width:"50%",height:"8px",background:"#141414",margin:"0 auto",borderRadius:"0 0 4px 4px",boxShadow:"0 4px 12px rgba(0,0,0,0.8)"}}/>
    </div>
  );
}

function GuessCard({ guessed, answer, index }) {
  const gm=guessed.game===answer.game,tm=guessed.type===answer.type,lm=guessed.location===answer.location,nm=guessed.activeFrom===answer.activeFrom,bm=guessed.behaviour===answer.behaviour;
  const matchCount=[gm,tm,lm,nm,bm].filter(Boolean).length;
  const Attr=({label,value,match,wide})=>(
    <div style={{flex:wide?2:1,background:match?"rgba(200,0,0,0.07)":"rgba(255,30,30,0.05)",border:`1px solid ${match?"rgba(200,0,0,0.3)":"rgba(255,30,30,0.18)"}`,borderRadius:"6px",padding:"10px",minWidth:0}}>
      <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:match?"rgba(200,0,0,0.5)":"rgba(255,60,60,0.5)",letterSpacing:"0.14em",marginBottom:"5px",textTransform:"uppercase"}}>{label}</div>
      <div style={{fontSize:"0.75rem",color:match?"#cc0000":"#ff4444",fontWeight:"bold",fontFamily:"'Courier New',monospace",lineHeight:1.3,wordBreak:"break-word"}}>{value}</div>
      <div style={{marginTop:"6px",fontSize:"0.85rem"}}>{match?"✅":"❌"}</div>
    </div>
  );
  return (
    <div style={{background:"#0c0c0c",border:`1px solid ${matchCount===5?"rgba(200,0,0,0.35)":"#1e1e1e"}`,borderRadius:"10px",overflow:"hidden",animation:"cardSlideIn 0.4s cubic-bezier(0.34,1.2,0.64,1) both",boxShadow:matchCount===5?"0 0 20px rgba(200,0,0,0.12)":"0 2px 12px rgba(0,0,0,0.6)",flexShrink:0,minWidth:"340px",maxWidth:"380px"}}>
      <div style={{background:matchCount===5?"rgba(200,0,0,0.08)":"#111",borderBottom:"1px solid #1e1e1e",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"#444",letterSpacing:"0.1em"}}>GUESS {index+1}</div>
          <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1rem",color:matchCount===5?"#cc0000":"#ccc",letterSpacing:"0.08em",textShadow:matchCount===5?"0 0 12px rgba(200,0,0,0.4)":"none"}}>{guessed.name.toUpperCase()}</div>
          <TypeBadge label={guessed.type}/>
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.6rem",color:matchCount===5?"#cc0000":matchCount>=3?"#ff6600":"#ff3333",letterSpacing:"0.08em",fontWeight:"bold"}}>{matchCount}/5</div>
      </div>
      <div style={{padding:"10px",display:"flex",gap:"6px"}}>
        <Attr label="Game"     value={guessed.game}       match={gm}/>
        <Attr label="Location" value={guessed.location}   match={lm} wide/>
        <Attr label="Active"   value={guessed.activeFrom} match={nm}/>
        <Attr label="Behaviour"value={guessed.behaviour}  match={bm} wide/>
      </div>
    </div>
  );
}

function Picker({ onSelect, usedNames }) {
  const [open,setOpen]=useState(false);
  const [search,setSearch]=useState("");
  const available=ANIMATRONICS.filter(a=>!usedNames.includes(a.name)&&a.name.toLowerCase().includes(search.toLowerCase()));
  const grouped=available.reduce((acc,a)=>{if(!acc[a.game]) acc[a.game]=[];acc[a.game].push(a);return acc;},{});
  return (
    <div style={{position:"relative",flex:1}}>
      <div onClick={()=>setOpen(o=>!o)} style={{padding:"13px 16px",borderRadius:"8px",border:`1px solid ${open?"rgba(200,0,0,0.35)":"#1e1e1e"}`,background:"#0c0c0c",color:"rgba(200,0,0,0.7)",fontFamily:"'Courier New',monospace",fontSize:"0.82rem",letterSpacing:"0.08em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",boxShadow:open?"0 0 20px rgba(200,0,0,0.08)":"0 2px 8px rgba(0,0,0,0.5)"}}>
        <span>▶ CHECK THE CAMERAS — SELECT ANIMATRONIC</span>
        <span style={{opacity:0.4,fontSize:"0.7rem"}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{position:"absolute",bottom:"110%",left:0,right:0,background:"#080808",border:"1px solid #1e1e1e",borderRadius:"8px",overflow:"hidden",boxShadow:"0 -16px 60px rgba(0,0,0,0.95)",zIndex:100,maxHeight:"340px",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"10px",borderBottom:"1px solid #1a1a1a"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search animatronic name..." autoFocus style={{width:"100%",background:"#050505",border:"1px solid #1e1e1e",borderRadius:"6px",padding:"9px 12px",color:"#cc0000",fontFamily:"'Courier New',monospace",fontSize:"0.75rem",outline:"none"}}/>
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {Object.entries(grouped).map(([game,chars])=>(
              <div key={game}>
                <div style={{padding:"7px 14px",background:"#0a0a0a",fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(200,0,0,0.4)",letterSpacing:"0.2em",borderBottom:"1px solid #141414",borderTop:"1px solid #141414"}}>— {game.toUpperCase()} —</div>
                {chars.map(a=>(
                  <div key={a.id} onClick={()=>{onSelect(a);setOpen(false);setSearch("");}} style={{padding:"11px 14px",borderBottom:"1px solid #111",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",transition:"background 0.12s"}} onMouseEnter={e=>e.currentTarget.style.background="#0f0f0f"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"rgba(200,0,0,0.4)",flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.8rem",color:"#ccc",letterSpacing:"0.06em",marginBottom:"4px"}}>{a.name}</div>
                      <div style={{display:"flex",gap:"6px",alignItems:"center"}}><TypeBadge label={a.type}/><span style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"#444",letterSpacing:"0.06em"}}>{a.activeFrom}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {available.length===0&&<div style={{padding:"20px",textAlign:"center",color:"#333",fontFamily:"'Courier New',monospace",fontSize:"0.7rem"}}>NO RESULTS FOUND</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultModal({ answer, guesses, gameState, onPlayAgain, onHome }) {
  const won=gameState==="won";
  const copy=()=>navigator.clipboard.writeText(
    ["WEIRDORDLE — Animatronidle ∞ 🐻",
     won?`Survived in ${guesses.length}/${MAX}`:"It got me...",
     guesses.map(g=>{const gm=g.game===answer.game,tm=g.type===answer.type,lm=g.location===answer.location,nm=g.activeFrom===answer.activeFrom,bm=g.behaviour===answer.behaviour;return `${g.name}: ${[gm,tm,lm,nm,bm].map(m=>m?"🟩":"🟥").join("")}`;}).join("\n"),
     "weirdordle.com"].join("\n")
  );
  return (
    <div onClick={onPlayAgain} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.93)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.3s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0a0a0a",border:`2px solid ${won?"rgba(200,0,0,0.4)":"rgba(255,30,30,0.3)"}`,borderRadius:"12px",padding:"28px",maxWidth:"440px",width:"100%",fontFamily:"'Courier New',monospace",boxShadow:`0 0 60px ${won?"rgba(200,0,0,0.1)":"rgba(255,0,0,0.14)"}`,animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both"}}>
        <div style={{textAlign:"center",marginBottom:"22px"}}>
          <div style={{fontSize:"2.8rem",marginBottom:"10px"}}>{won?"🎉":"💀"}</div>
          <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.5rem",color:won?"#cc0000":"#ff3300",letterSpacing:"0.1em",marginBottom:"6px",textShadow:`0 0 20px ${won?"#cc0000":"#ff3300"}`}}>
            {won?`SURVIVED — ${guesses.length}/${MAX} GUESSES`:"GAME OVER — IT GOT YOU"}
          </div>
          <div style={{fontSize:"0.65rem",color:"rgba(200,0,0,0.45)",letterSpacing:"0.14em",marginBottom:"4px"}}>THE ANIMATRONIC WAS</div>
          <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.8rem",color:"#cc0000",letterSpacing:"0.15em",textShadow:"0 0 20px rgba(200,0,0,0.4)"}}>{answer.name.toUpperCase()}</div>
        </div>
        <div style={{background:"#0d0d0d",border:"1px solid #1e1e1e",borderRadius:"8px",padding:"14px",marginBottom:"18px"}}>
          <div style={{fontSize:"0.52rem",color:"rgba(200,0,0,0.4)",letterSpacing:"0.18em",marginBottom:"10px"}}>ANIMATRONIC FILE</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
            {[["GAME",answer.game],["ACTIVE FROM",answer.activeFrom],["LOCATION",answer.location],["BEHAVIOUR",answer.behaviour]].map(([l,v])=>(
              <div key={l}><div style={{fontSize:"0.48rem",color:"#333",letterSpacing:"0.12em",marginBottom:"3px"}}>{l}</div><div style={{fontSize:"0.72rem",color:"#aaa"}}>{v}</div></div>
            ))}
          </div>
          <div style={{marginTop:"10px"}}><div style={{fontSize:"0.48rem",color:"#333",letterSpacing:"0.12em",marginBottom:"4px"}}>TYPE</div><TypeBadge label={answer.type}/></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          <button onClick={onPlayAgain} style={{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid rgba(200,0,0,0.25)",background:"rgba(200,0,0,0.06)",color:"#cc0000",fontFamily:"'Courier New',monospace",fontSize:"0.72rem",letterSpacing:"0.12em",cursor:"pointer"}}>🔄 PLAY AGAIN</button>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={copy} style={{flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #1e1e1e",background:"transparent",color:"#555",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.1em",cursor:"pointer"}}>📋 COPY</button>
            <button onClick={onHome} style={{flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #1e1e1e",background:"transparent",color:"#555",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.1em",cursor:"pointer"}}>🏠 HOME</button>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:"12px",fontSize:"0.5rem",color:"#222",letterSpacing:"0.12em"}}>UNLIMITED MODE · WEIRDORDLE.COM</div>
      </div>
    </div>
  );
}

export default function App() {
  const [answer,      setAnswer]      = useState(()=>ANIMATRONICS[Math.floor(Math.random()*ANIMATRONICS.length)]);
  const [guesses,     setGuesses]     = useState([]);
  const [state,       setState]       = useState("playing");
  const [showResult,  setShowResult]  = useState(false);
  const [showHelp,    setShowHelp]    = useState(false);
  const [jumpscaring, setJumpscaring] = useState(false);
  const [poweredDown, setPoweredDown] = useState(false);
  const [streak,      setStreak]      = useState(0);
  const [played,      setPlayed]      = useState(0);
  const [wins,        setWins]        = useState(0);

  const handleGuess = (anim) => {
    if (state !== "playing") return;
    const next = [...guesses, anim];
    setGuesses(next);
    if (anim.name === answer.name) {
      setTimeout(()=>setPoweredDown(true), 400);
      setStreak(s=>s+1); setWins(w=>w+1); setPlayed(p=>p+1);
      setTimeout(()=>{ setState("won"); setShowResult(true); }, 2200);
    } else if (next.length >= MAX) {
      setTimeout(()=>setJumpscaring(true), 300);
      setStreak(0); setPlayed(p=>p+1);
      setTimeout(()=>{ setJumpscaring(false); setState("lost"); setShowResult(true); }, 2600);
    }
  };

  const playAgain = useCallback(()=>{
    setAnswer(getRandomAnimatronic(answer.id));
    setGuesses([]); setState("playing");
    setShowResult(false); setJumpscaring(false); setPoweredDown(false);
  },[answer.id]);

  const winPct = played>0?Math.round((wins/played)*100):0;

  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:"#060606",color:"#ccc",fontFamily:"'Courier New',monospace",display:"flex",flexDirection:"column",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        html{font-size:18px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes cardSlideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes jumpIn{0%{transform:scale(0.3) rotate(-5deg);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#080808;}
        ::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:2px;}
      `}</style>

      <div style={{position:"fixed",top:0,left:0,right:0,height:"1px",background:"rgba(200,0,0,0.02)",animation:"scanline 7s linear infinite",pointerEvents:"none",zIndex:100}}/>

      {showResult && <ResultModal answer={answer} guesses={guesses} gameState={state} onPlayAgain={playAgain} onHome={()=>window.location.href="/"}/>}

      {showHelp && (
        <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0a0a0a",border:"1px solid #1e1e1e",borderRadius:"12px",padding:"26px",maxWidth:"400px",width:"100%",position:"relative"}}>
            <button onClick={()=>setShowHelp(false)} style={{position:"absolute",top:"12px",right:"12px",background:"transparent",border:"none",color:"#333",width:"26px",height:"26px",borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem"}}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
              <span style={{fontSize:"1.4rem"}}>🐻</span>
              <div>
                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.2rem",color:"#cc0000",letterSpacing:"0.1em"}}>FREE PLAY</div>
                <div style={{fontSize:"0.52rem",color:"#333",letterSpacing:"0.14em"}}>ANIMATRONIDLE · UNLIMITED</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
              {[
                ["∞","Unlimited nights","Random animatronic every round — play as many as you want."],
                ["🖥️","Watch the monitor","Figure out which animatronic is in the building before power runs out."],
                ["🟩","Attribute matching","Game, Location, Active From and Behaviour turn green when they match."],
                ["😱","Jumpscare on loss","Run out of guesses and it gets you. Guess right and it powers down."],
                ["🔥","Streak","Win consecutive rounds to build your free play streak."],
                ["🔄","Play again","Instant new animatronic after each round."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                  <div style={{width:"30px",height:"30px",borderRadius:"6px",background:"#0f0f0f",border:"1px solid #1e1e1e",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.9rem"}}>{icon}</div>
                  <div>
                    <div style={{fontSize:"0.7rem",color:"#bbb",letterSpacing:"0.08em",marginBottom:"2px"}}>{title}</div>
                    <div style={{fontSize:"0.68rem",color:"#444",lineHeight:1.45}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHelp(false)} style={{marginTop:"20px",width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #1e1e1e",background:"#0f0f0f",color:"#cc0000",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",letterSpacing:"0.12em",cursor:"pointer"}}>
              START NIGHT SHIFT
            </button>
          </div>
        </div>
      )}

      <div style={{flex:1,display:"grid",gridTemplateColumns:"400px 1fr",gridTemplateRows:"1fr auto",gap:"0",minHeight:0,background:"radial-gradient(ellipse at 20% 50%,#0d0d0d 0%,#060606 100%)"}}>

        {/* LEFT — desk + monitor */}
        <div style={{display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#080808 0%,#0a0a0a 100%)",borderRight:"1px solid #111",padding:"16px 16px 0",position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px",flexShrink:0}}>
            <a href="/" style={{fontSize:"0.75rem",letterSpacing:"0.06em",color:"#333",cursor:"pointer",textDecoration:"none"}} onMouseEnter={e=>e.currentTarget.style.color="#666"} onMouseLeave={e=>e.currentTarget.style.color="#333"}>← WEIRDORDLE</a>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <span style={{fontSize:"0.9rem"}}>🐻</span>
              <span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.1rem",letterSpacing:"0.06em",color:"#cc0000",textShadow:"0 0 12px rgba(200,0,0,0.3)"}}>ANIMATRONIDLE</span>
            </div>
            <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
              {/* Free badge */}
              <div style={{fontSize:"0.48rem",letterSpacing:"0.14em",color:"#fff",background:"#cc0000",padding:"2px 8px",borderRadius:"20px",fontWeight:"bold"}}>∞ FREE</div>
              <a href="/animatronidle" style={{fontSize:"0.48rem",letterSpacing:"0.1em",color:"#cc0000",background:"rgba(200,0,0,0.08)",border:"1px solid #1e1e1e",padding:"2px 8px",borderRadius:"20px",textDecoration:"none"}}>📅 DAILY</a>
              <button onClick={()=>setShowHelp(true)} style={{width:"24px",height:"24px",borderRadius:"50%",border:"1px solid #1e1e1e",background:"transparent",color:"#444",fontSize:"0.8rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
            </div>
          </div>

          <CRTMonitor answer={answer} guessCount={guesses.length} gameState={state} jumpscaring={jumpscaring} poweredDown={poweredDown}/>

          {/* Desk surface */}
          <div style={{flex:1,background:"linear-gradient(180deg,#0c0c0c,#0a0a0a)",marginTop:"8px",borderTop:"1px solid #111",padding:"12px",display:"flex",flexDirection:"column",gap:"8px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontSize:"0.52rem",color:"#2a2a2a",letterSpacing:"0.14em"}}>FREDDY FAZBEAR'S PIZZA · FREE PLAY</div>
              <div style={{display:"flex",gap:"5px"}}>
                {Array.from({length:MAX}).map((_,i)=>(
                  <div key={i} style={{width:"12px",height:"12px",borderRadius:"2px",background:i<guesses.length?(guesses[i].name===answer.name?"#cc0000":"#880000"):i===guesses.length&&state==="playing"?"#222":"#111",border:`1px solid ${i<guesses.length?(guesses[i].name===answer.name?"rgba(200,0,0,0.4)":"rgba(136,0,0,0.3)"):"#1a1a1a"}`,transition:"all 0.3s"}}/>
                ))}
              </div>
            </div>
            {/* Session stats */}
            <div style={{background:"#0a0a0a",border:"1px solid #111",borderRadius:"6px",padding:"8px 10px"}}>
              <div style={{fontSize:"0.45rem",color:"#222",letterSpacing:"0.18em",marginBottom:"6px"}}>SESSION</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"4px",textAlign:"center"}}>
                {[[played,"PLAYED"],[`${winPct}%`,"WIN%"],[streak,"STREAK 🔥"]].map(([v,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.1rem",color:"#cc0000",lineHeight:1}}>{v}</div>
                    <div style={{fontSize:"0.38rem",color:"#2a2a2a",letterSpacing:"0.1em"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — night log */}
        <div style={{display:"flex",flexDirection:"column",background:"#080808",minHeight:0,padding:"16px 16px 80px",overflow:"hidden"}}>
          <div style={{fontSize:"0.52rem",color:"#222",letterSpacing:"0.2em",marginBottom:"12px",flexShrink:0}}>— NIGHT LOG —</div>
          {guesses.length===0 ? (
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1a1a",fontSize:"0.72rem",letterSpacing:"0.14em",textAlign:"center",lineHeight:2.5}}>
              NO ENTRIES<br/>SELECT AN ANIMATRONIC BELOW
            </div>
          ) : (
            <div style={{flex:1,overflowX:"auto",overflowY:"hidden",display:"flex",flexDirection:"row",gap:"10px",alignItems:"stretch",paddingBottom:"8px"}}>
              {guesses.map((g,i)=><GuessCard key={i} guessed={g} answer={answer} index={i}/>)}
            </div>
          )}
        </div>

        {/* BOTTOM BAR */}
        <div style={{gridColumn:"1 / -1",position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"10px 16px 14px",background:"linear-gradient(transparent,#060606 30%)"}}>
          {state==="playing" ? (
            <Picker onSelect={handleGuess} usedNames={guesses.map(g=>g.name)}/>
          ) : (
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setShowResult(true)} style={{flex:2,padding:"13px",borderRadius:"8px",border:"1px solid rgba(200,0,0,0.25)",background:"rgba(200,0,0,0.06)",color:"#cc0000",fontFamily:"'Courier New',monospace",fontSize:"0.75rem",letterSpacing:"0.1em",cursor:"pointer"}}>
                🐻 {state==="won"?"VIEW RESULT":"SEE WHO IT WAS"}
              </button>
              <button onClick={playAgain} style={{flex:1,padding:"13px",borderRadius:"8px",border:"1px solid #1e1e1e",background:"transparent",color:"#444",fontFamily:"'Courier New',monospace",fontSize:"0.75rem",letterSpacing:"0.1em",cursor:"pointer"}}>
                🔄 AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}