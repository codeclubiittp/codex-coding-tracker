import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

library.add(fas, fab);

function Settings() {
  return (
    <div className="p-8 h-full overflow-y-auto space-y-8">

      {/* head part -titles */}
      <div className="flex flex-col mb-10">
        <div className="text-[var(--text-secondary)] mb-2">
          <p className="text-sm font-medium tracking-wide">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>
        <div>
          <h1 className='text-5xl font-extrabold tracking-tight text-[var(--text-primary)]'>
            Settings
          </h1>
          <h4 className='text-[var(--text-secondary)] text-md mt-3 font-medium'>
            Controls and About Us
          </h4>
        </div>
      </div>

      {/*USer Profile Section */}
<div className="bg-[var(--secondary-bg)] rounded-2xl p-6 border border-[var(--text-secondary)]/10 relative overflow-hidden">

  
  {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-[80px]" /> */}

  {/* profile */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-wide">
      USER PROFILE
    </h2>

    {/* <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2">
      <FontAwesomeIcon icon="pen" />
      Edit
    </button> */}
    
  </div>

  {/* Profile */}
  <div className="flex items-center flex-row justify-between mb-6">
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


  {/* Platforms */}
  <div className="space-y-3">
    {[
      { name: "LeetCode", username: "shanid_lc", color: "#FFA116" ,icon:['fab', 'leetcode']},
      { name: "Codeforces", username: "shanid_cf", color: "#1F8ACB" ,icon: 'terminal',},
      { name: "GeeksforGeeks", username: "shanid_gfg", color: "#2F8D46", icon: 'code'},
      { name: "CodeChef", username: "shanid_cc", color: "#A0522D", icon: 'utensils'},
    ].map((p, i) => (
      <div
        key={i}
        className="flex items-center justify-between p-3 rounded-xl bg-[var(--primary-bg)] border border-[var(--text-secondary)]/10"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: p.color + "20", color: p.color }}
          >
            <FontAwesomeIcon icon={p.icon} />
          </div>

          <div>
            <p className="text-xs font-bold text-[var(--text-primary)]">
              {p.name}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)]">
              @{p.username || "Not Connected"}
            </p>
          </div>
        </div>

        <button className="text-[10px] px-3 py-1 rounded-lg font-bold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all">
          Disconnect
        </button>
      </div>
    ))}
  </div>
</div>

      {/* REport an Issue Section */}
<div className="bg-[var(--secondary-bg)] rounded-2xl p-6 border border-[var(--text-secondary)]/10">

  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5 tracking-wide">
    REPORT AN ISSUE
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Issue Title"
      className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    />

    <select className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/20 rounded-lg px-4 py-2 text-sm appearance">
      <option>Bug</option>
      <option>Feature Request</option>
      <option>UI Issue</option>
    </select>

    <textarea
      rows="4"
      placeholder="Describe your issue..."
      className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/20 rounded-lg px-4 py-2 text-sm resize-none"
    />

    <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-400 transition-all">
      Submit Report
    </button>
  </div>
</div>

      {/* About Section*/}
<div className="bg-[var(--secondary-bg)] rounded-2xl p-6 border border-[var(--text-secondary)]/10 relative overflow-hidden">

  
  {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[80px]" /> */}

  
  <div className="flex items-center gap-4 mb-6">
    
      <Logo />
  

    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">
        CODEX
      </h2>
      <p className="text-xs text-[var(--text-secondary)] font-medium">
        AI Assisted Coding Platform
      </p>
    </div>
  </div>


  <div className="border-t border-[var(--text-secondary)]/10 my-4" />


  <div className="flex justify-between items-center text-sm">
    <p className="text-[var(--text-secondary)]">
      Built by <span className="text-[var(--violet)] font-bold ">Digital Wizards</span>
    </p>

    <span className="text-[10px] px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-bold">
      SE & DevOps
    </span>
  </div>


  <div className="border-t border-[var(--text-secondary)]/10 my-4" />


  <div className="text-xs text-[var(--text-secondary)] flex flex-col gap-1">
    <p>© {new Date().getFullYear()} Codex. All rights reserved · Privacy Policy · Terms of Service</p>
  </div>

</div>

    </div>
  );
}

export default Settings;