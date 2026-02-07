import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ study_minutes: 0, teach_minutes: 0, total_minutes: 0, date: new Date().toLocaleDateString() });

    // Initial Load & Daily Stats Tracker
    useEffect(() => {
        // Load User
        try {
            const storedUser = sessionStorage.getItem('skillx_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.error("Failed to parse user session", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const today = new Date().toLocaleDateString();
        const storedStats = localStorage.getItem(`skillx_stats_${user.id}`);
        let currentStats = storedStats ? JSON.parse(storedStats) : { study_minutes: 0, teach_minutes: 0, total_minutes: 0, date: today };

        // Reset if new day
        if (currentStats.date !== today) {
            currentStats = { study_minutes: 0, teach_minutes: 0, total_minutes: 0, date: today };
        }
        setStats(currentStats);

        const interval = setInterval(() => {
            const path = window.location.pathname;
            setStats(prev => {
                const updated = { ...prev };
                if (path.includes('/learn') || path.includes('/course')) {
                    updated.study_minutes += 1;
                } else if (path.includes('/teach') || path.includes('/community')) {
                    updated.teach_minutes += 1;
                }
                updated.total_minutes += 1;
                localStorage.setItem(`skillx_stats_${user.id}`, JSON.stringify(updated));
                return updated;
            });
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [user]);

    const login = (userData) => {
        sessionStorage.setItem('skillx_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem('skillx_user');
        setUser(null);
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        sessionStorage.setItem('skillx_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser, stats }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
