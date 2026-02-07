import React from 'react';
import { Share2, Zap, ArrowRight, Sparkles } from 'lucide-react';

const SkillSynergy = () => {
    const synergies = [
        { from: 'Python', to: 'AI/ML', gain: '+25% Speed', color: 'blue' },
        { from: 'UI Design', to: 'Frontend', gain: '+40% Mastery', color: 'pink' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group transition-colors duration-300">
            <div className="absolute -right-10 -top-10 text-primary-mint/10 group-hover:rotate-12 transition-transform duration-700">
                <Share2 size={160} />
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-[900] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-yellow-400" size={20} /> Skill Synergy
                </h3>

                <div className="space-y-6">
                    {synergies.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-white dark:border-slate-700 hover:shadow-lg transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{s.from}</span>
                                    <ArrowRight size={12} className="text-slate-300 dark:text-slate-600" />
                                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{s.to}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r from-primary-pink to-primary-blue w-[70%]`}></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black text-primary-mint uppercase tracking-widest leading-none mb-1">Synergy</div>
                                <div className="text-sm font-black text-slate-800 dark:text-slate-100">{s.gain}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-8 py-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-pink hover:border-primary-pink/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 group-hover:animate-bounce-slow">
                    <Sparkles size={14} /> Calculate Potential
                </button>
            </div>
        </div>
    );
};

export default SkillSynergy;
