import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

const Input = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex items-center border w-full focus-within:border-[var(--violet)] transition duration-300 pr-3 gap-2 bg-[var(--secondary-bg)] border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
      <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl ml-3" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-full pl-1 outline-none placeholder-gray-500 text-sm"
      />

      {(type === "password" || type === "text") && (
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon
            icon={showPassword ? "eye" : "eye-slash"}
            className="text-gray-500 text-xl mr-2"
          />
        </button>
      )}

      {/* <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl" /> */}
    </div>
  );
};

function CodingContestArea({ setActiveItem, activeTheme }) {
  return (
    <div className="inner-part overflow-y-auto scroll-auto h-full px-8 py-8 relative w-full">
      <img
        src="/assets/blob.gif"
        className={`absolute mx-auto inset-0 top-15 z-0 w-200 ${activeTheme === "day" ? "[filter:invert(85%)_sepia(95%)_saturate(1000%)_hue-rotate(3deg)_brightness(105%)_contrast(105%)]" : "[filter:hue-rotate(70deg)_brightness(0.2)_saturate(1.2)_contrast(120%)]"}`}
      />
      {/* head part -titles */}
      <div className="flex flex-col mb-10 z-10">
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
        <div className="flex justify-between items-start flex-col z-10">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text-primary)] z-10">
              Ready to Compete?
            </h1>
            <h4 className="text-[var(--text-secondary)] text-md mt-3 font-medium z-10">
              Lets have a comeptition with other fellows.
            </h4>
          </div>

          <div className="contest-enter-area flex w-full overflow-auto py-12 items-center justify-center flex-col mt-30">
            <div className="z-10 w-full flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Join A Contest
              </h1>
              <div className="flex mt-8 w-full items-center justify-center">
                <form action="" noValidate className="w-[35%]">
                  <div className="div-group mb-3 w-full">
                    <Input
                      type=""
                      placeholder="Contest RoomID"
                      icon="home"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="div-group mb-3">
                    <Input
                      type="password"
                      placeholder="Contest Room Password"
                      icon="lock"
                    />
                  </div>
                  <input
                    type="submit"
                    value="Join the Contest"
                    className="bg-[var(--violet)] text-[#fff] cursor-pointer py-2.5 px-6 block w-full rounded-[5px] mb-4 hover:bg-[var(--hoverb)]"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col mt-20">
            <h1 className="text-4xl font-extrabold">
              Previosly competed Contests
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {Array.from({ length: 6 }).map((_, i) => (
              <div className="cursor-pointer group relative overflow-hidden bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10 rounded-2xl p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
                <div className="flex items-center justify-center mb-8 relative">
                    <div className="flex w-12 h-12 items-center justify-center p-2 text-2xl rounded-[50%] text-white bg-[#3460a7] font-semibold border border-[var(--text-secondary)]/5">
                        <FontAwesomeIcon icon="a" />
                    </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-red-800 transition-all group-hover:scale-110">
                    <FontAwesomeIcon icon="bolt" />
                  </div>
                  <div className="flex w-12 h-12 items-center justify-center p-2 text-2xl rounded-[50%] text-white bg-[#5d33b9] font-semibold border border-[var(--text-secondary)]/5">
                        <FontAwesomeIcon icon="m" />
                    </div>
                  <div className="absolute top-0 right-0 text-lg uppercase tracking-widest font-black px-2 py-1 rounded-md bg-green-400/10 text-yellow-400">
                    <FontAwesomeIcon icon="trophy" />
                  </div>

                </div>
                <h3 className="text-xl font-bold mb-1 text-[var(--text-primary)]">
                  Golden Jubilee
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  12 January 2026, 12:30PM - 2:30PM
                </p>

                <div className="flex flex-wrap gap-2">
                  <span
                    key="topic1"
                    className="text-[10px] px-2 py-1 rounded bg-[var(--primary-bg)] text-[var(--text-secondary)] font-semibold border border-[var(--text-secondary)]/5"
                  >
                    Friendly Competition
                  </span>
                  <span
                    key="topic2"
                    className="text-[10px] px-2 py-1 rounded bg-[var(--primary-bg)] text-[var(--text-secondary)] font-semibold border border-[var(--text-secondary)]/5"
                  >
                    Array
                  </span>
                </div>
              </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col mt-20">
            <h1 className="text-4xl font-extrabold">
              Do you wanna practice more?
            </h1>
            <p className="mt-3">Let's Practice through Codex Website..</p>
            <button 
        onClick={() => setActiveItem("Code Editor")}
        className='px-6 py-3 mt-4 w-50 text-white rounded-md bg-[var(--success)] transition-all cursor-pointer flex items-center gap-2'>
          <FontAwesomeIcon icon="computer" />
          Code Editor
      </button>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default CodingContestArea;
