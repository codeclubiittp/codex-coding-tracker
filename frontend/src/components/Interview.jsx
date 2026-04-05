import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Interview() {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--primary-bg)]">

      
      

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-[var(--secondary-bg)]/80 backdrop-blur-xl border border-[var(--text-secondary)]/10 rounded-2xl px-10 py-12 shadow-2xl flex flex-col items-center text-center max-w-md"
      >

        
        <div className="mb-4 text-[10px] px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold tracking-widest">
          AI POWERED
        </div>

        {/* Title Area */}
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight mb-3">
          Interview Arena
        </h1>

        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Simulate real coding interviews with AI-driven challenges and compete in real-time.
        </p>

        <button 
                
                className='px-6 py-3 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2'>
                  <FontAwesomeIcon icon="video" />
                  Start Interview
              </button>

      </motion.div>
    </div>
  );
}

export default Interview;