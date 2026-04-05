import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

library.add(fas, fab);

export default function Analytics({ setActiveItem }) {
  return (
    <div className="inner-part overflow-y-auto scroll-auto h-full px-8 py-8">
      {/* head part -titles */}
      <div className="flex flex-col mb-10">
        <div className="text-[var(--text-secondary)] mb-2">
          <p className="text-sm font-medium tracking-wide">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Your Journey So Far!!
            </h1>
            <h4 className="text-[var(--text-secondary)] text-md mt-3 font-medium">
              Analyse you skills and progress
            </h4>
          </div>
        </div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-10">



<motion.div 
            whileHover={{ y: -5 }}
            className="w-full group relative bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          {/* Subtle decorative yellow glow on hover */}
          {/* <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
          
          <div className=" mb-6 relative z-10 w-full text-center">
            <h3 className="text-4xl font-black text-[var(--text-primary)]">Target Your Opportunities.</h3>
            <p className="text-sm text-gray-500 mt-4">Analyze previously managed contests and find companies that match your performance metrics.</p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-5">
              {/* <div className="text-8xl text-yellow-500 opacity-20 mb-6 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700">
                  <FontAwesomeIcon icon="building" />
              </div> */}
              <button
          onClick={() => setActiveItem("Company Insights")}
          className="px-6 py-3 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2"
        >
          <FontAwesomeIcon icon="city" />
          Check Companies
        </button>
          </div>
        </motion.div>




        <motion.div 
            whileHover={{ y: -5 }}
            className="group relative bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          {/* Subtle decorative red glow on hover */}
          {/* <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-red-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
          
          <div className=" mb-6 relative z-10 w-full text-center">
            <h3 className="text-4xl font-black text-[var(--text-primary)]">Code at Elite Speed.</h3>
            <p className="text-sm text-gray-500 mt-4 ">Access your personalized virtual collaborative arena. Ensure Camera & Mic access before proceeding.</p>
          </div>


          <div className="flex flex-col items-center justify-center flex-1 py-5">
              {/* <div className="text-8xl text-red-600 opacity-20 mb-6 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700">
                  <FontAwesomeIcon icon="code" />
              </div> */}
              <button onClick={() => setActiveItem("Code Editor")} className='px-6 py-3 mt-8 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2'> <FontAwesomeIcon icon="laptop-code" /> Code Editor </button>
          </div>
        </motion.div>

     
</div>
    </div>
  );
 }
