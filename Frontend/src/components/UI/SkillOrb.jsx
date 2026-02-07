import React from 'react';

const SkillOrb = ({ skill, level = 1, type = 'learn' }) => {
    // Type determines color theme
    const colors = type === 'learn'
        ? 'from-purple-400 to-indigo-500 shadow-purple-500/30'
        : 'from-blue-400 to-teal-500 shadow-blue-500/30';

    return (
        <div className="group relative flex flex-col items-center gap-2">
            <div className={`
                w-16 h-16 rounded-full bg-gradient-to-br ${colors} 
                flex items-center justify-center text-white font-bold text-xl shadow-lg
                transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                relative z-10 border-2 border-white/20
            `}>
                {skill.charAt(0)}

                {/* Level Badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700">
                    {level}
                </div>
            </div>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary-pink transition-colors">
                {skill}
            </span>

            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br ${colors}`}></div>
        </div>
    );
};

export default SkillOrb;
