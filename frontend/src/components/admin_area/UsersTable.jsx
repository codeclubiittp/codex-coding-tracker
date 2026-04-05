import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import { div } from "framer-motion/client";

library.add(fas, fab);

function UserStatsPanel({ user, onClose }) {
    return (
        <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 35 }}
            className="absolute top-0 right-0 h-full w-96 bg-[var(--secondary-bg)] border-l border-[var(--text-secondary)]/10 z-30 flex flex-col shadow-2xl"
        >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--text-secondary)]/10">
                <div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)]">{user.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{user.email}  |  Joined {new Date(user.joined).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[var(--primary-bg)] flex items-center justify-center transition-all text-[var(--text-secondary)]">
                    <FontAwesomeIcon icon="xmark" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <span
      className={`${user.status == 'Active' ? 'bg-[#22c55e20]' : 'bg-[#ef444420]'} flex justify-center items-center gap-1.5 text-[10px] font-black uppercase tracking-widest w-23 py-1 rounded-full`}
      
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${user.status == 'Active' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'} `}
      />
      {user.status}
    </span>

                {/* Platform Stats */}
                <div>
                    <h4 className="text-xs uppercase font-black font-semibold tracking-widest text-[var(--text-secondary)] mb-3">Platform Stats</h4>
                    <div className="space-y-3">
                        {user.leetcode && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--primary-bg)] border border-[#FFA116]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#FFA116]/15 flex items-center justify-center">
                                        <FontAwesomeIcon icon={['fab', 'python']} className="text-[#FFA116]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)]">LeetCode</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">@{user.leetcode}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-[var(--text-primary)]">{user.lc_solved}</p>
                                    <p className="text-[10px] text-[var(--text-secondary)]">solved</p>
                                </div>
                            </div>
                        )}
                        {user.codeforces && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--primary-bg)] border border-[#1F8ACB]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#1F8ACB]/15 flex items-center justify-center">
                                        <FontAwesomeIcon icon="code" className="text-[#1F8ACB]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)]">Codeforces</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">@{user.codeforces}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-[var(--text-primary)]">{user.cf_rating}</p>
                                    <p className="text-[10px] text-[var(--text-secondary)]">rating</p>
                                </div>
                            </div>
                        )}
                        {!user.leetcode && !user.codeforces && (
                            <p className="text-xs text-[var(--text-secondary)] italic">No platforms connected.</p>
                        )}
                    </div>
                </div>

                {/* Streak */}
                <div>
                    <h4 className="text-xs uppercase font-black font-semibold tracking-widest text-[var(--text-secondary)] mb-3">Activity</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[var(--primary-bg)] text-center">
                            <p className="text-2xl font-semibold text-orange-400">{user.streak}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Day Streak</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--primary-bg)] text-center">
                            <p className="text-2xl font-semibold text-blue-400">{user.lc_solved + (user.cf_rating ? Math.floor(user.cf_rating / 10) : 0)}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Total Problems</p>
                        </div>
                    </div>
                </div>

                {/* Buttons for control */}
                <div className="space-y-2">
                    <h4 className="text-xs uppercase font-black font-semibold tracking-widest text-red-400 mb-3">Admin Actions</h4>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all">
                        <FontAwesomeIcon icon="ban" className="mr-2" /> Ban User
                    </button>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/10 transition-all">
                        <FontAwesomeIcon icon="rotate-left" className="mr-2" /> Reset Progress
                    </button>
                </div>
            </div>
        </motion.div>
    );
}






function UsersTable({ mockUsers, mockContests }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      mockUsers.filter((u) => {
        const q = search.toLowerCase();
        const matchQ =
          u.name.toLowerCase().includes(q) ||
          
          u.email.toLowerCase().includes(q);
        const matchS = filterStatus === "All" || u.status === filterStatus;
        return matchQ && matchS;
      }),
    [search, filterStatus],
  );

  return (
    <div className="inner-part overflow-y-auto scroll-auto h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
          User Management System
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 font-medium">
          {mockUsers.length} registered users
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-5">
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
            {["All", "Active", "Banned"].map((item) => (
                <button
                    key={item}
                    onClick={() => setFilter(item)}
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
            <p className="text-xs text-[var(--text-secondary)] font-semibold mb-5">
                    Showing {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                </p>
      {/* User Table */}
      <div className="flex-1 overflow-y-auto bg-[var(--secondary-bg)] rounded-xl border border-[var(--text-secondary)]/10 relative">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--text-secondary)]/10 sticky top-0 bg-gray-500/10 z-10">
              {[
                "User",
                "Email",
                "Platforms",
                "LeetCode",
                "CF Rating",
                "Streak",
                "Status",
              ].map((item) => (
                <th
                  key={item}
                  className="text-left px-5 py-3.5 text-xs uppercase text-[var(--primary-text)] tracking-widest text-[var(--text-secondary)]"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelected(selected?.id === u.id ? null : u)}
                  className="border-b border-[var(--text-secondary)]/5 hover:bg-[var(--primary-bg)] transition-colors cursor-pointer"
                  style={{
                    background:
                      selected?.id === u.id ? "var(--primary-bg)" : "",
                  }}
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[var(--violet)] flex items-center justify-center text-white font-bold text-xs">
                        {u.name.split(" ").map(word => word[0].toUpperCase()).join("")}
                      </div>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {u.name.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-[var(--text-secondary)] font-mono text-xs">
                    {u.email}
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex gap-1">
                      {u.leetcode && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded font-bold"
                          style={{ background: "#FFA11620", color: "#FFA116" }}
                        >
                          LC
                        </span>
                      )}
                      {u.codeforces && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded font-bold"
                          style={{ background: "#1F8ACB20", color: "#1F8ACB" }}
                        >
                          CF
                        </span>
                      )}
                      {!u.leetcode && !u.codeforces && (
                        <span className="text-[9px] text-[var(--text-secondary)]">
                          —
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5 font-semibold text-[var(--text-primary)]">
                    {u.lc_solved || "—"}
                  </td>
                  <td className="px-5 py-5 font-semibold text-[var(--text-primary)]">
                    {u.cf_rating || "—"}
                  </td>
                  <td className="px-5 py-5">
                    <span className="font-semibold text-orange-400">
                      {u.streak > 0 ? `${u.streak}` : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <span
      className={`${u.status == 'Active' ? 'bg-[#22c55e20]' : 'bg-[#ef444420]'} flex justify-center items-center gap-1.5 text-[10px] font-black uppercase tracking-widest w-23 py-1 rounded-full`}
      
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${u.status == 'Active' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'} `}
      />
      {u.status}
    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Side panel on viewing full data */}
        <AnimatePresence>
          {selected && (
            <UserStatsPanel user={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default UsersTable;
