import React from 'react';
import { User } from 'lucide-react';

const CreditCard = ({ credits, user }) => {
    return (
        <div className="relative h-48 w-80 rounded-3xl bg-gradient-rainbow p-6 shadow-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs font-bold opacity-80 uppercase tracking-widest">SkillX Card</div>
                        <div className="flex items-center gap-1 mt-1">
                            <div className="w-8 h-5 bg-yellow-400/80 rounded flex gap-1 px-1 items-center">
                                <div className="w-3 h-3 border border-yellow-600 rounded-full opacity-50"></div>
                            </div>
                            <span className="text-xs opacity-70">Premium</span>
                        </div>
                    </div>
                    <div className="text-2xl font-display font-bold italic">SX</div>
                </div>

                <div className="font-mono text-2xl tracking-widest drop-shadow-md">
                    {String(credits).padStart(6, '0')} <span className="text-sm">CR</span>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[10px] opacity-70 uppercase mb-0.5">Card Holder</div>
                        <div className="font-bold tracking-wide truncate max-w-[150px]">{user?.fullname || user?.username}</div>
                    </div>
                    <div className="text-[10px] opacity-70 uppercase text-right">
                        <div>Exp</div>
                        <div>∞/∞</div>
                    </div>
                </div>
            </div>

            {/* Decoratiive Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
        </div>
    );
};

export default CreditCard;
