import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Award, Users, Search, Sparkles, TrendingUp, Filter } from 'lucide-react';

const CommunityHub = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Maria S.',
            avatar: '👩',
            level: 5,
            content: 'Just completed JavaScript Advanced! 🎉 It was challenging but the interactive modules really helped. #TodayILearned #JavaScript',
            time: '2 hours ago',
            likes: 45,
            comments: 12,
            liked: false,
            tags: ['#JavaScript', '#Learning']
        },
        {
            id: 2,
            author: 'Alex Chen',
            avatar: '👨',
            level: 7,
            content: 'Hosting a study group for Python Data Science this weekend. Anyone interested in joining? We will cover Pandas and NumPy basics. 📊',
            time: '5 hours ago',
            likes: 32,
            comments: 8,
            liked: true,
            tags: ['#Python', '#StudyGroup']
        }
    ]);

    const handleLike = (id) => {
        setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-fade-in-up">

            {/* Left Sidebar: Collective Identity (Groups) */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                        <Users size={60} />
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3 text-sm uppercase tracking-widest relative z-10 transition-colors">
                        <Users size={20} className="text-primary-blue" /> Synergy Groups
                    </h3>
                    <div className="space-y-5 relative z-10">
                        {['Python Devs', 'UI/UX Collective', 'Growth Hackers'].map((group, i) => (
                            <button key={i} className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group/item">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover/item:scale-110 group-hover/item:shadow-xl transition-all">
                                    {['🐍', '🎨', '🚀'][i]}
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-black text-slate-800 dark:text-white transition-colors">{group}</div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">1.2k Active</div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 text-[10px] font-black text-primary-blue dark:text-primary-pink uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-primary-pink/10 rounded-xl transition-colors">
                        Expand Network
                    </button>
                </div>

                <div className="bg-gradient-to-br from-primary-pink to-[#FF7EB3] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-pink-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-700">
                        <Award size={80} />
                    </div>
                    <Award size={32} className="mb-6 animate-bounce-slow" />
                    <h3 className="font-black text-xl mb-3 leading-tight">Weekly Quest:<br />30 Days of SVG</h3>
                    <p className="text-sm font-medium opacity-90 mb-6 leading-relaxed">Collaborative project build sprint for the community.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 p-3 rounded-xl mb-6 backdrop-blur-md">
                        <Users size={14} /> 2,345 Participating
                    </div>
                    <button className="w-full py-4 bg-white text-primary-pink rounded-2xl font-[900] text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.03] transition-all">
                        Accept Quest
                    </button>
                </div>
            </div>

            {/* Main Feed Area (Middle 2 Cols) */}
            <div className="lg:col-span-2 space-y-10">

                {/* Evolution Pulse Generator (Post Creator) */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors duration-300">
                    <div className="flex gap-6 relative z-10">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-white dark:border-slate-700 group-hover:scale-105 transition-transform">
                            🦊
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="relative">
                                <textarea
                                    placeholder="Broadcast your learning breakthrough..."
                                    className="w-full bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl p-6 text-slate-800 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-primary-pink/10 transition-all resize-none min-h-[100px] shadow-inner"
                                ></textarea>
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Sparkles className="text-primary-pink opacity-30" size={20} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-4">
                                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Filter size={18} /></button>
                                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Search size={18} /></button>
                                </div>
                                <button className="px-10 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-[900] text-xs uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/50">
                                    Pulse Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pulse Stream (Posts) */}
                <div className="space-y-10">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:hover:shadow-slate-950/50 transition-all duration-500 group relative">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-sm border border-white dark:border-slate-700 group-hover:scale-110 transition-transform duration-500">
                                        {post.avatar}
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900 dark:text-white text-lg group-hover:text-primary-pink transition-colors">{post.author}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">LVL {post.level} • {post.time}</div>
                                    </div>
                                </div>
                                <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"><Share2 size={18} /></button>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 text-lg font-medium leading-[1.8] whitespace-pre-line mb-8 px-2 transition-colors">
                                {post.content}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 px-2">
                                {post.tags?.map((tag, idx) => (
                                    <span key={idx} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 cursor-default transition-colors">{tag}</span>
                                ))}
                            </div>

                            <div className="flex items-center gap-10 border-t border-slate-50 dark:border-slate-800 pt-8 mt-2 px-2 transition-colors">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${post.liked ? 'text-primary-pink' : 'text-slate-400 dark:text-slate-500 hover:text-primary-pink'} `}
                                >
                                    <div className={`w-10 h-10 rounded-[1.2rem] flex items-center justify-center border transition-all ${post.liked ? 'bg-pink-50 dark:bg-primary-pink/10 border-primary-pink shadow-lg shadow-pink-500/10' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 group-hover:border-primary-pink/30'} `}>
                                        <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                                    </div>
                                    {post.likes} Resonance
                                </button>
                                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-primary-blue dark:hover:text-primary-pink transition-all">
                                    <div className="w-10 h-10 rounded-[1.2rem] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:border-primary-blue/30 dark:group-hover:border-primary-pink/30 transition-all">
                                        <MessageCircle size={20} />
                                    </div>
                                    {post.comments} Thoughts
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar: Mentorship & Trends */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group transition-colors duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                        <Sparkles size={60} />
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3 text-sm uppercase tracking-widest relative z-10 transition-colors">
                        <Sparkles size={20} className="text-primary-pink" /> Elite Mentors
                    </h3>
                    <div className="space-y-6 relative z-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 group/mentor">
                                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white dark:border-slate-700 group-hover/mentor:scale-110 transition-transform">🎓</div>
                                <div className="flex-1">
                                    <div className="text-sm font-black text-slate-900 dark:text-white leading-tight transition-colors">Sensei {i}</div>
                                    <div className="text-[10px] text-primary-pink font-bold uppercase tracking-widest mt-0.5">Python Expert</div>
                                </div>
                                <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-primary-blue dark:text-primary-pink hover:bg-primary-blue dark:hover:bg-primary-pink hover:text-white dark:hover:text-white rounded-xl transition-all shadow-sm">
                                    <Users size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                    <h3 className="font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3 text-sm uppercase tracking-widest transition-colors">
                        <TrendingUp size={20} className="text-primary-mint" /> Trending Orbs
                    </h3>
                    <div className="space-y-3">
                        {['#ThreeJS', '#RustMastery', '#ViteCore', '#DesignSystems'].map((tag, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <span className="text-xs font-black text-slate-500 dark:text-slate-400 group-hover:text-primary-mint transition-colors tracking-tight">{tag}</span>
                                <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">842 Posts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityHub;

