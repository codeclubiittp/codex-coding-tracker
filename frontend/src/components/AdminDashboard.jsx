import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Logo from './Logo';

library.add(fas, fab);

// ── Mock Data 
const MOCK_USERS = [
    { id: 1, name: 'Arjun Mehta',    username: 'arjun_m',   email: 'arjun@codex.io',    joined: '2025-11-14', status: 'Active',    leetcode: 'arjun_lc',   codeforces: 'arjun_cf',   lc_solved: 312, cf_rating: 1487, streak: 21 },
    { id: 2, name: 'Priya Nair',     username: 'priya_n',   email: 'priya@codex.io',    joined: '2025-12-01', status: 'Active',    leetcode: 'priya_lc',   codeforces: null,          lc_solved: 189, cf_rating: null, streak: 7  },
    { id: 3, name: 'Shanid Ali',     username: 'shanid',    email: 'shanid@codex.io',   joined: '2026-01-08', status: 'Active',    leetcode: 'shanid_lc',  codeforces: 'shanid_cf',   lc_solved: 450, cf_rating: 1712, streak: 34 },
    { id: 4, name: 'Rahul Varma',    username: 'rahul_v',   email: 'rahul@codex.io',    joined: '2026-02-14', status: 'Inactive',  leetcode: null,          codeforces: 'rahul_cf',    lc_solved: 0,   cf_rating: 1120, streak: 0  },
    { id: 5, name: 'Zara Khan',      username: 'zara_k',    email: 'zara@codex.io',     joined: '2026-02-20', status: 'Active',    leetcode: 'zara_lc',    codeforces: 'zara_cf',     lc_solved: 278, cf_rating: 1560, streak: 14 },
    { id: 6, name: 'Dev Patel',      username: 'dev_p',     email: 'dev@codex.io',      joined: '2026-03-01', status: 'Active',    leetcode: 'dev_lc',     codeforces: null,          lc_solved: 95,  cf_rating: null, streak: 5  },
    { id: 7, name: 'Aisha Bose',     username: 'aisha_b',   email: 'aisha@codex.io',    joined: '2026-03-05', status: 'Banned',    leetcode: null,          codeforces: null,          lc_solved: 0,   cf_rating: null, streak: 0  },
    { id: 8, name: 'Kiran Reddy',    username: 'kiran_r',   email: 'kiran@codex.io',    joined: '2026-03-18', status: 'Active',    leetcode: 'kiran_lc',   codeforces: 'kiran_cf',    lc_solved: 621, cf_rating: 1890, streak: 55 },
];

const MOCK_CONTESTS = [
    { id: 1, name: 'Spring Blitz',       platform: 'LeetCode',   duration: 90,  startTime: '2026-04-05T14:00', participants: 24, status: 'Upcoming' },
    { id: 2, name: 'CF Weekly Round',    platform: 'Codeforces', duration: 120, startTime: '2026-04-02T20:35', participants: 41, status: 'Live'     },
    { id: 3, name: 'April Warmup',       platform: 'LeetCode',   duration: 60,  startTime: '2026-03-30T18:00', participants: 18, status: 'Ended'    },
    { id: 4, name: 'DSA Challenge I',    platform: 'Internal',   duration: 180, startTime: '2026-03-28T10:00', participants: 33, status: 'Ended'    },
];

const PLATFORM_COLORS = {
    LeetCode:   { bg: '#FFA11620', text: '#FFA116', border: '#FFA11640' },
    Codeforces: { bg: '#1F8ACB20', text: '#1F8ACB', border: '#1F8ACB40' },
    Internal:   { bg: '#8B5CF620', text: '#8B5CF6', border: '#8B5CF640' },
};

const STATUS_STYLES = {
    Active:   { bg: '#22c55e20', text: '#22c55e', dot: '#22c55e' },
    Inactive: { bg: '#f59e0b20', text: '#f59e0b', dot: '#f59e0b' },
    Banned:   { bg: '#ef444420', text: '#ef4444', dot: '#ef4444' },
    Upcoming: { bg: '#3b82f620', text: '#3b82f6', dot: '#3b82f6' },
    Live:     { bg: '#22c55e20', text: '#22c55e', dot: '#22c55e' },
    Ended:    { bg: '#6b728020', text: '#6b7280', dot: '#6b7280' },
};

