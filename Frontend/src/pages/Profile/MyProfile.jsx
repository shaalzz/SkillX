import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Edit, Award, Calendar, Zap, Sparkles, Star, TrendingUp, Shield } from 'lucide-react';

const MyProfile = () => {
    const { user } = useAuth();

    const learningSkills = user?.skills_learn ? user.skills_learn.split(',') : ['Python', 'React', 'Three.js'];
    const teachingSkills = user?.skills_have ? user.skills_have.split(',') : ['HTML', 'CSS', 'UI Design'];

    const achievements = [
        { title: 'Fast Learner', icon: '🚀', color: 'pink' },
        { title: 'Mentor King', icon: '👑', color: 'blue' },
        { title: 'Streak Master', icon: '🔥', color: 'mint' },
    ];

    return (
        <div className="space-y-12 animate-fade-in-up">

            {/* 1. Profile Super-Header */}
            <div className="relative bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group transition-colors duration-300">
                {/* Dynamic Background Pattern */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-rainbow opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-pink opacity-5 blur-[100px] animate-pulse"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-10">
                    <div className="w-44 h-44 rounded-[3rem] bg-white dark:bg-slate-800 p-3 shadow-2xl relative group/avatar transition-colors">
                        <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-[2.2rem] flex items-center justify-center text-8xl shadow-inner border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                            {user?.avatar_image || '🦊'}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-pink/10 to-transparent"></div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary-pink text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-slow">
                            <Sparkles size={20} />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4 mb-2">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <h1 className="text-5xl font-display font-[900] text-slate-900 dark:text-white tracking-tight transition-colors">{user?.fullname || user?.username || 'Pioneer User'}</h1>
                            <div className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl shadow-xl transition-colors">
                                Level {user?.level || 12}
                            </div>
                        </div>
                        <p className="text-slate-400 font-bold text-lg flex items-center justify-center md:justify-start gap-2">
                            {user?.profession || 'Interactive System Designer'} <span className="text-slate-200">/</span> <span className="text-primary-pink italic">Top 1% Learner</span>
                        </p>
                    </div>

                    <button className="px-10 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-[1.5rem] shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:scale-105 hover:shadow-2xl transition-all group/btn">
                        <Edit size={18} className="group-hover:text-primary-pink transition-colors" /> Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Metrics */}
                <div className="space-y-10">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Zap size={80} />
                        </div>
                        <h3 className="font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 text-lg uppercase tracking-widest transition-colors">
                            <Zap size={20} className="text-primary-pink" /> Core Pulse
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'XP Earned', value: '24.5k', color: 'pink' },
                                { label: 'Focus Hrs', value: '182', color: 'blue' },
                                { label: 'Day Streak', value: '14', color: 'mint' },
                                { label: 'Quests', value: '8', color: 'purple' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-50/50 dark:bg-slate-800/50 p-6 rounded-3xl border border-white dark:border-slate-700 text-center group hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all cursor-default">
                                    <div className="text-2xl font-[900] text-slate-900 dark:text-white mb-1 transition-colors">{stat.value}</div>
                                    <div className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                        <h3 className="font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 text-lg uppercase tracking-widest transition-colors">
                            <Award size={20} className="text-primary-blue" /> Badges
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex-1 min-w-[80px] flex flex-col items-center text-center group">
                                    <div className={`w-16 h-16 rounded-2xl bg-${ach.color === 'pink' ? 'pink-50' : ach.color === 'blue' ? 'blue-50' : 'emerald-50'} dark:bg-slate-800 flex items-center justify-center text-3xl mb-3 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                                        {ach.icon}
                                    </div>
                                    <div className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-tight transition-colors">{ach.title}</div>
                                </div>
                            ))}
                            {user?.verified_subjects?.map((subject, i) => (
                                <div key={i} className="flex-1 min-w-[80px] flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-primary-mint/20 border border-primary-mint/30 flex items-center justify-center text-3xl mb-3 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative">
                                        🎓
                                        <div className="absolute -top-1 -right-1 bg-primary-pink text-white rounded-full p-1 border-2 border-white dark:border-slate-800">
                                            <Shield size={10} />
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black text-emerald-600 dark:text-primary-mint uppercase tracking-widest leading-tight transition-colors">{subject} Mentor</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Mastery & History */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-3 text-lg uppercase tracking-widest transition-colors">
                                <TrendingUp size={20} className="text-primary-mint" /> Mastery Matrix
                            </h3>
                            <button className="text-[10px] font-black text-primary-pink uppercase tracking-widest hover:underline">View Insights</button>
                        </div>

                        <div className="space-y-8">
                            {[...learningSkills, ...teachingSkills].slice(0, 5).map((skill, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shadow-inner border border-slate-50 dark:border-slate-700 ${i === 0 ? 'bg-pink-50 dark:bg-primary-pink/20 text-primary-pink' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{skill[0]}</div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-100 transition-colors">{skill}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">LVL {10 - i}</span>
                                    </div>
                                    <div className="h-4 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner border border-white dark:border-slate-700 transition-colors">
                                        <div
                                            className="h-full bg-gradient-rainbow rounded-full shadow-lg"
                                            style={{ width: `${(10 - i) * 10}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                        <h3 className="font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 text-lg uppercase tracking-widest transition-colors">
                            <Calendar size={20} className="text-primary-blue" /> Chronological Growth
                        </h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Deep Learning Specialization', status: 'Completed', icon: '🧠', bg: 'bg-purple-50', color: 'text-purple-600', xp: '+500' },
                                { title: 'React Performance Patterns', status: 'In Progress (82%)', icon: '⚡', bg: 'bg-blue-50', color: 'text-blue-600', xp: '+120' },
                                { title: 'Three.js Fundamentals', status: 'Completed', icon: '🌐', bg: 'bg-emerald-50', color: 'text-emerald-600', xp: '+450' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all cursor-pointer group">
                                    <div className={`w-14 h-14 ${item.bg} dark:bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white dark:border-slate-700 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-black text-slate-800 dark:text-white text-lg group-hover:text-primary-pink transition-colors">{item.title}</div>
                                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{item.status}</div>
                                    </div>
                                    <div className={`text-sm font-black ${item.color} dark:text-primary-mint bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm transition-colors`}>{item.xp}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

