import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, GraduationCap, Users, ArrowRight, Play, Heart, Star } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Particle background effect
    const particles = Array.from({ length: 20 });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden font-sans transition-colors duration-300">
            {/* 1. Animated Particle Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {particles.map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary-pink/20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                    ></div>
                ))}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-pink/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-blue/20 rounded-full blur-[150px] animate-pulse" />
            </div>

            {/* 2. Navbar with Blur */}
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm border-b border-white/20 dark:border-slate-800/50' : 'py-8 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform bg-white">
                            <img src={logo} alt="SkillX Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <span className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">SkillX</span>
                    </div>

                    <div className="hidden lg:flex gap-10 items-center">
                        {['Features', 'Marketplace', 'Community', 'Teach'].map(item => (
                            <button key={item} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-pink dark:hover:text-primary-pink transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-pink transition-all group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/login')} className="px-6 py-2.5 text-sm font-bold text-slate-800 hover:bg-white/50 rounded-2xl transition-all">
                            Login
                        </button>
                        <button onClick={() => navigate('/signup')} className="px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
                            Join Now
                        </button>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <main className="relative z-10 pt-40 pb-32 px-4 text-center">
                <div className="relative inline-block px-5 py-2 rounded-full bg-white/90 dark:bg-slate-800/90 border border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm mb-8 animate-bounce-slow">
                    ✨ 50 Free Credits on Signup!
                </div>

                <h1 className="text-7xl md:text-[9rem] font-display font-[900] text-slate-900 dark:text-white mb-10 leading-[0.85] tracking-tight transition-colors duration-300">
                    WHERE SKILLS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-rainbow">MEET MAGIC</span>
                </h1>

                <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                    Learn any skill. Teach what you know. Grow together in the world's first neuro-cute learning ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
                    <button
                        onClick={() => navigate('/signup')}
                        className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/40 dark:shadow-white/10 hover:scale-105 transition-all"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <Zap size={22} fill="currentColor" /> Start Learning Free
                        </span>
                        <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>

                    <button
                        onClick={() => navigate('/signup?role=mentor')}
                        className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-bold rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 hover:border-primary-pink/30 dark:hover:border-primary-pink/30 hover:shadow-xl transition-all flex items-center gap-3"
                    >
                        <GraduationCap size={22} /> Become a Mentor
                    </button>
                </div>

                {/* 4. Interactive 3D Skill Explorer (Mock) */}
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                    {[
                        { title: 'Python Mastery', icon: '🐍', color: 'blue', level: 'Explorer' },
                        { title: 'UI/UX Design', icon: '🎨', color: 'pink', level: 'Creator' },
                        { title: 'Growth Mindset', icon: '🌱', color: 'mint', level: 'Healer' }
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="group glass-card p-8 hover:-translate-y-4 hover:rotate-2 transition-all duration-500 cursor-pointer text-left"
                        >
                            <div className={`w-16 h-16 bg-${card.color}-100 rounded-[1.5rem] flex items-center justify-center text-4xl mb-6 shadow-inner`}>
                                {card.icon}
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{card.level} Class</div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-primary-pink transition-colors">{card.title}</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Master the core concepts of {card.title} with interactive modules and AI help.</p>
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-slate-700">Enroll for 25 Credits</span>
                                <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* 5. Stats Counter Section */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-rainbow opacity-50" />
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
                    {[
                        { label: 'Active Learners', value: '50K+', icon: Users },
                        { label: 'Skills Taught', value: '3.2K', icon: Sparkles },
                        { label: 'Mentors Online', value: '800+', icon: GraduationCap },
                        { label: 'Credits Earned', value: '1.2M', icon: Play }
                    ].map((stat, i) => (
                        <div key={i} className="space-y-4">
                            <div className="text-slate-500 flex justify-center"><stat.icon size={24} /></div>
                            <div className="text-5xl font-[900] font-display text-transparent bg-clip-text bg-gradient-rainbow tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest opacity-50">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Footer */}
            <footer className="py-20 px-8 bg-white text-center">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                            <img src={logo} alt="SkillX Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-display font-bold text-slate-800">SkillX</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-400 mb-12">
                        <a href="#" className="hover:text-slate-900 transition-colors">Twitter (X)</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Discord</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">TikTok</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
                    </div>
                    <p className="text-xs text-slate-300 font-bold">© 2026 SKILLX PLATFORM. DESIGNED WITH MAGIC. ✨</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

