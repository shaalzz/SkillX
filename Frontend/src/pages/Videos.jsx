import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Lock, Star, Sparkles, Filter, Search, Clock } from 'lucide-react';

const Videos = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchVideos();
    }, [user]);

    const fetchVideos = async () => {
        try {
            // Fetch recommendations based on user skills
            const res = await fetch('/api/recommend_videos?user_id=' + (user?.id || 1));
            if (res.ok) {
                const data = await res.json();
                setVideos(data.videos || []);
            } else {
                // Mock fallback for high-vibe demo
                setVideos([
                    { id: 1, title: 'Intro to Quantum Computing', skill: 'Physics', rating: 4.9, cost: 50, premium: true, category: 'Science', views: '1.2k' },
                    { id: 2, title: 'Mastering React 19', skill: 'React', rating: 4.8, cost: 0, premium: false, category: 'Tech', views: '3.5k' },
                    { id: 3, title: 'Neural Network Basics', skill: 'AI', rating: 4.7, cost: 30, premium: true, category: 'Tech', views: '800' },
                ]);
            }
        } catch (err) {
            console.error("Failed to fetch videos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleWatch = async (video) => {
        if (video.premium) {
            if ((user?.credits || 0) < (video.cost || 0)) {
                alert(`Insufficient credits! You need ${video.cost} credits.`);
                return;
            }
        }
        setActiveVideo(video);
    };

    const filteredVideos = videos.filter(v =>
        filter === 'All' || (filter === 'Premium' && v.premium) || (filter === 'Free' && !v.premium)
    );

    return (
        <div className="space-y-10 animate-fade-in-up">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary-pink font-[900] text-[10px] uppercase tracking-widest">
                        <Sparkles size={14} /> Personalized Feed
                    </div>
                    <h1 className="text-4xl font-display font-[900] text-slate-900 dark:text-white transition-colors duration-300">Recommended for You</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl transition-colors duration-300">Interactive content curated by SkillBot based on your current path.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input placeholder="Search library..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-pink/20 outline-none font-medium transition-all text-slate-900 dark:text-white dark:placeholder:text-slate-500" />
                    </div>
                    <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-[1.2rem] border border-slate-100 dark:border-slate-800 shadow-sm w-full sm:w-auto transition-colors duration-300">
                        {['All', 'Premium', 'Free'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-pink"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredVideos.map(video => (
                        <div
                            key={video.id}
                            onClick={() => handleWatch(video)}
                            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
                        >
                            {/* Video Thumbnail Area */}
                            <div className="aspect-video rounded-3xl bg-slate-900 overflow-hidden relative mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-900/80 to-transparent">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary-pink transition-colors">
                                        <Play className="text-white ml-1" size={32} fill="currentColor" />
                                    </div>
                                </div>

                                {video.premium ? (
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-yellow-300 animate-bounce-slow">
                                        <Lock size={12} /> {video.cost} ⓒ
                                    </div>
                                ) : (
                                    <div className="absolute top-4 right-4 bg-primary-mint text-emerald-900 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-emerald-300">
                                        FREE
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white">
                                    {video.category || 'Tutorial'}
                                </div>
                            </div>

                            <div className="px-2 space-y-4">
                                <h3 className="text-xl font-[900] text-slate-900 dark:text-white group-hover:text-primary-pink transition-colors line-clamp-1 leading-tight">
                                    {video.title}
                                </h3>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" /> {video.rating}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">• {video.views} views</div>
                                    </div>
                                    <div className="text-[10px] font-black text-primary-gold dark:text-primary-pink uppercase tracking-widest px-2 py-1 bg-blue-50 dark:bg-primary-pink/20 rounded-lg">
                                        {video.skill}
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 font-medium italic">
                                    Based on your interest in <span className="text-slate-600 font-bold">{video.skill}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal - Glassmorphism */}
            {activeVideo && (
                <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-6xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800 relative animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-rainbow flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                                    <Play size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-[900] text-slate-900 dark:text-white transition-colors">{activeVideo.title}</h3>
                                    <p className="text-xs font-black text-primary-pink uppercase tracking-widest">Watching Now • {activeVideo.skill}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl transition-all font-black"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="aspect-video bg-slate-900 relative">
                            {/* Realistic Video Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                                <Play size={120} strokeWidth={1} />
                                <span className="mt-4 font-black uppercase tracking-[0.5em]">Video Content Protected</span>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">
                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-2"><Clock size={16} /> 45 Minutes Remaining</span>
                                <span className="flex items-center gap-2">Interactive Transcript Available</span>
                            </div>
                            <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                                Download Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;

