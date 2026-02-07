import React, { useState } from 'react';
import Navbar from './Navigation/Navbar';
import Sidebar from './Navigation/Sidebar';
import SkillBot from './UI/SkillBot';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary-pink/30 transition-colors duration-300">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            {/* Sidebar (Fixed on Desktop) */}
            <Sidebar />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-[150] lg:hidden animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white z-[160] p-6 shadow-2xl animate-in slide-in-from-left duration-300">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-gradient-rainbow flex items-center justify-center text-white font-black">SX</div>
                            <span className="font-display font-[900] text-2xl text-slate-900 tracking-tighter">SkillX</span>
                        </div>
                        {/* Mobile sidebar content could go here, reusing Sidebar items but in list format */}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="pt-28 lg:pl-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto pb-20 transition-all duration-500">
                {children}
            </main>

            {/* SkillBot Floating Assistant */}
            <SkillBot />
        </div>
    );
};

export default Layout;

