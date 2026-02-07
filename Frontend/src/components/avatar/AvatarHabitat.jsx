import React, { useState } from 'react';
import { useAvatar } from '../../context/AvatarContext';
import LivingAvatar from './LivingAvatar';
import { Heart, Zap, Trophy, Sparkles } from 'lucide-react';

const AvatarHabitat = () => {
    const { avatar, stats, feedAvatar, updateEmotion } = useAvatar();
    const [message, setMessage] = useState('');

    if (!avatar) return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
                <div className="text-4xl mb-2">🥚</div>
                <p className="text-slate-500">No companion yet.</p>
            </div>
        </div>
    );

    const handlePet = () => {
        updateEmotion('HAPPY');
        setMessage('Purr... ❤️');
        setTimeout(() => setMessage(''), 2000);
    };

    const handleFeed = () => {
        const fed = feedAvatar();
        if (fed) {
            setMessage('Yummy! 🍎');
            setTimeout(() => setMessage(''), 2000);
        } else {
            setMessage("I'm full! 🤢");
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-indigo-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Sparkles size={100} />
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {avatar.name}'s Corner
                    </h3>
                    <div className="text-sm text-slate-500">Level {stats.level} {avatar.species}</div>
                </div>
                <div className="flex gap-2">
                    <div className="bg-white/80 p-2 rounded-lg flex flex-col items-center shadow-sm">
                        <Heart size={16} className="text-pink-500 mb-1" fill="currentColor" />
                        <span className="text-xs font-bold text-slate-600">{stats.affection}</span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg flex flex-col items-center shadow-sm">
                        <Zap size={16} className="text-yellow-500 mb-1" fill="currentColor" />
                        <span className="text-xs font-bold text-slate-600">{stats.energy}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[200px] relative z-10">
                {message && (
                    <div className="absolute -top-4 bg-white px-4 py-2 rounded-xl shadow-lg animate-bounce text-sm font-bold text-slate-700">
                        {message}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                )}

                <div onClick={handlePet} className="cursor-pointer hover:scale-105 transition-transform">
                    <LivingAvatar size="lg" />
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        onClick={handlePet}
                        className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:-translate-y-1"
                    >
                        <span className="text-2xl">👋</span>
                        <span className="text-xs font-bold text-slate-600">Pet</span>
                    </button>
                    <button
                        onClick={handleFeed}
                        className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:-translate-y-1"
                    >
                        <span className="text-2xl">🍎</span>
                        <span className="text-xs font-bold text-slate-600">Feed</span>
                    </button>
                    <button
                        className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:-translate-y-1"
                    >
                        <span className="text-2xl">👗</span>
                        <span className="text-xs font-bold text-slate-600">Dress</span>
                    </button>
                </div>
            </div>

            {/* XP Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold uppercase">
                    <span>Experience</span>
                    <span>{stats.xp} / {stats.level * 100} XP</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${(stats.xp / (stats.level * 100)) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AvatarHabitat;
