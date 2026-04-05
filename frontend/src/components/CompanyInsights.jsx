import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COMPANIES_DATA = [
  {
    id: 'google',
    name: 'Google',
    icon: ['fab', 'google'],
    color: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.1)',
    difficulty: { easy: 25, medium: 50, hard: 25 },
    topics: ['Graphs', 'Dynamic Programming', 'System Design'],
    hiring: 'High'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: ['fab', 'amazon'],
    color: '#FF9900',
    bg: 'rgba(255, 153, 0, 0.1)',
    difficulty: { easy: 30, medium: 45, hard: 25 },
    topics: ['Trees', 'Greedy', 'Object Oriented Design'],
    hiring: 'Very High'
  },
  {
    id: 'meta',
    name: 'Meta',
    icon: ['fab', 'facebook'],
    color: '#0668E1',
    bg: 'rgba(6, 104, 225, 0.1)',
    difficulty: { easy: 40, medium: 40, hard: 20 },
    topics: ['Recursion', 'Hash Maps', 'Product Architecture'],
    hiring: 'Moderate'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: ['fab', 'microsoft'],
    color: '#00A4EF',
    bg: 'rgba(0, 164, 239, 0.1)',
    difficulty: { easy: 35, medium: 45, hard: 20 },
    topics: ['Strings', 'Linked Lists', 'Cloud Patterns'],
    hiring: 'High'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'play',
    color: '#E50914',
    bg: 'rgba(229, 9, 20, 0.1)',
    difficulty: { easy: 15, medium: 50, hard: 35 },
    topics: ['Concurrency', 'Distributed Systems', 'Scalability'],
    hiring: 'Selective'
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: ['fab', 'apple'],
    color: '#555555',
    bg: 'rgba(85, 85, 85, 0.1)',
    difficulty: { easy: 20, medium: 55, hard: 25 },
    topics: ['UI/UX', 'Performance', 'Memory Management'],
    hiring: 'Moderate'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: ['fab', 'telegram'],
    color: '#26A5E4',
    bg: 'rgba(38, 165, 228, 0.1)',
    difficulty: { easy: 20, medium: 45, hard: 35 },
    topics: ['Distributed Systems', 'Cryptography', 'Networking'],
    hiring: 'Medium'
  },
  {
    id: 'x',
    name: 'X',
    icon: ['fab', 'x-twitter'],
    color: '#000000',
    bg: 'rgba(0, 0, 0, 0.05)',
    difficulty: { easy: 15, medium: 50, hard: 35 },
    topics: ['Scalability', 'Real-time Data', 'Feed Algorithms'],
    hiring: 'Medium'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: ['fas', 'bolt'], 
    color: '#74aa9c',
    bg: 'rgba(116, 170, 156, 0.1)',
    difficulty: { easy: 10, medium: 30, hard: 60 },
    topics: ['Machine Learning', 'Python', 'Large Language Models'],
    hiring: 'High'
  },
  {
    id: 'intel',
    name: 'Intel',
    icon: ['fab', 'intel'],
    color: '#0071C5',
    bg: 'rgba(0, 113, 197, 0.1)',
    difficulty: { easy: 30, medium: 50, hard: 20 },
    topics: ['C++', 'Operating Systems', 'Computer Architecture'],
    hiring: 'Medium'
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    icon: ['fas', 'laptop'], 
    color: '#E2231A',
    bg: 'rgba(226, 35, 26, 0.1)',
    difficulty: { easy: 40, medium: 45, hard: 15 },
    topics: ['Hardware Integration', 'Firmware', 'Supply Chain Logic'],
    hiring: 'Low'
  }
];

