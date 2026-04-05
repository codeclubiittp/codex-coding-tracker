import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from '../Logo';

import { motion, AnimatePresence } from "framer-motion";
import Overview from './Overview';
import UsersTable from './UsersTable';
import ContestManager from './ContestManager';
import ComingSoon from '../ComingSoon';
import AdminManagement from './AdminManagement';

library.add(fas, fab);


// Mock Data 
const MOCK_USERS = [
    { id: 1, name: 'abc jio',       email: 'abc@gmail.com',    joined: '2025-11-14', status: 'Active',    leetcode: 'arjun_lc',   codeforces: 'arjun_cf',   lc_solved: 312, cf_rating: 1487, streak: 21 },
    { id: 2, name: 'bcd lpp',        email: 'bcd@gmail.com',    joined: '2025-12-01', status: 'Active',    leetcode: 'priya_lc',   codeforces: null,          lc_solved: 189, cf_rating: null, streak: 7  },
    { id: 3, name: 'def',        email: 'def@gmail.com',   joined: '2026-01-08', status: 'Active',    leetcode: 'shanid_lc',  codeforces: 'shanid_cf',   lc_solved: 450, cf_rating: 1712, streak: 34 },
    { id: 4, name: 'efg',       email: 'efg@gmail.com',    joined: '2026-02-14', status: 'Banned',  leetcode: null,          codeforces: 'rahul_cf',    lc_solved: 0,   cf_rating: 1120, streak: 0  },
    { id: 5, name: 'hij',          email: 'hij@gmail.com',     joined: '2026-02-20', status: 'Active',    leetcode: 'zara_lc',    codeforces: 'zara_cf',     lc_solved: 278, cf_rating: 1560, streak: 14 },
    { id: 6, name: 'jkl',         email: 'jkl@gmail.com',      joined: '2026-03-01', status: 'Active',    leetcode: 'dev_lc',     codeforces: null,          lc_solved: 95,  cf_rating: null, streak: 5  },
    { id: 7, name: 'lmn',      email: 'lmn@gmail.com',    joined: '2026-03-05', status: 'Banned',    leetcode: null,          codeforces: null,          lc_solved: 0,   cf_rating: null, streak: 0  },
    { id: 8, name: 'nop',       email: 'nop@gmail.com',    joined: '2026-03-18', status: 'Active',    leetcode: 'kiran_lc',   codeforces: 'kiran_cf',    lc_solved: 621, cf_rating: 1890, streak: 55 },
];

const MOCK_CONTESTS = [
    { id: 1, name: 'Spring Blitz',       platform: 'LeetCode',   duration: 90,  startTime: '2026-04-05T14:00', participants: 24, status: 'Upcoming' },
    { id: 2, name: 'CF Weekly Round',    platform: 'Codeforces', duration: 120, startTime: '2026-04-02T20:35', participants: 41, status: 'Live'     },
    { id: 3, name: 'April Warmup',       platform: 'LeetCode',   duration: 60,  startTime: '2026-03-30T18:00', participants: 18, status: 'Ended'    },
    { id: 4, name: 'DSA Challenge I',    platform: 'Internal',   duration: 180, startTime: '2026-03-28T10:00', participants: 33, status: 'Ended'    },
];



