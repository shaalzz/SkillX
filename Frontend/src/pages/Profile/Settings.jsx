import React, { useState } from 'react';
import { User, Bell, Shield, Heart, Zap, Save, ChevronRight } from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('Account');

    const sections = [
        { id: 'Account', icon: User, color: 'text-primary-pink' },
        { id: 'Notifications', icon: Bell, color: 'text-primary-blue' },
        { id: 'Privacy', icon: Shield, color: 'text-primary-mint' },
        { id: 'Pet Settings', icon: Heart, color: 'text-red-400' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up">
            <header className="space-y-2">
                <h1 className="text-4xl font-display font-[900] text-slate-900 dark:text-white tracking-tight transition-colors">System Configuration</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Fine-tune your SkillX experience and avatar synchronization.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                {/* Navigation Sidebar */}
                <div className="space-y-4">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all duration-300 group
                                ${activeSection === section.id
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl scale-[1.05]'
                                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeSection === section.id ? 'bg-white/10 dark:bg-slate-900/10 border-white/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                                    <section.icon size={20} className={activeSection === section.id ? (activeSection === 'Pet Settings' ? 'text-red-400' : 'text-white dark:text-slate-900') : section.color} />
                                </div>
                                <span className="font-black text-sm uppercase tracking-widest">{section.id}</span>
                            </div>
                            <ChevronRight size={18} className={`transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0'}`} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                        {sections.find(s => s.id === activeSection)?.icon && React.createElement(sections.find(s => s.id === activeSection).icon, { size: 240 })}
                    </div>

                    <div className="relative z-10 space-y-12">
                        <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-8 transition-colors">
                            <div>
                                <h3 className="text-3xl font-[900] text-slate-900 dark:text-white mb-2 transition-colors">{activeSection}</h3>
                                <p className="text-slate-400 font-medium uppercase text-[10px] tracking-[0.2em]">Manage your {activeSection.toLowerCase()} parameters</p>
                            </div>
                            <button className="px-8 py-3 bg-primary-pink text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2">
                                <Save size={16} /> Save Changes
                            </button>
                        </div>

                        <div className="space-y-8">
                            {activeSection === 'Account' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 font-bold text-slate-800 dark:text-white outline-none focus:ring-4 focus:ring-primary-pink/10 transition-all shadow-inner" placeholder="Pioneer User" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Synced</label>
                                        <input className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 font-bold text-slate-800 dark:text-slate-500 outline-none focus:ring-4 focus:ring-primary-pink/10 transition-all shadow-inner" placeholder="user@skillx.ai" disabled />
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Bio Signature</label>
                                        <textarea className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl px-6 py-4 font-bold text-slate-800 dark:text-white outline-none focus:ring-4 focus:ring-primary-pink/10 transition-all shadow-inner min-h-[120px]" placeholder="Architecting digital realities since 2026." />
                                    </div>
                                </div>
                            )}

                            {activeSection === 'Pet Settings' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="flex items-center justify-between p-8 bg-slate-50/50 dark:bg-slate-800/50 rounded-[2rem] border border-white dark:border-slate-700 shadow-inner transition-colors">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-rainbow flex items-center justify-center text-3xl shadow-lg">🦊</div>
                                            <div>
                                                <h4 className="font-black text-slate-800 dark:text-white text-lg transition-colors">Evolution Auto-Sync</h4>
                                                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mt-1 transition-colors">Avatar grows even when you aren't active.</p>
                                            </div>
                                        </div>
                                        <div className="w-16 h-8 bg-primary-pink rounded-full relative shadow-inner cursor-pointer">
                                            <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {['High Energy', 'Balanced', 'Silent Mode'].map((mode, i) => (
                                            <button key={i} className={`p-6 rounded-3xl border transition-all text-center group ${i === 1 ? 'border-primary-pink bg-pink-50/50 dark:bg-primary-pink/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm'}`}>
                                                <div className={`text-sm font-black uppercase tracking-widest mb-1 ${i === 1 ? 'text-primary-pink' : 'text-slate-400 dark:text-slate-500'}`}>{mode}</div>
                                                <div className="text-[10px] text-slate-300 dark:text-slate-600 font-bold">Latency Optimization</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === 'Notifications' && (
                                <div className="space-y-4 animate-fade-in">
                                    {['Course Reminders', 'Community Tags', 'Credit Alerts', 'System Updates'].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
                                            <span className="font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-[11px] transition-colors">{item}</span>
                                            <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition-colors">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-slate-300 rounded-full shadow-sm"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

