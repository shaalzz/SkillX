import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Lock, CheckCircle, Search } from 'lucide-react';

const allCourses = [
    { id: 1, name: 'Python', category: 'Programming', level: 'Beginner', type: 'FREE', video: 'PYTHON.mp4', credit_cost: 0 },
    { id: 2, name: 'Java', category: 'Programming', level: 'Intermediate', type: 'CREDIT', video: 'JAVA.mp4', credit_cost: 10 },
    { id: 3, name: 'C', category: 'Programming', level: 'Beginner', type: 'FREE', video: 'C.mp4', credit_cost: 0 },
    { id: 4, name: 'HTML', category: 'Web Dev', level: 'Beginner', type: 'FREE', video: 'HTML.mp4', credit_cost: 0 },
    { id: 5, name: 'CSS', category: 'Web Dev', level: 'Intermediate', type: 'CREDIT', video: 'CSS.mp4', credit_cost: 5 },
    { id: 6, name: 'Machine Learning', category: 'Data Science', level: 'Advanced', type: 'CREDIT', video: 'MACHINE LEARNING.mp4', credit_cost: 20 },
    { id: 7, name: 'Data Science', category: 'Data Science', level: 'Advanced', type: 'CREDIT', video: 'DATA SCIENCE.mp4', credit_cost: 15 },
    { id: 8, name: 'Aptitude', category: 'General', level: 'All', type: 'FREE', video: 'APTITUDE AND REASONING.mp4', credit_cost: 0 },
    { id: 9, name: 'React', category: 'Web Dev', level: 'Intermediate', type: 'CREDIT', video: 'REACT.mp4', credit_cost: 10 },
    { id: 10, name: 'React Native', category: 'App Dev', level: 'Advanced', type: 'CREDIT', video: 'REACT NATIVE.mp4', credit_cost: 15 },
];

const Courses = () => {
    const { user, updateUser } = useAuth();
    const [activeCourse, setActiveCourse] = useState(null); // Course being watched
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = allCourses.filter(c => {
        const matchesFilter = filter === 'All' || c.category === filter || (filter === 'Premium' && c.type === 'CREDIT') || (filter === 'Free' && c.type === 'FREE');
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleEnroll = async (course) => {
        // Check credits if premium
        if (course.type === 'CREDIT') {
            if ((user.credits || 0) < course.credit_cost) {
                alert(`Insufficient credits! You need ${course.credit_cost} credits.`);
                return;
            }

            const confirmEnroll = window.confirm(`Unlock ${course.name} for ${course.credit_cost} credits?`);
            if (!confirmEnroll) return;

            // Deduct credits calling backend... (simulated here for speed if no direct API endpoint exists for deduction without watching)
            // Actually, let's call the watch API directly when playing, but here we just simulate "unlocking".
            // For now, we'll treat "Enroll" as "Watch" trigger.
        }
        setActiveCourse(course);
    };

    const handleCloseVideo = () => {
        setActiveCourse(null);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Available Courses</h1>
                    <p className="text-slate-500 mt-1">Explore our library of structured learning paths</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-100 w-full md:w-auto">
                    <Search className="text-slate-400 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-6 mb-2 custom-scrollbar">
                {['All', 'Programming', 'Web Dev', 'Data Science', 'App Dev', 'Premium', 'Free'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat
                                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
                        <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500">
                            {/* Placeholder thumbnail based on name */}
                            <div className="text-4xl font-bold text-slate-400 opacity-30">{course.name.substring(0, 2)}</div>

                            {course.type === 'CREDIT' && (
                                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                    <Lock size={12} /> {course.credit_cost} PTS
                                </div>
                            )}
                            {course.type === 'FREE' && (
                                <div className="absolute top-3 right-3 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                    FREE
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <div className="text-xs font-bold text-teal-600 uppercase mb-1">{course.category}</div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{course.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{course.level}</span>
                                <span>• Video Course</span>
                            </div>

                            <button
                                onClick={() => handleEnroll(course)}
                                className="w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors bg-teal-50 text-teal-700 hover:bg-teal-100"
                            >
                                <Play size={18} />
                                {course.type === 'FREE' ? 'Start Learning' : 'Unlock Course'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Modal */}
            {activeCourse && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-black w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900">
                            <h3 className="text-white font-bold">{activeCourse.name}</h3>
                            <button onClick={handleCloseVideo} className="text-slate-400 hover:text-white transition-colors">Close</button>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center">
                            <video
                                controls
                                autoPlay
                                className="w-full h-full"
                                src={`/courses/${activeCourse.video}`} // Using the new /courses route
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