const NAV_ITEMS = [
    { key: 'overview', label: 'Overview',      icon: 'chart-pie'    },
    { key: 'users',    label: 'User Management', icon: 'users'        },
    { key: 'contests', label: 'Contest Rooms',  icon: 'trophy'       },
];

//Sub-components 
function StatCard({ icon, label, value, sub, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--secondary-bg)] rounded-2xl p-6 border border-[var(--text-secondary)]/10 relative overflow-hidden"
        >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-[40px] opacity-20" style={{ background: color }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: color + '20', color }}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <p className="text-[11px] uppercase font-bold tracking-widest text-[var(--text-secondary)] mb-1">{label}</p>
            <h3 className="text-3xl font-black text-[var(--text-primary)]">{value}</h3>
            {sub && <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{sub}</p>}
        </motion.div>
    );
}

function StatusPill({ status }) {
    const s = STATUS_STYLES[status] || STATUS_STYLES.Inactive;
    return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: s.bg, color: s.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
            {status}
        </span>
    );
}

function UserStatsPanel({ user, onClose }) {
    return (
        <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 35 }}
            className="absolute top-0 right-0 h-full w-96 bg-[var(--secondary-bg)] border-l border-[var(--text-secondary)]/10 z-30 flex flex-col shadow-2xl"
        >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--text-secondary)]/10">
                <div>
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{user.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">@{user.username} · Joined {new Date(user.joined).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[var(--primary-bg)] flex items-center justify-center transition-all text-[var(--text-secondary)]">
                    <FontAwesomeIcon icon="xmark" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <StatusPill status={user.status} />

                {/* Platform Stats */}
                <div>
                    <h4 className="text-xs uppercase font-black tracking-widest text-[var(--text-secondary)] mb-3">Platform Stats</h4>
                    <div className="space-y-3">
                        {user.leetcode && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--primary-bg)] border border-[#FFA116]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#FFA116]/15 flex items-center justify-center">
                                        <FontAwesomeIcon icon={['fab', 'python']} className="text-[#FFA116]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)]">LeetCode</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">@{user.leetcode}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-[var(--text-primary)]">{user.lc_solved}</p>
                                    <p className="text-[10px] text-[var(--text-secondary)]">solved</p>
                                </div>
                            </div>
                        )}
                        {user.codeforces && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--primary-bg)] border border-[#1F8ACB]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#1F8ACB]/15 flex items-center justify-center">
                                        <FontAwesomeIcon icon="code" className="text-[#1F8ACB]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)]">Codeforces</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">@{user.codeforces}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-[var(--text-primary)]">{user.cf_rating}</p>
                                    <p className="text-[10px] text-[var(--text-secondary)]">rating</p>
                                </div>
                            </div>
                        )}
                        {!user.leetcode && !user.codeforces && (
                            <p className="text-xs text-[var(--text-secondary)] italic">No platforms connected.</p>
                        )}
                    </div>
                </div>

                {/* Streak */}
                <div>
                    <h4 className="text-xs uppercase font-black tracking-widest text-[var(--text-secondary)] mb-3">Activity</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[var(--primary-bg)] text-center">
                            <p className="text-2xl font-black text-orange-400">{user.streak}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Day Streak 🔥</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--primary-bg)] text-center">
                            <p className="text-2xl font-black text-blue-400">{user.lc_solved + (user.cf_rating ? Math.floor(user.cf_rating / 10) : 0)}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Total Problems</p>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="space-y-2">
                    <h4 className="text-xs uppercase font-black tracking-widest text-red-400 mb-3">Admin Actions</h4>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all">
                        <FontAwesomeIcon icon="ban" className="mr-2" /> Ban User
                    </button>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/10 transition-all">
                        <FontAwesomeIcon icon="rotate-left" className="mr-2" /> Reset Progress
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// ── Sections ───────────────────────────────────────────────────────────────
function OverviewSection() {
    const totalSolved = MOCK_USERS.reduce((s, u) => s + u.lc_solved, 0);
    const activeUsers = MOCK_USERS.filter(u => u.status === 'Active').length;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Admin Overview</h1>
                <p className="text-[var(--text-secondary)] mt-1 font-medium">Platform health and key metrics at a glance.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard icon="users"       label="Total Users"      value={MOCK_USERS.length} sub={`${activeUsers} active`}    color="#3b82f6" />
                <StatCard icon="circle-check" label="Active Users"    value={activeUsers}       sub="Currently online"           color="#22c55e" />
                <StatCard icon="trophy"      label="Contests Created" value={MOCK_CONTESTS.length} sub="1 live right now"        color="#f59e0b" />
                <StatCard icon="bullseye"    label="Problems Solved"  value={totalSolved.toLocaleString()} sub="across all users" color="#8b5cf6" />
            </div>

            {/* Recent activity */}
            <div className="bg-[var(--secondary-bg)] rounded-2xl border border-[var(--text-secondary)]/10 p-6">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-5">Recent Registrations</h3>
                <div className="space-y-3">
                    {MOCK_USERS.slice().sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 5).map(u => (
                        <div key={u.id} className="flex items-center justify-between py-3 border-b border-[var(--text-secondary)]/5 last:border-none">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[var(--violet)] flex items-center justify-center text-white font-bold text-sm">
                                    {u.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">{u.name}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">@{u.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-xs text-[var(--text-secondary)]">{new Date(u.joined).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <StatusPill status={u.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function UsersSection() {
    const [search, setSearch]         = useState('');
    const [statusFilter, setStatus]   = useState('All');
    const [selected, setSelected]     = useState(null);

    const filtered = useMemo(() => MOCK_USERS.filter(u => {
        const q = search.toLowerCase();
        const matchQ = u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        const matchS = statusFilter === 'All' || u.status === statusFilter;
        return matchQ && matchS;
    }), [search, statusFilter]);

    return (
        <div className="p-8 relative h-full overflow-hidden flex flex-col">
            <div className="mb-6">
                <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">User Management</h1>
                <p className="text-[var(--text-secondary)] mt-1 font-medium">{MOCK_USERS.length} registered users · click a row to inspect</p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mb-5">
                <div className="relative flex-1 max-w-sm">
                    <FontAwesomeIcon icon="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm" />
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search users..."
                        className="w-full bg-[var(--secondary-bg)] border border-[var(--text-secondary)]/20 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-medium" />
                </div>
                {['All','Active','Inactive','Banned'].map(s => (
                    <button key={s} onClick={() => setStatus(s)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
                        style={{
                            background: statusFilter === s ? 'var(--violet)' : 'var(--secondary-bg)',
                            color: statusFilter === s ? '#fff' : 'var(--text-secondary)',
                            borderColor: statusFilter === s ? 'transparent' : 'rgba(107,114,128,0.2)',
                        }}>
                        {s}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto bg-[var(--secondary-bg)] rounded-2xl border border-[var(--text-secondary)]/10 relative">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[var(--text-secondary)]/10 sticky top-0 bg-[var(--secondary-bg)] z-10">
                            {['User', 'Username', 'Platforms', 'LeetCode', 'CF Rating', 'Streak', 'Status'].map(h => (
                                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)]">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filtered.map((u, i) => (
                                <motion.tr
                                    key={u.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => setSelected(selected?.id === u.id ? null : u)}
                                    className="border-b border-[var(--text-secondary)]/5 hover:bg-[var(--primary-bg)] transition-colors cursor-pointer"
                                    style={{ background: selected?.id === u.id ? 'var(--primary-bg)' : '' }}
                                >
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-[var(--violet)] flex items-center justify-center text-white font-bold text-xs">{u.name[0]}</div>
                                            <span className="font-semibold text-[var(--text-primary)]">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-[var(--text-secondary)] font-mono text-xs">@{u.username}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-1">
                                            {u.leetcode   && <span className="text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: '#FFA11620', color: '#FFA116' }}>LC</span>}
                                            {u.codeforces && <span className="text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: '#1F8ACB20', color: '#1F8ACB' }}>CF</span>}
                                            {!u.leetcode && !u.codeforces && <span className="text-[9px] text-[var(--text-secondary)]">—</span>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 font-black text-[var(--text-primary)]">{u.lc_solved || '—'}</td>
                                    <td className="px-5 py-3.5 font-black text-[var(--text-primary)]">{u.cf_rating || '—'}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="font-black text-orange-400">{u.streak > 0 ? `${u.streak}🔥` : '—'}</span>
                                    </td>
                                    <td className="px-5 py-3.5"><StatusPill status={u.status} /></td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Side panel */}
                <AnimatePresence>
                    {selected && <UserStatsPanel user={selected} onClose={() => setSelected(null)} />}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ContestSection() {
    const [contests, setContests] = useState(MOCK_CONTESTS);
    const [form, setForm] = useState({ name: '', platform: 'LeetCode', duration: 90, startTime: '', description: '' });
    const [showForm, setShowForm] = useState(false);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!form.name || !form.startTime) return;
        const now = new Date();
        const start = new Date(form.startTime);
        const status = start > now ? 'Upcoming' : 'Live';
        setContests(prev => [{ id: prev.length + 1, ...form, participants: 0, status }, ...prev]);
        setForm({ name: '', platform: 'LeetCode', duration: 90, startTime: '', description: '' });
        setShowForm(false);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Contest Rooms</h1>
                    <p className="text-[var(--text-secondary)] mt-1 font-medium">{contests.length} contests · {contests.filter(c => c.status === 'Live').length} live now</p>
                </div>
                <button onClick={() => setShowForm(v => !v)}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    <FontAwesomeIcon icon={showForm ? 'xmark' : 'plus'} />
                    {showForm ? 'Cancel' : 'New Contest'}
                </button>
            </div>

            {/* Create Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleCreate}
                        className="bg-[var(--secondary-bg)] rounded-2xl border border-[var(--text-secondary)]/10 p-6 mb-8 grid grid-cols-2 gap-4"
                    >
                        <div className="col-span-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] block mb-1.5">Contest Name *</label>
                            <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required placeholder="e.g. Spring Blitz"
                                className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/15 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] block mb-1.5">Platform</label>
                            <select value={form.platform} onChange={e => setForm(p => ({...p, platform: e.target.value}))}
                                className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/15 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all">
                                {['LeetCode','Codeforces','Internal'].map(pl => <option key={pl} value={pl}>{pl}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] block mb-1.5">Duration (min)</label>
                            <input type="number" min={30} max={360} value={form.duration} onChange={e => setForm(p => ({...p, duration: e.target.value}))}
                                className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/15 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] block mb-1.5">Start Time *</label>
                            <input type="datetime-local" value={form.startTime} onChange={e => setForm(p => ({...p, startTime: e.target.value}))} required
                                className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/15 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] block mb-1.5">Description</label>
                            <input value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="Optional"
                                className="w-full bg-[var(--primary-bg)] border border-[var(--text-secondary)]/15 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all" />
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20">
                                Create Contest
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Contest Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                    {contests.map((c, i) => {
                        const pal = PLATFORM_COLORS[c.platform] || PLATFORM_COLORS.Internal;
                        return (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.04 }}
                                whileHover={{ y: -4 }}
                                className="bg-[var(--secondary-bg)] rounded-2xl border p-6 relative overflow-hidden"
                                style={{ borderColor: pal.border }}
                            >
                                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-[50px] opacity-20" style={{ background: pal.text }} />
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: pal.bg, color: pal.text }}>{c.platform}</span>
                                    <StatusPill status={c.status} />
                                </div>
                                <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{c.name}</h3>
                                <p className="text-xs text-[var(--text-secondary)] mb-4">
                                    {new Date(c.startTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium border-t border-[var(--text-secondary)]/10 pt-4 mt-2">
                                    <span><FontAwesomeIcon icon="clock" className="mr-1.5 opacity-60" />{c.duration} min</span>
                                    <span><FontAwesomeIcon icon="users" className="mr-1.5 opacity-60" />{c.participants} joined</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ── Main Admin Dashboard ───────────────────────────────────────────────────
function AdminDashboard({ onExit }) {
    const [activeSection, setActiveSection] = useState('overview');

    const SECTION = { overview: OverviewSection, users: UsersSection, contests: ContestSection };
    const ActiveComp = SECTION[activeSection];

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--primary-bg)] text-[var(--text-primary)] font-sans w-full">

            {/* Sidebar */}
            <aside className="w-64 bg-[var(--secondary-bg)] h-screen flex flex-col flex-shrink-0 border-r border-[var(--text-secondary)]/10">
                <div className="flex items-center gap-3 px-6 h-20 border-b border-[var(--text-secondary)]/10">
                    <Logo size="md" />
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Codex</h2>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Admin</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] px-3 py-2 mb-1">Management</p>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                ${activeSection === item.key
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--primary-bg)] hover:text-[var(--text-primary)]'}`}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-[var(--text-secondary)]/10">
                    {onExit && (
                        <button onClick={onExit}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--primary-bg)] transition-all">
                            <FontAwesomeIcon icon="arrow-left" className="w-4" />
                            Back to Dashboard
                        </button>
                    )}
                </div>
            </aside>

            {/* Main area */}
            <main className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="h-full"
                    >
                        <ActiveComp />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default AdminDashboard;
