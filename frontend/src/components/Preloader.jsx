import React from "react";
import Logo from "./Logo";
const Preloader = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0b121b] text-white">
       
       
      <div className="pulse-anim">
         
        <div className="spin-slow">
           
          <Logo size="lg" /> 
        </div> 
      </div> 
       
      <h1 className="mt-6 text-3xl font-semibold tracking-wide text-indigo-400">
         
        Codex 
      </h1> 
   
      <p className="mt-2 text-gray-400 text-sm fade-pulse">
         
        Initializing your coding workspace... 
      </p> 
      <div className="mt-6 w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
         
        <div className="h-full bg-indigo-500 loading-move"></div> 
      </div> 
    </div>
  );
};
export default Preloader;
