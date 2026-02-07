import React, { useState } from 'react';
import { Clock, Star, Users, ArrowRight, Sparkles, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillMarketplace = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Tech', 'Design', 'Business', 'Arts', 'Languages'];

    // Mock Data
    const courses = [
        { id: 1, title: 'Python Mastery', category: 'Tech', rating: 4.9, students: 1205, duration: '8h', price: 25, isFree: false, image: '🐍', color: 'blue', level: 'Beginner' },
        { id: 2, title: 'UI/UX Design', category: 'Design', rating: 4.8, students: 850, duration: '6h', price: 30, isFree: false, image: '🎨', color: 'pink', level: 'Intermediate' },
        { id: 3, title: 'Digital Marketing', category: 'Business', rating: 4.7, students: 2300, duration: '5h', price: 0, isFree: true, image: '📈', color: 'green', level: 'Beginner' },
        { id: 4, title: 'Watercolor Basics', category: 'Arts', rating: 4.9, students: 500, duration: '4h', price: 0, isFree: true, image: '🖌️', color: 'yellow', level: 'Beginner' },
        { id: 5, title: 'React for Beginners', category: 'Tech', rating: 4.8, students: 3000, duration: '12h', price: 40, isFree: false, image: '⚛️', color: 'blue', level: 'Advanced' },
        { id: 6, title: 'Spanish A1', category: 'Languages', rating: 4.6, students: 1100, duration: '10h', price: 35, isFree: false, image: '🇪🇸', color: 'red', level: 'Beginner' },
    ];

    const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.category === filter);

    return (
        <div className="space-y-10 animate-fade-in-up">
            {/* 1. Header & Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary-pink font-[900] text-[10px] uppercase tracking-widest">
                        <Sparkles size={14} /> 500+ Skills Available
                    </div>
                    <h1 className="text-4xl font-display font-[900] text-slate-900 dark:text-white transition-colors duration-300">Skill Marketplace</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl transition-colors duration-300">Discover skills taught by expert mentors and unlock your potential with your AI companion.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input placeholder="Search..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-pink/20 outline-none font-medium transition-all text-slate-900 dark:text-white dark:placeholder:text-slate-500" />
                    </div>
                    <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-[1.2rem] border border-slate-100 dark:border-slate-800 shadow-sm w-full sm:w-auto overflow-x-auto no-scrollbar transition-colors duration-300">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/learn/course/${course.id}`)}
                        className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
                    >
                        {/* 3D Content Wrapper */}
                        <div className="relative z-10 bg-white dark:bg-slate-900 rounded-[2rem] p-6 h-full flex flex-col transition-colors duration-300">
                            {/* Course Image Area */}
                            <div className={`aspect-video rounded-3xl bg-${course.color}-100 dark:bg-${course.color}-900/20 mb-6 flex items-center justify-center text-5xl shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500`}>
                                <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm border ${course.isFree ? 'bg-emerald-500/90 text-white border-emerald-400' : 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white border-white dark:border-slate-700'}`}>
                                    {course.isFree ? 'FREE' : `${course.price} ⓒ`}
                                </div>
                                {course.image}
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className={`px-3 py-1 bg-${course.color}-100 text-${course.color}-700 text-[10px] font-black uppercase tracking-widest rounded-full`}>
                                        {course.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 dark:text-slate-500">
                                        <Clock size={12} /> {course.duration}
                                    </div>
                                </div>

                                <h3 className="text-xl font-[900] text-slate-900 dark:text-white group-hover:text-primary-pink transition-colors line-clamp-2 leading-tight">
                                    {course.title}
                                </h3>

                                <div className="flex items-center gap-4 pt-2 border-t border-slate-50 dark:border-slate-800 transition-colors">
                                    <div className="flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        {course.rating}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold text-slate-400 dark:text-slate-500">
                                        <Users size={14} />
                                        {course.students}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-4 bg-slate-50 dark:bg-slate-800/50 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-2 group-hover:shadow-xl">
                                Explore Syllabus <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Background Decoration */}
                        <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-${course.color}-400/5 rounded-full blur-3xl group-hover:bg-${course.color}-400/10 transition-colors`}></div>
                    </div>
                ))}
            </div>

            {/* 3. Empty State (Optional) */}
            {filteredCourses.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-300">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">No courses found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
    );
};

export default SkillMarketplace;

