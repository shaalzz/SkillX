import React from 'react';
import { X, Zap, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';

const CreditsPopup = ({ isOpen, onClose, currentCredits }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 transition-colors">
                {/* Header */}
                <div className="bg-gradient-rainbow p-8 text-white relative">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Zap size={28} className="text-yellow-300 fill-yellow-300" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold">SkillX Credits</h2>
                            <p className="text-white/80 font-medium tracking-tight">Fuel your learning journey 🚀</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex justify-between items-center transition-colors">
                        <div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Your Balance</div>
                            <div className="text-3xl font-bold text-slate-800 dark:text-white transition-colors">{currentCredits} <span className="text-sm font-medium">Credits</span></div>
                        </div>
                        <div className="text-xs font-bold text-primary-pink bg-pink-50 dark:bg-primary-pink/10 px-3 py-1 rounded-full border border-pink-100 dark:border-primary-pink/30">PREMIUM USER</div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 ml-1 italic transition-colors">Top-up Options</h3>
                        {[
                            { amount: 100, price: '$5', icon: '💎', popular: false },
                            { amount: 500, price: '$20', icon: '💰', popular: true },
                            { amount: 1500, price: '$50', icon: '👑', popular: false },
                        ].map((opt, i) => (
                            <button
                                key={i}
                                className={`w-full group flex items-center justify-between p-5 rounded-2xl border-2 transition-all relative ${opt.popular ? 'border-primary-pink bg-pink-50/10 dark:bg-primary-pink/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                                    }`}
                            >
                                {opt.popular && (
                                    <div className="absolute -top-3 left-6 bg-primary-pink text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">MOST POPULAR</div>
                                )}
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl">{opt.icon}</div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-800 dark:text-slate-100 transition-colors">{opt.amount} Credits</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Includes {Math.round(opt.amount * 0.1)} bonus XP</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{opt.price}</div>
                                    <div className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center pt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1"><ShieldCheck size={12} /> Secure Payment</div>
                        <div className="flex items-center gap-1"><Trophy size={12} /> Earn via Teaching</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditsPopup;
