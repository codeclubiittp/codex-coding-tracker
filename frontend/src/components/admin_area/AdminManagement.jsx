import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import { div } from "framer-motion/client";
import AdminRegisteration from "./AdminRegisteration";

library.add(fas, fab);

function AdminManagement({ mockUsers, mockContests, setActiveItem }) {
  const [search, setSearch] = useState("");
    const [filterStatus, setFilter] = useState("All");
    const [selected, setSelected] = useState(null);
    const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  
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

        {showRegisterPopup && <AdminRegisteration onClose={() => setshowRegisterPopup(false)} />}

        <div className="mb-6">
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Admin Management System
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 font-medium">
            {mockUsers.length} registered admins
          </p>
        </div>




         {/*user profile section */}
        <div className="bg-[var(--secondary-bg)] rounded-2xl p-6 border border-[var(--text-secondary)]/10 relative overflow-hidden">
        
          
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-[80px]" />
        
          {/* profile */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-wide">
              ADMIN PROFILE
            </h2>
        
            {/* <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2">
              <FontAwesomeIcon icon="pen" />
              Edit
            </button> */}
            
          </div>
        
          {/* Profile */}
          <div className="flex items-center flex-row justify-between">
              <div className="flex items-center gap-4">
        
            <div className="w-12 h-12 rounded-full bg-[var(--violet)] flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
        
            <div>
              <p className="font-semibold text-[var(--text-primary)]">John Doe</p>
              <p className="text-xs text-[var(--text-secondary)]">codex@gmail.com</p>
            </div>
             
          </div>
          <button 
                    className='px-6 py-3 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2'>
                      <FontAwesomeIcon icon="edit" />
                      Edit Profile
                  </button>
          </div>

</div>

  
        {/* Controls */}
        <div className="flex items-center justify-between mb-5 mt-10">
            <div className="flex gap-3">

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
          <button
                    onClick={() => setshowRegisterPopup(true)}
                    className="px-6 py-3 text-white text-sm rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon="plus" />
                    Register New Admin
                  </button>
        </div>
              <p className="text-xs text-[var(--text-secondary)] font-semibold mb-5">
                      Showing {filtered.length} admin{filtered.length !== 1 ? "s" : ""}
                  </p>
        {/* User Table */}
<div className="flex-1 overflow-y-auto bg-[var(--secondary-bg)] rounded-xl border border-[var(--text-secondary)]/10 relative">
  <table className="w-full text-sm table-fixed">

    {/* Header */}
    <thead>
      <tr className="border-b border-[var(--text-secondary)]/10 bg-gray-500/10 sticky top-0 z-10">
        <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[var(--text-secondary)] w-[30%]">
          Admin
        </th>
        <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[var(--text-secondary)] w-[30%]">
          Email
        </th>
        <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[var(--text-secondary)] w-[20%]">
          Joined
        </th>
        <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[var(--text-secondary)] w-[20%]">
          Status
        </th>
      </tr>
    </thead>

    {/* Body */}
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
              background: selected?.id === u.id ? "var(--primary-bg)" : "",
            }}
          >

            {/* Admin */}
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--violet)] flex items-center justify-center text-white font-bold text-xs">
                  {u.name.split(" ").map(w => w[0]).join("")}
                </div>
                <span className="font-semibold text-[var(--text-primary)]">
                  {u.name}
                </span>
              </div>
            </td>

            {/* Email */}
            <td className="px-5 py-4 text-[var(--text-secondary)] font-mono text-xs truncate">
              {u.email}
            </td>

            {/* Joined Date */}
            <td className="px-5 py-4 text-[var(--text-secondary)] text-xs">
              {u.joined
                ? new Date(u.joined).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </td>

            {/* Status */}
            <td className="px-5 py-4">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  u.status === "Active"
                    ? "bg-[#22c55e20] text-[#22c55e]"
                    : "bg-[#ef444420] text-[#ef4444]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    u.status === "Active"
                      ? "bg-[#22c55e]"
                      : "bg-[#ef4444]"
                  }`}
                />
                {u.status}
              </span>
            </td>

          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  </table>
</div>
  
      </div>
    );
  }


export default AdminManagement
