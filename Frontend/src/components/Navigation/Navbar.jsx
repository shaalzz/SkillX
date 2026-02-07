import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell, Search, Menu, Sparkles, User as UserIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo.jpeg';

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/50 h-20 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between gap-8">

                {/* 1. Logo */}
                <div className="flex items-center gap-4 min-w-[150px]">
                    <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <Menu size={24} className="text-slate-600 dark:text-slate-400" />
                    </button>
                    <Link to="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform bg-white">
                            <img src={logo} alt="SkillX Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <span className="font-display font-[900] text-2xl text-slate-900 dark:text-white tracking-tighter hidden sm:block">SkillX</span>
                    </Link>
                </div>

                {/* 2. Navigation Links */}
                <div className="hidden lg:flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                    {[
                        { label: 'Explore', path: '/learn' },
                        { label: 'Network', path: '/community' },
                        { label: 'Market', path: '/learn' },
                    ].map(link => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${location.pathname === link.path ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* 3. Search Bar */}
                <div className="flex-1 max-w-xl relative hidden md:block">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        placeholder="Search for skills, mentors..."
                        className="w-full bg-slate-100/80 dark:bg-slate-800/80 border-2 border-transparent focus:border-primary-pink/30 focus:bg-white dark:focus:bg-slate-900 outline-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium transition-all text-slate-900 dark:text-white"
                    />
                </div>

                {/* 4. Theme & Notifications & Profile */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-11 h-11 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all group overflow-hidden relative"
                    >
                        <div className={`transition-all duration-500 transform ${theme === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Sun size={20} className="text-primary-pink" />
                        </div>
                        <div className={`absolute transition-all duration-500 transform ${theme === 'light' ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                            <Moon size={20} className="text-slate-500" />
                        </div>
                    </button>

                    <button className="relative w-11 h-11 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all group">
                        <Bell size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-primary-pink transition-colors" />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary-pink rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <div
                                onClick={() => navigate('/profile')}
                                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all group"
                            >
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{user.username}</div>
                                    <div className="text-[10px] font-black text-primary-pink uppercase tracking-widest leading-tight">Pro Learner</div>
                                </div>
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full flex items-center justify-center text-xl bg-white dark:bg-slate-900">
                                        {user.avatar_image || '🦊'}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="w-11 h-11 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-lg hover:text-red-500 transition-all group"
                                title="Sign Out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