const AdminDashboard = ({ onLogout, dashboardData, onRefresh }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [activeTheme, setActiveTheme] = useState("day");
    const [activeNotBar, setActiveNotBar] = useState(false);

    const logout = async () => {
        try {
            await fetch("http://localhost:8000/logout", {
                method: "POST",
                credentials: "include"
            });

            onLogout();
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleTheme = () => {
        setActiveTheme(prev => (prev === "day" ? "night" : "day"));
    };

    const handleNotBar = ()=>{
        setActiveNotBar(prev => (prev === true ? false : true));
        console.log(activeNotBar);
    }
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", activeTheme);
    }, [activeTheme]);

    const navItems = [
        { name: 'Overview',          icon: 'home'       },
        { name: 'Users', icon: 'chart-line' },
        { name: 'Contests',      icon: 'users'      },
        {name: 'Admin Management', icon: 'user-gear'}
    ];

    

    return (
        <div className="flex h-screen overflow-hidden bg-[#fff] text-[var(--text-primary)] font-sans w-full">
            <aside className={`${isSidebarOpen ? 'w-70' : 'w-22'} bg-[var(--secondary-bg)] h-screen sticky flex flex-col justify-between transition-all duration-300 overflow-hidden`}>

                {/* Logo Section */}
                {/* border-b border-gray-200  */}
                <div className={`flex flex-col items-center justify-center ${isSidebarOpen ? 'px-6' : 'px-2'} h-24 gap-3 
                 border-[var(--text-secondary)]
                transition-all duration-300`}>
                    <div className="rounded-lg flex gap-2 items-center justify-center">
                        {/* <Logo className={isSidebarOpen ? "h-10" : "h-8"} showText={isSidebarOpen} /> */}
                        {/* <img src='assets/google.svg' className='w-10 h-10'/> */}
                        <Logo size="md" />
                        <div className="flex flex-col">
                            {isSidebarOpen && <h2 className='text-2xl font-bold tracking-tight'>Codex</h2>}
                            {isSidebarOpen && <span className='text-[var(--text-secondary)] text-[15px] -mt-1.5 font-medium whitespace-nowrap'>Pro Dashboard</span>}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={`flex-1 py-6 ${isSidebarOpen ? 'px-5' : 'px-3'} space-y-2 transition-all duration-300 `}>
                    <span className={`${isSidebarOpen ? 'opacity-100' : 'opacity-100 text-center'} text-gray-400 text-sm font-semibold transition-opacity duration-300 block mb-2 px-4`}>
                        {isSidebarOpen ? ("NAVIGATION") : (<FontAwesomeIcon icon="layer-group" />)}
                    </span>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveItem(item.name)}
                            className={`btn w-full flex items-center ${isSidebarOpen ? 'justify-start px-4 gap-4' : 'justify-center'} rounded-lg 
                            transition-all group h-12 
                            ${activeItem === item.name ? "bg-[#1f2937] text-blue-400" : "hover:bg-[#1C2128] hover:text-blue-400"}
                            `
                            }
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className={`text-lg w-9 flex-shrink-0 
                                    ${activeItem === item.name ? "scale-130" : "scale-100"}`}

                            />
                            {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                        </button>
                    ))}
                </nav>


                {/* Sidebar Footer */}
                <div className="p-4 border-t border-t border-[var(--text-secondary)] justify-self-end">
                    {/* <button >Logout</button> */}
                    <button
                        onClick={logout}

                        className={`btn w-full flex items-center ${isSidebarOpen ? 'justify-start px-4 gap-4' : 'justify-center'} rounded-lg 
                        transition-all group h-12 
                         hover:bg-[#1C2128] hover:text-blue-400
                        `
                        }
                    >
                        <FontAwesomeIcon
                            icon="right-from-bracket"
                            className={`text-lg w-9 flex-shrink-0 
                                 scale-100`}

                        />
                        {isSidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-[#1C2128] text-[#8B949E] transition-colors"
                    >
                        <FontAwesomeIcon icon={isSidebarOpen ? 'chevron-left' : 'chevron-right'} />
                    </button>
                </div>

            </aside>
            <main className='flex-1 h-screen flex flex-col bg-[var(--secondary-bg)]'>

                {/* Top Header Bar */}
                <header className={`flex justify-between items-center bg-[var(--secondary-bg)] p-4 px-20 sticky top-0 z-50 
                ${activeNotBar 
        ? "after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-[23rem] after:h-[10px] after:transition-opacity after:duration-300 after:shadow-[0_7px_10px_0_rgba(0,0,0,0.1),0_8px_5px_-5px_rgba(0,0,0,0.05)] after:z-[45]" 
        : ""}
                
                `}>
                    <div className="flex items-center gap-4 bg-gray-600/10 px-4 py-2 rounded-xl border border-gray-200/5 w-96">
                        <FontAwesomeIcon icon="search" className="text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            placeholder="Search problems, contests, or users..."
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className='flex gap-4'>
                            <button onClick={handleTheme} className="relative w-10 h-10 rounded-xl bg-gray-600/10 flex items-center justify-center hover:bg-gray-600/20 transition-all">
                                <FontAwesomeIcon icon="sun" className="text-[var(--text-secondary)]" />
                                {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--primary-bg)]"></span> */}
                            </button>
                            <button onClick={handleNotBar}  className="relative w-10 h-10 rounded-xl bg-gray-600/10 flex items-center justify-center hover:bg-gray-600/20 transition-all">
                                <FontAwesomeIcon icon="bell" className="text-[var(--text-secondary)]" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--primary-bg)]"></span>
                            </button>
                        </div>
                        <div className="h-8 w-px bg-gray-200/10"></div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:block">
                                <h4 className="text-sm font-bold">John Doe</h4>
                                <p className="text-[10px] text-[var(--text-secondary)] font-medium tracking-wider uppercase">Pro Member</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[var(--violet)] flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                                JD
                            </div>

                        </div>

                    </div>
                </header>




                <div className='inner-main py-3 rounded-tl-2xl bg-[var(--primary-bg)] flex-1 min-h-0 overflow-auto relative'>
                    <AnimatePresence mode="wait">

                        {activeItem === "Overview" && (
                            <motion.div
                                key="overview"
                                initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                <ComingSoon setActiveItem={setActiveItem} />
                            </motion.div>
                        )}

                        {activeItem === "Users" && (
                            <motion.div
                                key="users"
                                initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                <UsersTable setActiveItem={setActiveItem} mockUsers={MOCK_USERS} mockContests={MOCK_CONTESTS}/>
                            </motion.div>
                        )}

                        {activeItem === "Contests" && (
                            <motion.div
                                key="contests"
                                initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                <ContestManager setActiveItem={setActiveItem} mockUsers={MOCK_USERS} mockContests={MOCK_CONTESTS} />
                            </motion.div>
                        )}

                        {activeItem === "Admin Management" && (
                            <motion.div
                                key="adminManagement"
                                initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                <AdminManagement setActiveItem={setActiveItem} mockUsers={MOCK_USERS} mockContests={MOCK_CONTESTS} />
                            </motion.div>
                        )}
                    

                    </AnimatePresence>
                </div>

                <div className={` ${activeNotBar ? 'translate-0' : 'translate-x-200'} transition-all duration-300 flex fixed h-screen top-0 right-0 w-90 z-40 bg-[var(--secondary-bg)]`}>
                    <div className={`flex w-full h-full items-center justify-center flex-col ${activeTheme == "day" ? 'text-gray-400' : "text-gray-800"}`}>
                        <FontAwesomeIcon icon="bell" className='text-8xl '/>
                        <p className="mt-5 text-lg ">No New Notifications</p>
                    </div>
                </div>



                {/* <div className='inner-main py-3 rounded-tl-2xl bg-[var(--primary-bg)] flex-1 min-h-0'>
                    {activeItem === "Dashboard" && 
                    <Homepagemain 
    dashCards={dashCards}
    platformProgress={platformProgress}
    recentActivity={recentActivity}
    upcomingContests={upcomingContests}
/>}
                    {activeItem === "Progress Analytics" && <Analytics />}
                    {activeItem === "Interview Hub" && <Interview />}
                </div> */}
            </main>
        </div>
    );
}

export default AdminDashboard;