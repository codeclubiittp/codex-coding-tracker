import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export default function Homepagemain({
    dashCards,
    platformProgress,
    recentActivity,
    upcomingContests,
    activeTheme
})  {
 const [user, setUser] = useState(null);
  const [error, setError] = useState("");


 const handle= "Jamshed11";
    const handleConnect = async () => {
    if (!handle) return;

    setError("");
    setUser(null);

    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const data = await res.json();

      if (data.status === "OK") {
        setUser(data.result[0]);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className='inner-part overflow-y-auto scroll-auto h-full px-8 py-8'>
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
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className='text-5xl font-extrabold tracking-tight text-[var(--text-primary)]'>
                                    Welcome Back, Coding Wizard!👋
                                </h1>
                                <h4 className='text-[var(--text-secondary)] text-lg mt-3 font-medium'>
                                    Ready to level up your coding skills? Let's see how you're progressing.
                                </h4>
                            </div>
                            {/* <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                <FontAwesomeIcon icon="plus" />
                                New Submission
                            </button> */}
                        </div>
                    </div>
    
                    {/* dash cards */}
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                        {dashCards.map((item) => (
    
                            <div
                                key={item.title}
                                className="card p-6 rounded-xl hover:shadow-lg transition-all relative overflow-hidden"
                                style={{ backgroundColor: activeTheme === "night" ? item.bgDark : item.bg }}
                            >
    
                                {/* Blob */}
                                <div
                                    className="absolute -top-20 -right-10 h-50 w-50 blob"
                                    style={{ backgroundColor: activeTheme === "night" ? item.blobBgDark : item.blobBg }}
                                />
    
                                {/* Top Section */}
                                <div className='flex justify-between items-start mb-4 relative z-10'>
    
                                    <div
                                        className="text-white p-3 rounded-xl"
                                        style={{ backgroundColor: activeTheme === "night" ? item.iconBgDark : item.iconBg }}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className='text-2xl shadow-[rgba(0,0,0,0.16)_0px_1px_4px]'
                                        />
                                    </div>
    
                                    <div className='bg-white/40 px-3 py-1 rounded-3xl text-xs text-black'>
                                        {item.remark}
                                    </div>
    
                                </div>
    
                                {/* Card Content */}
                                <span className='text-[var(--text-secondary)] text-sm block'>{item.title}</span>
                                <span className='font-bold text-3xl'>{item.output}</span>
    
                            </div>
    
                        ))}
                    </div>
    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 w-full">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Platform Progress Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                                        <FontAwesomeIcon icon="chart-line" className="text-purple-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold tracking-tight">Platform Progress</h2>
                                    </div>
                                    <p className="text-[var(--text-secondary)]">4 Platform Connected</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    {platformProgress.map((item)=> (
                                        <div className="platform-card flex flex-col py-5 px-6 rounded-lg gap-8 relative overflow-hidden" style={{ backgroundColor: activeTheme === "night" ? item.bgDark : item.bg }}>
                                             <div
                                    className="absolute -top-20 -right-25 h-50 w-50 blob"
                                    style={{ backgroundColor: activeTheme === "night" ? item.blobBgDark : item.blobBg }}
                                />
                                            <div className="flex flex-row items-center justify-between z-10">
                                               
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="flex p-3 rounded-lg" style={{ backgroundColor: activeTheme === "night" ? item.iconBgDark : item.iconBg }}>
                                                        <FontAwesomeIcon icon={item.icon} className='text-white text-2xl' />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-lg block leading-none">{item.platform}</span>
                                                        <span className="text-[var(--text-secondary)] text-[13px] leading-0">@codeproiittp</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center gap-3">  
                                                    <p className='py-0.5 px-3 text-[13px] bg-white/40 border border-mist-300 rounded-xl'>Knight</p>
                                                    <FontAwesomeIcon icon="share" className='text-gray-400' />
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center justify-around">
                                                <div className="flex flex-col">
                                                    <span className='text-2xl font-semibold text-emerald-500 leading-none'>95</span>
                                                    <span className='text-sm text-[var(--text-secondary)]'>Easy</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className='text-2xl font-semibold text-amber-600 leading-none'>142</span>
                                                    <span className='text-sm text-[var(--text-secondary)]'>Medium</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className='text-2xl font-semibold text-red-700 leading-none'>50</span>
                                                    <span className='text-sm text-[var(--text-secondary)]'>Hard</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between flex-row mt-1 text-sm">
                                                    <p>Overall Progress</p>
                                                    <span className='font-semibold'>156</span>
                                                </div>
                                                <div className="loader">
                                                    <div className="bg-white h-3 w-full rounded-xl overflow-hidden">
                                                        <div className={`${activeTheme ==="day" ? "bg-black" : "bg-[#3039b5]"} h-full w-[65%]`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2.5'>
                                                <div className="flex justify-between flex-row py-3 px-5 bg-[var(--primary-bg)] rounded-lg">
                                                    <p className='text-md'>Current Rating</p>
                                                    <div>
                                                        <FontAwesomeIcon icon="arrow-trend-up" className='text-green-600'/>
                                                        <span className='font-semibold ml-1.5'>1840</span>
                                                    </div>
                                                </div>
                                                {/* <div className="flex justify-between flex-row py-3 px-5 bg-[var(--primary-bg)] rounded-lg">
                                                    <p className='text-md'>Current Rating</p>
                                                    <div>
                                                        <FontAwesomeIcon icon="arrow-trend-up" className='text-green-600'/>
                                                        <span className='font-semibold ml-1.5'>1840</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between flex-row py-3 px-5 bg-[var(--primary-bg)] rounded-lg">
                                                    <p className='text-md'>Current Rating</p>
                                                    <div>
                                                        <FontAwesomeIcon icon="arrow-trend-up" className='text-green-600'/>
                                                        <span className='font-semibold ml-1.5'>1840</span>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <button onClick={handleConnect} className='p-2 px-5  w-full border rounded-md bg-[var(--success)] text-white'>
                                                    Connect
                                                </button>

                                               {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <h3>{user.handle}</h3>
          <p>Rating: {user.rating || "Unrated"}</p>
          <p>Rank: {user.rank}</p>
          <p>Max Rating: {user.maxRating}</p>
          <img src={user.avatar} alt="avatar" width="80" />
        </div>
      )}
                                            </div>
    
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* streak data */}
    
                            {/* Recent Activity Section */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                                        <FontAwesomeIcon icon="history" className="text-purple-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
                                </div>
                                <div className="bg-[var(--secondary-bg)]/40 backdrop-blur-sm rounded-2xl border border-gray-200/5 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-800/40 border-b border-gray-200/5">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Problem Name</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Platform</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Difficulty</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Time Ago</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200/5">
                                            {recentActivity.map((activity) => (
                                                <tr key={activity.id} className="hover:bg-blue-500/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{activity.problem}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-medium text-gray-400">{activity.platform}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                            activity.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                                            activity.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                                                            'bg-red-500/10 text-red-500 border border-red-500/20'
                                                        }`}>
                                                            {activity.difficulty}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)]">
                                                        {activity.time}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
    
                        {/* Sidebar Components */}
                        <div className="space-y-8">
                            {/* Upcoming Contests */}
                            <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-gray-200/5 shadow-md relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full"></div>
                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <FontAwesomeIcon icon="trophy" className="text-orange-500" />
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight">Upcoming Contests</h2>
                                </div>
                                <div className="space-y-4 relative z-10">
                                    {upcomingContests.map((contest) => (
                                        <div key={contest.id} className="p-4 rounded-xl bg-white border border-gray-200/5 hover:border-blue-500/30 transition-all group/item">
                                            <h3 className="font-bold text-sm mb-2 group-hover/item:text-blue-400 transition-colors">{contest.name}</h3>
                                            <div className="flex justify-between items-center">
                                                <div className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-black uppercase">
                                                    {contest.platform}
                                                </div>
                                                <span className="text-[10px] text-[var(--text-secondary)] font-bold">{contest.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest border bg-white border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-all hover:border-blue-500/50">
                                    Global schedule
                                </button>
                            </div>
    
                            {/* Quick Stats / Achievements */}
                            <div className="bg-white/30 p-6 rounded-2xl border border-gray-200/5 shadow-md">
                                 <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                        <FontAwesomeIcon icon="award" className="text-yellow-500" />
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight">Achievements</h2>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="aspect-square rounded-xl bg-white border border-gray-200/5 flex items-center justify-center group hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all cursor-pointer">
                                            <FontAwesomeIcon icon="medal" className="text-gray-600 group-hover:text-yellow-500 transition-colors text-xl" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
  )
}
