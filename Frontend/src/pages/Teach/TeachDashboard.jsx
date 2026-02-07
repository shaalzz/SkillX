import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, BookOpen, Plus, Calendar, TrendingUp, Sparkles, Star, BarChart3, Settings } from 'lucide-react';

const TeachDashboard = () => {
    const [isForgeModalOpen, setIsForgeModalOpen] = React.useState(false);
    const [selectedTopic, setSelectedTopic] = React.useState('');
    const navigate = useNavigate();

    const topSkills = ['Python', 'JavaScript', 'Web Development', 'UI/UX Design', 'Data Science'];

    const handleForgeStart = () => {
        if (!selectedTopic) return;
        navigate(`/learn/capability-test?mode=teacher&subject=${encodeURIComponent(selectedTopic)}`);
    };

    return (
        <div className="space-y-12 animate-fade-in-up">
            {/* Forge Modal */}
            {isForgeModalOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsForgeModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl w-full max-w-lg transition-all animate-scale-in">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Forge New Course 🛠️</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Select your specialization to begin verification.</p>

                        <div className="grid grid-cols-2 gap-3 mb-10">
                            {topSkills.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => setSelectedTopic(skill)}
                                    className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${selectedTopic === skill
                                        ? 'bg-primary-pink text-white border-primary-pink shadow-lg'
                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-transparent hover:border-slate-200'}`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleForgeStart}
                            disabled={!selectedTopic}
                            className="w-full py-4 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl disabled:opacity-50 hover:scale-105 transition-all"
                        >
                            Start Verification
                        </button>
                    </div>
                </div>
            )}

            {/* Header / Intro */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-mint/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2 text-primary-mint font-black text-[10px] uppercase tracking-[0.3em]">
                        Professor Protocol Active <div className="w-1.5 h-1.5 bg-primary-mint rounded-full animate-pulse"></div>
                    </div>
                    <h1 className="text-4xl font-display font-[900] text-slate-900 dark:text-white tracking-tight transition-colors">Teaching command Center</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Manage your educational impact and credit ecosystem.</p>
                </div>
                <button
                    onClick={() => setIsForgeModalOpen(true)}
                    className="relative z-10 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-[900] text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group"
                >
                    <div className="w-6 h-6 bg-white/20 dark:bg-slate-900/20 rounded-lg flex items-center justify-center group-hover:bg-primary-pink transition-colors">
                        <Plus size={16} />
                    </div>
                    Forge New Course
                </button>
            </header>

            {/* High-Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Network Reach', value: '1.2k', sub: 'Total Students', icon: Users, color: 'blue' },
                    { label: 'Active Orbs', value: '12', sub: 'Course Modules', icon: BookOpen, color: 'purple' },
                    { label: 'Credit flow', value: '4.8k', sub: 'Monthly Earnings', icon: DollarSign, color: 'mint' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-slate-950/50 transition-all group cursor-default relative overflow-hidden">
                        <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700`}>
                            <stat.icon size={120} />
                        </div>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color === 'blue' ? 'blue-50' : stat.color === 'purple' ? 'purple-50' : 'emerald-50'} dark:bg-slate-800 flex items-center justify-center text-${stat.color === 'blue' ? 'blue-600' : stat.color === 'purple' ? 'purple-600' : 'emerald-600'} dark:text-primary-pink shadow-inner border border-white dark:border-slate-700`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tight transition-colors">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">{stat.sub}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content: Performance & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Performance Analytics */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative transition-colors duration-300">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-widest transition-colors">
                            <TrendingUp size={22} className="text-primary-blue" /> Course Resonance
                        </h3>
                        <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <BarChart3 size={20} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* ... existing maps ... */}
                        {[
                            { title: 'Python Basics: The Catalyst', rating: 4.9, students: 450, growth: '+12%', color: 'bg-primary-pink' },
                            { title: 'React 19 Hooks Deep Dive', rating: 4.8, students: 320, growth: '+25%', color: 'bg-primary-blue' },
                            { title: 'SVG Animation Mastery', rating: 5.0, students: 180, growth: '+8%', color: 'bg-primary-mint' },
                        ].map((course, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/50 border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-[900] text-slate-900 dark:text-white group-hover:text-primary-pink transition-colors">{course.title}</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1 text-yellow-500 font-black text-sm"><Star size={14} fill="currentColor" /> {course.rating}</span>
                                            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">• {course.students} Students active</span>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black">{course.growth}</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">
                                        <span>Resource Consumption</span>
                                        <span>88% Efficiency</span>
                                    </div>
                                    <div className="h-4 bg-white/50 dark:bg-slate-900/50 rounded-full overflow-hidden p-1 shadow-inner border border-slate-100 dark:border-slate-800 transition-colors">
                                        <div className={`h-full ${course.color} rounded-full shadow-lg`} style={{ width: '88%' }}></div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all"><Settings size={16} /></button>
                                    <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 transition-all">Studio Mode</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lateral Actions */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl group transition-all duration-500">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <Calendar size={56} className="mb-6 text-primary-pink animate-bounce-slow" />
                        <h3 className="text-2xl font-[900] mb-3 leading-tight">Sync Live <br />Session</h3>
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-8 leading-relaxed transition-colors">Broadcast your knowledge directly to your network in real-time.</p>
                        <button className="w-full py-4 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-[1.5rem] font-[900] text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.03] transition-all">
                            Open Stream
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm transition-colors">Peer Resonance</h3>
                            <Users size={18} className="text-primary-blue" />
                        </div>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-white dark:border-slate-700 group-hover:scale-110 transition-transform">👤</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-black text-slate-800 dark:text-white group-hover:text-primary-pink transition-colors">Digital Soul {i}</div>
                                        <div className="text-[10px] text-yellow-500 font-bold">⭐⭐⭐⭐⭐</div>
                                    </div>
                                    <div className="text-[10px] text-slate-300 dark:text-slate-600 font-black">2h ago</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-primary-pink transition-colors border-t border-slate-50 dark:border-slate-800 pt-6">
                            View All Feedbacks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachDashboard;

