import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { div } from 'framer-motion/client';

library.add(fas, fab);

const FILTERS = ["All", "Unlocked", "Locked"];


function AchievementCard({ item, index, theme}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full p-2 bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10"
            style={{
                boxShadow: hovered ? "0 15px 30px rgba(0,0,0,0.15)" : "0 4px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
            }}
        >
            {/* Locked icon */}
            {!item.unlocked && (
                <div 
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/10 backdrop-blur-[2px]"
                >
                    <FontAwesomeIcon icon="lock" className="text-xl text-gray-100 opacity-60" />
                    <span className="text-[10px] font-bold text-gray-100 uppercase tracking-widest mt-2">Locked</span>
                </div>
            )}

            {/* main containeir */}
            <div 
                className={`relative h-28 flex items-center justify-center transition-all duration-500 ${!item.unlocked ? 'grayscale opacity-50' : ''}`} 
            >
                <div className="flex items-center justify-center">
                    <img 
                        src={`/assets/achievements/${item.src}`} 
                        className={`w-18 h-18 object-contain ${theme !== 'day' && "brightness-0 invert"}`} 
                    />
                </div>
                
                {/* green tick */}
                {item.unlocked && (
                   <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--success)] flex items-center justify-center shadow-lg border-2 border-[var(--secondary-bg)]">
                        <FontAwesomeIcon icon="check" className="text-white text-[8px]" />
                   </div>
                )}
            </div>

            {/* item info section */}
            <div className="flex flex-col gap-1 p-4 flex-1 border-t border-[var(--text-secondary)]/10">
                <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">
                    {item.name}
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-snug line-clamp-2 flex-1">
                    {item.desc}
                </p>
            </div>
        </div>
    );
}


function AchievementPage({activeTheme , achievements, userStats }) {

    const [filterTab, setFilterTab]     = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    

    // const unlockedNo = achievements.filter(item => item.unlocked).length;


    // const filteredArray = useMemo(() => {
    //     return achievements.filter(item => {
    //         const matchesTab      = filterTab === "All" || (filterTab === "Unlocked" ? item.unlocked : !item.unlocked);
    //         const matchesSearch   = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    //                                 || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    //         return matchesTab && matchesSearch;
    //     });
    // }, [filterTab, searchQuery]);



    const evaluatedAchievements = useMemo(() => {
        return achievements.map(item => ({
            ...item,
            unlocked: item.condition ? item.condition(userStats) : false
        }));
    }, [achievements, userStats]);

    
    const unlockedNo = evaluatedAchievements.filter(a => a.unlocked).length;

   
    const filteredArray = useMemo(() => {
        return evaluatedAchievements.filter(item => {
            const matchesTab =
                filterTab === "All" ||
                (filterTab === "Unlocked" ? item.unlocked : !item.unlocked);

            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [filterTab, searchQuery, evaluatedAchievements]);


  return (
    <div className="p-8 h-full overflow-y-auto">
      
      {/* top part */}
      {/* Header */}
                  <div className="mb-10">
                      <h1 className="text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
                          Achievements
                      </h1>
                      <p className="text-[var(--text-secondary)] font-medium">
                          Your journey, your glory. Keep grinding to unlock them all.
                      </p>
      
                      {/* Stats row */}
                      <div
                          className="flex gap-6 mt-6"
                      >
                          
                              <div 
                                  className="flex items-center gap-3 bg-[var(--secondary-bg)] px-5 py-2 rounded-xl border border-[var(--text-secondary)]/10">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                      <FontAwesomeIcon icon="unlock" className="text-lg" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-[var(--text-secondary)] font-semibold">Unlocked</p>
                                      <p className="text-sm font-black text-[var(--text-primary)]">{unlockedNo}</p>
                                  </div>
                              </div>

                              <div 
                                  className="flex items-center gap-3 bg-[var(--secondary-bg)] px-5 py-3 rounded-xl border border-[var(--text-secondary)]/10">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                      <FontAwesomeIcon icon="ranking-star" className="text-lg" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-[var(--text-secondary)] font-semibold">Progress</p>
                                      <p className="text-sm font-black text-[var(--text-primary)]">{Math.round(unlockedNo / achievements.length * 100)}%</p>
                                  </div>
                              </div>
                          
                      </ div>
                  </div>

                  {/* Control section */}
                    <div className="flex flex-wrap gap-4 items-center mb-8">
                        {/* search bar */}
                        <div className="relative flex-1 min-w-56 max-w-xs">
                            <FontAwesomeIcon icon="search"
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm" />
                            <input
                                type="text"
                                placeholder="Search achievements..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/20 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-medium"
                            />
                        </div>
        
                        {/* Unlock filter tabs */}
                        <div className="flex bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10 rounded-xl p-1 gap-1">
                            {FILTERS.map(item => (
                                <button
                                    key={item}
                                    onClick={() => setFilterTab(item)}
                                    className="relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                                    style={{ color: filterTab === item ? "#fff" : "var(--text-secondary)" }}
                                >
                                    {filterTab === item && (
                                        <motion.div
                                            layoutId="tab-pill"
                                            className="absolute inset-0 rounded-lg bg-blue-600"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                <p className="text-xs text-[var(--text-secondary)] font-semibold mb-5">
                    Showing {filteredArray.length} achievement{filteredArray.length !== 1 ? "s" : ""}
                </p>

                  {/* Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    <AnimatePresence mode="popLayout">
                        {/* {filtered.map((item, i) => (
                            <AchievementCard key={item.id + item.src} item={item} index={i} />
                        ))} */}
                        {filteredArray.map((item, i) =>(
                            // <div>hi</div>
                            <AchievementCard key={item.id + item.src} item={item} index={i} theme={activeTheme} />
                        ))}
            
                    </AnimatePresence>
                </motion.div>

                {filteredArray.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 gap-4">
                        <FontAwesomeIcon icon="magnifying-glass" className="text-5xl text-[var(--text-secondary)]/30" />
                        <p className="text-[var(--text-secondary)] font-semibold">No achievements found</p>
                    </motion.div>
                )}
    </div>
  )
}

export default AchievementPage;