const CompanyInsights = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);

    const filteredCompanies = COMPANIES_DATA.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto scroll-smooth">
            {/* Header section */}
            <div className="mb-10">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black tracking-tight text-[var(--text-primary)] mb-2"
                >
                    Company Insights
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-[var(--text-secondary)] font-medium"
                >
                    Master your dream company's interview patterns with data-driven insights.
                </motion.p>
            </div>

            {/* Search and filter */}
            <div className="flex gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                    <FontAwesomeIcon icon="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                    <input 
                        type="text" 
                        placeholder="Search for a company..."
                        className="w-full bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/20 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content grid */}
            <AnimatePresence mode="wait">
                {!selectedCompany ? (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredCompanies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedCompany(company)}
                                className="cursor-pointer group relative overflow-hidden bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/10 rounded-2xl p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all group-hover:scale-110"
                                        style={{ backgroundColor: company.bg, color: company.color }}
                                    >
                                        <FontAwesomeIcon icon={company.icon} />
                                    </div>
                                    <div className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-green-500/10 text-green-500">
                                        {company.hiring} Hiring
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-[var(--text-primary)]">{company.name}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">Interview Difficulty Breakdown</p>
                                
                                <div className="flex h-2 rounded-full overflow-hidden bg-gray-200/10 mb-4">
                                    <div style={{ width: `${company.difficulty.easy}%` }} className="bg-green-500" />
                                    <div style={{ width: `${company.difficulty.medium}%` }} className="bg-yellow-500" />
                                    <div style={{ width: `${company.difficulty.hard}%` }} className="bg-red-500" />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {company.topics.map(topic => (
                                        <span key={topic} className="text-[10px] px-2 py-1 rounded bg-[var(--primary-bg)] text-[var(--text-secondary)] font-semibold border border-[var(--text-secondary)]/5">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[var(--secondary-bg)] rounded-3xl p-8 border border-[var(--text-secondary)]/10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background blobs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: selectedCompany.color }} />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: selectedCompany.color }} />

                        <button 
                            onClick={() => setSelectedCompany(null)}
                            className="mb-8 flex items-center gap-2 text-sm font-bold text-blue-500 hover:gap-3 transition-all"
                        >
                            <FontAwesomeIcon icon="arrow-left" />
                            Back to Companies
                        </button>

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-6 mb-8">
                                    <div 
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl"
                                        style={{ backgroundColor: selectedCompany.bg, color: selectedCompany.color }}
                                    >
                                        <FontAwesomeIcon icon={selectedCompany.icon} />
                                    </div>
                                    <div>
                                        <h2 className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">{selectedCompany.name}</h2>
                                        <p className="text-[var(--text-secondary)] text-lg font-medium">Detailed interview analytics and trends</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="bg-[var(--primary-bg)] p-6 rounded-2xl border border-[var(--text-secondary)]/5">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] mb-2">Hiring Velocity</p>
                                        <h4 className="text-2xl font-bold text-green-500">{selectedCompany.hiring}</h4>
                                    </div>
                                    <div className="bg-[var(--primary-bg)] p-6 rounded-2xl border border-[var(--text-secondary)]/5">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] mb-2">Total Solved Match</p>
                                        <h4 className="text-2xl font-bold text-[var(--text-primary)]">84% Match</h4>
                                    </div>
                                    <div className="bg-[var(--primary-bg)] p-6 rounded-2xl border border-[var(--text-secondary)]/5">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] mb-2">Success Rate</p>
                                        <h4 className="text-2xl font-bold text-blue-400">Low</h4>
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Most Frequent Topics</h4>
                                <div className="flex flex-wrap gap-4 mb-10">
                                    {selectedCompany.topics.map(topic => (
                                        <div key={topic} className="flex flex-col gap-2 p-4 bg-[var(--primary-bg)] rounded-xl border border-[var(--text-secondary)]/10 min-w-40 flex-1">
                                            <span className="font-bold text-[var(--text-primary)]">{topic}</span>
                                            <div className="h-1.5 w-full bg-gray-600/20 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.random() * 50 + 50}%` }}
                                                    className="h-full bg-blue-500" 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-96 space-y-6">
                                <div className="bg-gray-600/5 p-8 rounded-3xl border border-[var(--text-secondary)]/5">
                                    <h4 className="text-lg font-bold mb-6">Preparation Strategy</h4>
                                    <ul className="space-y-4">
                                        {[
                                            "Focus on Coding",
                                            "Focus on Coding",
                                            "Focus on Coding",
                                            "Focus on Coding",
                                            "Focus on Coding",
                                            
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 text-sm font-medium text-[var(--text-secondary)]">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-500 font-bold shrink-0">
                                                    {i + 1}
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20">
                                        Start Company Path
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompanyInsights;
