"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { signInWithGoogle, signOut, getOrCreateProfile, getLeaderboard, getUserStats } from "../lib/auth";

const CATEGORIES = [
  { id: "floridadle",  name: "Floridadle",     emoji: "🐊" },
  { id: "griffindle",  name: "Griffindle",      emoji: "🍺" },
  { id: "phasmodle",   name: "Phasmodle",       emoji: "👻" },
  { id: "animatronidle", name: "Animatronidle", emoji: "🐻" },
  { id: "operatle",    name: "Operatle",        emoji: "🎯" },
  { id: "crimedle",    name: "Crimedle",        emoji: "🔪" },
  { id: "dramadle",    name: "Dramadle",        emoji: "🎭" },
];

export default function AuthModal({ onClose }) {
  const [user,        setUser]        = useState(null);
  const [profile,     setProfile]     = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats,   setUserStats]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [tab,         setTab]         = useState("leaderboard"); // leaderboard | profile
  const [activeCategory, setActiveCategory] = useState("floridadle");

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const prof = await getOrCreateProfile(user);
        setProfile(prof);
        const stats = await getUserStats(user.id);
        setUserStats(stats);
      }
      const lb = await getLeaderboard();
      setLeaderboard(lb);
      setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const prof = await getOrCreateProfile(session.user);
        setProfile(prof);
        const stats = await getUserStats(session.user.id);
        setUserStats(stats);
      } else {
        setUser(null);
        setProfile(null);
        setUserStats([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
    setUserStats([]);
  };

  const filteredLB = leaderboard.filter(e => e.category === activeCategory);
  const userStat = userStats.find(s => s.category === activeCategory);

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:500,
        background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"20px", animation:"fadeIn 0.2s ease",
        fontFamily:"Georgia, serif",
      }}
    >
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          background:"#0e0e0e", borderRadius:"20px",
          border:"1px solid rgba(255,255,255,0.1)",
          width:"100%", maxWidth:"560px",
          maxHeight:"85vh", display:"flex", flexDirection:"column",
          overflow:"hidden",
          boxShadow:"0 30px 80px rgba(0,0,0,0.8)",
          animation:"popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          @keyframes fadeIn{from{opacity:0}to{opacity:1}}
          @keyframes popIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        `}</style>

        {/* Header */}
        <div style={{
          padding:"20px 24px 0",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0,
        }}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.8rem",letterSpacing:"0.06em",color:"#fff",lineHeight:1}}>WEIRDORDLE</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.55rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.18em",marginTop:"2px"}}>LEADERBOARD & PROFILE</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.4)",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Auth strip */}
        <div style={{
          padding:"14px 24px",
          borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0,
        }}>
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              {profile?.avatar_url && (
                <img src={profile.avatar_url} alt="" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.2)"}}/>
              )}
              <div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.7rem",color:"#fff",fontWeight:"bold"}}>{profile?.username || "Player"}</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em"}}>Signed in with Google</div>
              </div>
            </div>
          ) : (
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.4)"}}>
              Sign in to track your streaks
            </div>
          )}
          {user ? (
            <button onClick={handleSignOut} style={{padding:"6px 14px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"rgba(255,255,255,0.5)",fontFamily:"'Courier New',monospace",fontSize:"0.58rem",letterSpacing:"0.08em",cursor:"pointer"}}>
              Sign out
            </button>
          ) : (
            <button onClick={handleSignIn} style={{padding:"8px 16px",borderRadius:"10px",border:"none",background:"#fff",color:"#111",fontFamily:"'Courier New',monospace",fontSize:"0.62rem",fontWeight:"bold",letterSpacing:"0.08em",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 2px 12px rgba(255,255,255,0.15)"}}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign in with Google
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.08)",flexShrink:0}}>
          {[["leaderboard","🏆 Leaderboard"],["profile","👤 My Stats"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"12px",border:"none",background:"transparent",color:tab===id?"#fff":"rgba(255,255,255,0.3)",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.1em",cursor:"pointer",borderBottom:`2px solid ${tab===id?"#fff":"transparent"}`,transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div style={{padding:"12px 24px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:"6px",overflowX:"auto",flexShrink:0}}>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCategory(cat.id)} style={{padding:"4px 12px",borderRadius:"20px",border:`1px solid ${activeCategory===cat.id?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.1)"}`,background:activeCategory===cat.id?"rgba(255,255,255,0.12)":"transparent",color:activeCategory===cat.id?"#fff":"rgba(255,255,255,0.35)",fontFamily:"'Courier New',monospace",fontSize:"0.55rem",letterSpacing:"0.1em",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"auto",padding:"16px 24px"}}>
          {loading ? (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"200px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.1)",borderTop:"2px solid #fff",animation:"spin 0.8s linear infinite"}}/>
            </div>
          ) : tab === "leaderboard" ? (
            <div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.18em",marginBottom:"12px"}}>
                TOP STREAKS — {CATEGORIES.find(c=>c.id===activeCategory)?.name?.toUpperCase()}
              </div>

              {filteredLB.length === 0 ? (
                <div style={{textAlign:"center",padding:"40px 0",color:"rgba(255,255,255,0.2)",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",letterSpacing:"0.12em",lineHeight:2}}>
                  NO ENTRIES YET<br/>BE THE FIRST ON THE BOARD
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                  {filteredLB.slice(0,20).map((entry,i)=>{
                    const isUser = entry.username === profile?.username;
                    const medal = i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
                    return (
                      <div key={i} style={{
                        display:"flex", alignItems:"center", gap:"12px",
                        padding:"10px 14px", borderRadius:"10px",
                        background: isUser ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isUser ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`,
                        transition:"background 0.2s",
                      }}>
                        <div style={{width:"24px",textAlign:"center",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.3)",flexShrink:0}}>
                          {medal || `#${i+1}`}
                        </div>
                        {entry.avatar_url ? (
                          <img src={entry.avatar_url} alt="" style={{width:"28px",height:"28px",borderRadius:"50%",flexShrink:0}}/>
                        ) : (
                          <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0}}>👤</div>
                        )}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.7rem",color:isUser?"#fff":"rgba(255,255,255,0.7)",fontWeight:isUser?"bold":"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {entry.username} {isUser && <span style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.4)"}}>(you)</span>}
                          </div>
                          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.3)",marginTop:"1px"}}>
                            {entry.total_wins}W / {entry.total_played}P
                          </div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:"#fff",lineHeight:1}}>{entry.best_streak}</div>
                          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}}>BEST</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:entry.current_streak>0?"#4ade80":"rgba(255,255,255,0.3)",lineHeight:1}}>{entry.current_streak}</div>
                          <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}}>NOW</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            // Profile / My Stats tab
            <div>
              {!user ? (
                <div style={{textAlign:"center",padding:"40px 0"}}>
                  <div style={{fontSize:"2rem",marginBottom:"12px"}}>👤</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",marginBottom:"16px"}}>Sign in to see your stats</div>
                  <button onClick={handleSignIn} style={{padding:"10px 20px",borderRadius:"10px",border:"none",background:"#fff",color:"#111",fontFamily:"'Courier New',monospace",fontSize:"0.65rem",fontWeight:"bold",letterSpacing:"0.08em",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"8px"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.52rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.18em",marginBottom:"12px"}}>YOUR STATS — ALL CATEGORIES</div>
                  <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    {CATEGORIES.map(cat=>{
                      const stat = userStats.find(s=>s.category===cat.id);
                      return (
                        <div key={cat.id} style={{
                          padding:"12px 14px", borderRadius:"10px",
                          background: activeCategory===cat.id?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.02)",
                          border:`1px solid ${activeCategory===cat.id?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.05)"}`,
                          cursor:"pointer",
                          transition:"all 0.2s",
                        }} onClick={()=>setActiveCategory(cat.id)}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                              <span style={{fontSize:"1.1rem"}}>{cat.emoji}</span>
                              <div>
                                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.68rem",color:"#fff",letterSpacing:"0.08em"}}>{cat.name}</div>
                                {stat ? (
                                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",marginTop:"2px"}}>
                                    {stat.total_wins}W / {stat.total_played}P · {stat.total_played>0?Math.round((stat.total_wins/stat.total_played)*100):0}% win rate
                                  </div>
                                ) : (
                                  <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.5rem",color:"rgba(255,255,255,0.2)",marginTop:"2px"}}>Not played yet</div>
                                )}
                              </div>
                            </div>
                            <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
                              <div style={{textAlign:"center"}}>
                                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:stat?.current_streak>0?"#4ade80":"rgba(255,255,255,0.2)",lineHeight:1}}>{stat?.current_streak||0}</div>
                                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.42rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em"}}>NOW</div>
                              </div>
                              <div style={{textAlign:"center"}}>
                                <div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:"#fff",lineHeight:1}}>{stat?.best_streak||0}</div>
                                <div style={{fontFamily:"'Courier New',monospace",fontSize:"0.42rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em"}}>BEST</div>
                              </div>
                              {stat?.current_streak>0&&<span style={{fontSize:"1rem"}}>🔥</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}