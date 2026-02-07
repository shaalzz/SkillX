import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, Users, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: BookOpen, label: 'Learn', path: '/learn' },
        { icon: GraduationCap, label: 'Teach', path: '/teach' },
        { icon: Users, label: 'Community', path: '/community' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="w-24 lg:w-28 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-white/40 dark:border-slate-800/50 h-screen fixed left-0 top-20 hidden lg:flex flex-col py-8 z-40 transition-all duration-300">
            <div className="flex-1 flex flex-col items-center gap-6 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={({ isActive }) => `
                            w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 relative group
                            ${isActive
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-200 dark:shadow-slate-950/50'
                                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }
                        `}
                    >
                        <item.icon size={24} />
                        {/* Hover Label */}
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl whitespace-nowrap">
                            {item.label}
                        </div>
                        {/* Active Indicator Dot */}
                        <div className={`absolute -left-1 w-1.5 h-6 bg-primary-pink rounded-r-full transition-all scale-y-0 opacity-0 group-[.active]:scale-y-100 group-[.active]:opacity-100 shadow-[0_0_10px_#FF9BD2]`} />
                    </NavLink>
                ))}
            </div>

            <div className="px-2 flex flex-col items-center gap-4">
                <button className="w-14 h-14 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" title="Help">
                    <HelpCircle size={24} />
                </button>
                <button
                    onClick={logout}
                    title="Logout"
                    className="w-14 h-14 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
                >
                    <LogOut size={24} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

