import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Zap, BookOpen, GraduationCap, Users, Play, ArrowRight, Star, Trophy, Search, Bell, Sparkles } from 'lucide-react';
import AvatarHabitat from '../../components/avatar/AvatarHabitat';
import CreditCard from '../../components/UI/CreditCard';
import SkillOrb from '../../components/UI/SkillOrb';
import CreditsPopup from '../../components/UI/CreditsPopup';
import SkillSynergy from '../../components/UI/SkillSynergy';

const MainDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isCreditsOpen, setIsCreditsOpen] = useState(false);

    // Mock Data for Spec
    const learningSkills = user?.skills_learn ? user.skills_learn.split(',') : ['Python', 'UI Design', 'React'];
    const knownSkills = ['HTML/CSS', 'JS Basics', 'Figma'];
    const achievements = [
        { title: 'Fast Learner', icon: '⚡' },
        { title: 'Problem Solver', icon: '🧩' },
        { title: 'Early Bird', icon: '🌅' }
    ];

    return (
        <div className="space-y-10 animate-fade-in-up">
            {/* 1. Dashboard Header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-rainbow rounded-[2rem] flex items-center justify-center text-3xl shadow-xl shadow-pink-500/20">
                        {user?.avatar_type || '🦊'}
                    </div>
                    <div>
                        <h1 className="text-4xl font-display font-[900] text-slate-900 dark:text-white transition-colors duration-300">
                            ⭐ Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-rainbow">{user?.username || 'shaalzz'}</span>!
                        </h1>
                        <p className="text-slate-500 font-medium">You're in <span className="text-slate-900 dark:text-white font-bold underline decoration-primary-pink decoration-2">Intensive</span> learning mode today.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-3 transition-colors duration-300">
                        <span className="text-xl font-bold text-slate-800 dark:text-white">🔥 12</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Day<br />Streak</span>
                    </div>
                </div>
            </header>

            {/* 2. Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN (4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Credit Card Widget */}
                    <div onClick={() => setIsCreditsOpen(true)} className="cursor-pointer group">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl transition-all group-hover:scale-[1.02] group-hover:shadow-pink-500/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-pink/20 rounded-full blur-3xl group-hover:bg-primary-pink/40 transition-colors"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">SkillX Balance</div>
                                        <div className="text-4xl font-[900]">{user?.credits || 50} <span className="text-sm font-medium opacity-60">ⓒ</span></div>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                        <Zap size={20} className="text-yellow-300 fill-yellow-300" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-xs font-mono tracking-widest opacity-80 uppercase">{user?.username || 'SHAALZZ'}</div>
                                    <div className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">PREMIUM CLASS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            🎯 Quick Actions
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Continue Python', desc: 'Module 3 • 35%', icon: <Play size={18} />, color: 'blue' },
                                { title: 'Find a Mentor', desc: 'Chat live now', icon: <Users size={18} />, color: 'pink' },
                                { title: 'Join Challenge', desc: '30 Days of Code', icon: <Star size={18} />, color: 'mint' }
                            ].map((action, i) => (
                                <button key={i} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 rounded-2xl group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/20 text-${action.color}-600 dark:text-${action.color}-400 rounded-xl flex items-center justify-center`}>
                                            {action.icon}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-primary-pink transition-colors">{action.title}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{action.desc}</div>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary-pink transition-all group-hover:translate-x-1" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Progress Pet / Avatar Habitat */}
                    <div className="bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-700 rounded-[3rem] p-4 shadow-xl transition-colors duration-300">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 text-primary-pink/10"><Sparkles size={120} /></div>
                            <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full">Evolution Pending</span>
                                <h2 className="text-3xl font-display font-[900] text-slate-900 dark:text-white leading-none">Your Progress Pet is <span className="text-primary-pink underline decoration-4 decoration-pink-100 dark:decoration-pink-900/30 underline-offset-8">Energized</span>!</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Pixel gains 2X XP while you study Python. Complete a lesson to level up!</p>
                                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                    <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Mood</div>
                                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">😊 Happy <span className="text-green-500">+15% XP</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-64 h-64 bg-slate-50 dark:bg-slate-800 rounded-[4rem] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 group relative">
                                <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-5 transition-opacity rounded-[4rem]"></div>
                                <AvatarHabitat />
                            </div>
                        </div>
                    </div>

                    {/* Skills Overview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary-pink"></div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center justify-between">
                                Skills I'm Learning
                                <span className="text-xs font-black text-slate-300 dark:text-slate-600">{learningSkills.length}</span>
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {learningSkills.map((skill, i) => <SkillOrb key={i} skill={skill} level={Math.ceil(Math.random() * 5)} type="learn" />)}
                                <button onClick={() => navigate('/learn')} className="w-16 h-16 rounded-[1.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:border-primary-pink hover:text-primary-pink transition-all hover:scale-105 active:scale-95">+</button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group transition-colors duration-300">
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary-blue"></div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center justify-between">
                                Skills I Know
                                <span className="text-xs font-black text-slate-300 dark:text-slate-600">{knownSkills.length}</span>
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {knownSkills.map((skill, i) => <SkillOrb key={i} skill={skill} level={5} type="teach" />)}
                            </div>
                        </div>
                    </div>

                    <SkillSynergy />

                    {/* Recent Achievements */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <Trophy className="text-yellow-500" size={20} /> Recent Achievements
                        </h3>
                        <div className="flex flex-wrap gap-6">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 group">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-primary-pink/30 dark:group-hover:border-primary-pink/50 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-xl transition-all">
                                        {ach.icon}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">{ach.title}</span>
                                </div>
                            ))}
                            <button className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500">
                                    +
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic">View All</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <CreditsPopup
                isOpen={isCreditsOpen}
                onClose={() => setIsCreditsOpen(false)}
                currentCredits={user?.credits || 50}
            />
        </div>
    );
};

export default MainDashboard;

