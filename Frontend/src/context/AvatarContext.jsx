import React, { createContext, useState, useContext, useEffect } from 'react';

const AvatarContext = createContext(null);

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);
    const [stats, setStats] = useState({
        level: 1,
        xp: 0,
        energy: 100,
        affection: 50,
        emotion: 'HAPPY'
    });

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('skillx_avatar');
        if (saved) {
            const parsed = JSON.parse(saved);
            setAvatar(parsed.dna);
            setStats(parsed.stats);
        }
    }, []);

    // Save on change
    useEffect(() => {
        if (avatar) {
            localStorage.setItem('skillx_avatar', JSON.stringify({ dna: avatar, stats }));
        }
    }, [avatar, stats]);

    const createAvatar = (species, color) => {
        const newAvatar = {
            species,
            color,
            accessories: [],
            name: 'Buddy'
        };
        setAvatar(newAvatar);
        setStats({ level: 1, xp: 0, energy: 100, affection: 50, emotion: 'HAPPY' });
    };

    const updateEmotion = (emotion) => {
        setStats(prev => ({ ...prev, emotion }));
    };

    const feedAvatar = () => {
        if (stats.energy >= 100) return false;
        setStats(prev => ({ ...prev, energy: Math.min(100, prev.energy + 20), emotion: 'HAPPY' }));
        return true;
    };

    const trainAvatar = (xpAmount) => {
        setStats(prev => {
            const newXp = prev.xp + xpAmount;
            const levelUp = newXp >= prev.level * 100;
            return {
                ...prev,
                xp: newXp,
                level: levelUp ? prev.level + 1 : prev.level,
                energy: Math.max(0, prev.energy - 10),
                emotion: levelUp ? 'EXCITED' : 'FOCUSED'
            };
        });
    };

    return (
        <AvatarContext.Provider value={{ avatar, stats, createAvatar, updateEmotion, feedAvatar, trainAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

export const useAvatar = () => useContext(AvatarContext);
