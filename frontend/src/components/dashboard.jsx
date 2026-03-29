import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from './Logo';
import Homepagemain from './homepagemain';
import Analytics from './Analytics';
import Interview from './Interview';

import { motion, AnimatePresence } from "framer-motion";


library.add(fas, fab);

const Homepage = ({ onLogout }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [activeTheme, setActiveTheme] = useState("day");

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

    useEffect(() => {
  document.documentElement.setAttribute("data-theme", activeTheme);
}, [activeTheme]);

    const navItems = [
        { name: 'Dashboard', icon: 'home' },
        { name: 'Progress Analytics', icon: 'chart-line' },
        { name: 'Interview Hub', icon: 'users' },
        { name: 'Contest Rooms', icon: 'trophy' },
        { name: 'ML Recommendations', icon: 'brain' },
    ];

    // const dashCards = [
    //     { title: 'Problems Solved' , icon: 'bullseye', output: '605', remark: '+12 this week', bg:'#F5F3FF' , iconBg:'#683FE6', blobBg:'#E9E0FD'},
    //     { title: 'Current Streak' , icon: 'fire', output: '14 days', remark: ' Keep it up!', bg:'#FEF5F0' , iconBg:'#EB5F2E', blobBg:'#FDE4DF'},
    //     { title: 'Skill Rating' , icon: 'award', output: '1798', remark: '+85 points', bg:'#EEFDF8' , iconBg:'#08B892', blobBg:'#D9F7EF'},
    //     { title: 'Best Streak' , icon: 'chart-line', output: '28 days', remark: 'Personal best', bg:'#EDFAFF' , iconBg:'#2690F6', blobBg:'#E4F7FE'},
    // ];

    const dashCards = [
    { 
        title: 'Problems Solved', 
        icon: 'bullseye', 
        output: '605', 
        remark: '+12 this week', 
        bg: '#F5F3FF', 
        iconBg: '#683FE6', 
        blobBg: '#E9E0FD',
        // Dark Theme Additions
        bgDark: '#1E1B4B',     
        iconBgDark: '#818CF8',  
        blobBgDark: '#312E81'   
    },
    { 
        title: 'Current Streak', 
        icon: 'fire', 
        output: '14 days', 
        remark: 'Keep it up!', 
        bg: '#FEF5F0', 
        iconBg: '#EB5F2E', 
        blobBg: '#FDE4DF',
        // Dark Theme Additions
        bgDark: '#2D1A12',      
        iconBgDark: '#FB923C',  
        blobBgDark: '#43210E'   
    },
    { 
        title: 'Skill Rating', 
        icon: 'award', 
        output: '1798', 
        remark: '+85 points', 
        bg: '#EEFDF8', 
        iconBg: '#08B892', 
        blobBg: '#D9F7EF',
        // Dark Theme Additions
        bgDark: '#062C25',      
        iconBgDark: '#34D399',  
        blobBgDark: '#064E3B'   
    },
    { 
        title: 'Best Streak', 
        icon: 'chart-line', 
        output: '28 days', 
        remark: 'Personal best', 
        bg: '#EDFAFF', 
        iconBg: '#2690F6', 
        blobBg: '#E4F7FE',
        // Dark Theme Additions
        bgDark: '#0C2338',      
        iconBgDark: '#60A5FA',  
        blobBgDark: '#172554'   
    },
];

   const platformProgress = [
    { 
        platform: 'Codeforces', 
        solved: 80, 
        total: 2000, 
        color: '#1F8ACB', 
        icon: 'terminal',
        bg: '#EEFDF8', 
        iconBg: '#08B892', 
        blobBg: '#D9F7EF',
        // Dark Theme Additions
        bgDark: '#0A252E',     
        iconBgDark: '#38BDF8',  
        blobBgDark: '#083344'   
    },
    { 
        platform: 'CodeChef', 
        solved: 60, 
        total: 1000, 
        color: '#5B4638', 
        icon: 'utensils',
        bg: '#EDFAFF', 
        iconBg: '#2690F6', 
        blobBg: '#E4F7FE',
        // Dark Theme Additions
        bgDark: '#241B15',      
        iconBgDark: '#A18072',  
        blobBgDark: '#3E2C23'   
    },
    { 
        platform: 'LeetCode', 
        solved: 450, 
        total: 3000, 
        color: '#FFA116', 
        icon: ['fab', 'leetcode'], 
        bg: '#F5F3FF', 
        iconBg: '#683FE6', 
        blobBg: '#E9E0FD',
        // Dark Theme Additions
        bgDark: '#2B1A05',     
        iconBgDark: '#FBBF24',  
        blobBgDark: '#452E13'  
    },
    { 
        platform: 'GeeksforGeeks', 
        solved: 150, 
        total: 1500, 
        color: '#2F8D46', 
        icon: 'code',
        bg: '#FEF5F0', 
        iconBg: '#EB5F2E', 
        blobBg: '#FDE4DF',
        // Dark Theme Additions
        bgDark: '#062D17',      
        iconBgDark: '#4ADE80',  
        blobBgDark: '#05441F'  
    },
];

    const recentActivity = [
        { id: 1, platform: 'LeetCode', problem: 'Two Sum', difficulty: 'Easy', time: '2 hours ago' },
        { id: 2, platform: 'Codeforces', problem: 'A. Watermelon', difficulty: 'Easy', time: '5 hours ago' },
        { id: 3, platform: 'GeeksforGeeks', problem: 'Missing Number', difficulty: 'Medium', time: '1 day ago' },
    ];

    const upcomingContests = [
        { id: 1, name: 'Biweekly Contest 125', platform: 'LeetCode', date: 'Sat, Mar 16, 8:00 PM' },
        { id: 2, name: 'Codeforces Round 930 (Div. 2)', platform: 'Codeforces', date: 'Sun, Mar 17, 4:35 PM' },
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
                        <Logo size="md"/>
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
                <header className="flex justify-between items-center bg-[var(--secondary-bg)] p-4 px-20 sticky top-0 z-50 ">
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
                        <button className="relative w-10 h-10 rounded-xl bg-gray-600/10 flex items-center justify-center hover:bg-gray-600/20 transition-all">
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




                <div className='inner-main py-3 rounded-tl-2xl bg-[var(--primary-bg)] flex-1 min-h-0 overflow-auto'>
  <AnimatePresence mode="wait">

    {activeItem === "Dashboard" && (
      <motion.div
        key="dashboard"
        initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
       <Homepagemain 
    dashCards={dashCards}
    platformProgress={platformProgress}
    recentActivity={recentActivity}
    upcomingContests={upcomingContests}
    activeTheme={activeTheme}
/>
      </motion.div>
    )}

    {activeItem === "Progress Analytics" && (
      <motion.div
        key="analytics"
        initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Analytics />
      </motion.div>
    )}

    {activeItem === "Interview Hub" && (
      <motion.div
        key="interview"
        initial={{ rotate: -4, scale: 0.96, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 4, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Interview />
      </motion.div>
    )}

  </AnimatePresence>
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

export default Homepage;