import React, { useEffect, useState } from 'react';
import { useAvatar } from '../../context/AvatarContext';

const LivingAvatar = ({ size = 'md', animated = true }) => {
    const { avatar, stats } = useAvatar();
    const [bounce, setBounce] = useState(false);

    useEffect(() => {
        if (stats.emotion === 'HAPPY' || stats.emotion === 'EXCITED') {
            const interval = setInterval(() => {
                setBounce(prev => !prev);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [stats.emotion]);

    if (!avatar) return null;

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-32 h-32',
        lg: 'w-64 h-64'
    };

    const getSpeciesEmoji = () => {
        switch (avatar.species) {
            case 'PixelFox': return '🦊';
            case 'DataBunny': return '🐰';
            case 'CodeKitty': return '🐱';
            case 'LearnOwl': return '🦉';
            default: return '🤖';
        }
    };

    const getEmotionOverlay = () => {
        switch (stats.emotion) {
            case 'HAPPY': return '😊';
            case 'FOCUSED': return '🤓';
            case 'TIRED': return '😴';
            case 'EXCITED': return '🤩';
            default: return '';
        }
    };

    return (
        <div className={`relative flex items-center justify-center transition-transform duration-500 ${sizeClasses[size]} ${bounce && animated ? '-translate-y-2' : ''}`}>
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse`} style={{ backgroundColor: avatar.color }}></div>

            {/* Avatar Body (Emoji for now, replaced by SVG in future) */}
            <div className="relative z-10 text-[5rem] drop-shadow-2xl transition-all duration-300" style={{ fontSize: size === 'sm' ? '2.5rem' : size === 'lg' ? '10rem' : '5rem' }}>
                {getSpeciesEmoji()}
            </div>

            {/* Emotion Bubble */}
            {stats.emotion !== 'NEUTRAL' && (
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg animate-bounce text-xl">
                    {getEmotionOverlay()}
                </div>
            )}

            {/* Energy Indicator */}
            {size !== 'sm' && (
                <div className="absolute -bottom-4 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden border border-slate-300">
                    <div
                        className="h-full transition-all duration-500"
                        style={{ width: `${stats.energy}%`, backgroundColor: stats.energy < 30 ? '#ef4444' : avatar.color }}
                    />
                </div>
            )}
        </div>
    );
};

export default LivingAvatar;
