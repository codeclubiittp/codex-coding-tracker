import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

const Homepage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', icon: 'home' },
        { name: 'Progress Analtycs', icon: 'project-diagram' },
        { name: 'Interview Hub', icon: 'chart-line' },
        { name: 'Contest Rooms', icon: 'users' },
        { name: 'ML Recommendations', icon: 'shield-alt' },
    ];


    return(
        <div className="flex h-screen bg-[var(--primary-bg)] text-[var(--text-primary)] font-sans overflow-hidden">
            <aside className={`${isSidebarOpen ? 'w-70' : 'w-20'} bg-[var(--secondary-bg)] h-full flex flex-col transition-all duration-300 overflow-hidden`}>

                {/* Logo Section */}
                <div className=" flex flex-col items-center justify-center px-6 py-5 gap-3 border-b border-gray-200">
                    <div className="rounded-lg flex gap-2 items-center justify-center flex-shrink-0">
                        <img src='assets/google.svg' className='w-10 h-10'/>
                        <div className="flex flex-col">
                            {isSidebarOpen && <h2 className='text-2xl font-bold tracking-tight'>Codex</h2>}
                            {isSidebarOpen && <span className='text-[var(--text-secondary)] text-[15px] -mt-1.5 font-medium'>Pro Dashboard</span>}
                        </div>
                    </div>
                    {/* {isSidebarOpen && (
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-[#E6EDF3] bg-clip-text text-transparent">
                            Codex
                        </span>
                    )} */}
                    {/* <hr className='w-full text-gray-400 mt-2'/> */}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-7 space-y-2">
                    <span className={`${isSidebarOpen ? 'opacity-100' : 'opacity-0'} text-gray-400 text-sm font-semibold`}>NAVIGATION</span>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            
                            className="w-full flex items-center gap-4 py-3 rounded-xl transition-all group"
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className="text-lg w-9 flex-shrink-0"
                            />
                            {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                        </button>
                    ))}
                </nav>


                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#30363D] justify-self-end">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-[#1C2128] text-[#8B949E] transition-colors"
                    >
                        <FontAwesomeIcon icon={isSidebarOpen ? 'chevron-left' : 'chevron-right'} />
                    </button>
                </div>

            </aside>
            <main>

            </main>
        </div>
    );
}

export default Homepage;