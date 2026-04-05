import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import ContestRoomPopup from "./ContestRoomPopup";

library.add(fas, fab);

const ContestList = [
  {id: 1, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Finished"},
  {id: 2, name: "Silver Jubilee", participantA: "Hrnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Scheduled"},
  {id: 3, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Finished"},
  {id: 4, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Scheduled"},
  {id: 5, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Finished"},
  {id: 6, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Array"], winner: "Arnav", status:"Ongoing"},
  {id: 7, name: "Golden Jubilee", participantA: "Arnav", participantB: "Manoj", date: "12 January 2026", startTime:"12:30PM", endTime: "2:30PM", tags:["Friendly Contest", "Object"], winner: "Arnav", status:"Ongoing"},
]


const statusStyles = {
  Ongoing: "bg-[#22c55e20] text-green-500",
  Scheduled: "bg-[#3b82f620] text-blue-500", 
  Finished: "bg-[#ef444420] text-red-500",  
};


function ContestManager({ mockUsers, mockContests }) {
  
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [showPopup, setContestRoom] = useState(false);

  // Filter and Search 
  const filteredContests = useMemo(() => {
    return ContestList.filter((contest) => {
      const matchesSearch = 
        contest.name.toLowerCase().includes(search.toLowerCase()) ||
        contest.participantA.toLowerCase().includes(search.toLowerCase()) ||
        contest.participantB.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilter = filterStatus === "All" || contest.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [search, filterStatus]);

  return (
    <div className={`inner-part overflow-y-auto scroll-auto h-full px-8 py-8`}>
      {showPopup && (
                <ContestRoomPopup onClose={() => setContestRoom(false)}/>
            )}
      
      <div className="mb-6">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Contest Manager
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 font-medium">
          Create and Analyse the contests
        </p>
      </div>
      <div className="mt-9">
        <p className="text-[var(--text-secondary)]">Want to Conduct Contest?</p>
        <button 
        onClick={() => setContestRoom(true)}
          className='px-6 py-3 mt-4 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2'>
          <FontAwesomeIcon icon="computer" />
          Create Contest Room
        </button>
      </div>

      <div className="flex w-full flex-col mt-20">
        <h1 className="text-4xl font-extrabold">
          Previosly managed Contests
        </h1>

        {/* Controls */}
        <div className="flex gap-3 mb-5 mt-5">
          <div className="relative flex-1 max-w-sm">
            <FontAwesomeIcon
              icon="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search users..."
              className="w-full bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/20 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-medium"
            />
          </div>

          <div className="flex bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10 rounded-xl p-1 gap-1">
            {["All", "Ongoing", "Finished", "Scheduled"].map((item) => (
              <button
                key={item}
                onClick={() => setFilterStatus(item)}
                className="relative px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{ color: filterStatus === item ? "#fff" : "var(--text-secondary)" }}
              >
                {filterStatus === item && (
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          <AnimatePresence mode='popLayout'>
            {filteredContests.map((contest) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={contest.id} 
                className="cursor-pointer group relative overflow-hidden bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10 rounded-2xl p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div 
  className={`
    ${statusStyles[contest.status] || 'bg-gray-100 text-gray-500'} absolute top-3 right-3
    text-center text-[9px] font-semibold uppercase tracking-widest w-23 py-1 px-2 rounded-full
  `}
>
  {contest.status}
</div>
                <div className="flex items-center justify-center mb-8 relative">
                  <div className="flex w-12 h-12 items-center justify-center p-2 text-2xl rounded-[50%] text-white bg-[#3460a7] font-semibold border border-[var(--text-secondary)]/5">
                    {contest.participantA[0]}
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-red-800 transition-all group-hover:scale-110">
                    <FontAwesomeIcon icon="bolt" />
                  </div>
                  <div className="flex w-12 h-12 items-center justify-center p-2 text-2xl rounded-[50%] text-white bg-[#5d33b9] font-semibold border border-[var(--text-secondary)]/5">
                    {contest.participantB[0]}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-[var(--text-primary)]">
                  {contest.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {contest.date}, {contest.startTime} - {contest.endTime}
                </p>

                <div className="flex flex-wrap gap-2">
                  {contest.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-1 rounded bg-[var(--primary-bg)] text-[var(--text-secondary)] font-semibold border border-[var(--text-secondary)]/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ContestManager;