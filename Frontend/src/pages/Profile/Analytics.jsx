import { BarChart3, TrendingUp, Clock, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Analytics = () => {
    const { stats } = useAuth();

    // Mock Data for graphs (using real daily stats for the first point)
    const weeklyData = [
        { day: 'Mon', hours: 2.5, study: 1.5, teach: 1.0 },
        { day: 'Tue', hours: 4.2, study: 3.0, teach: 1.2 },
        { day: 'Wed', hours: 3.8, study: 2.0, teach: 1.8 },
        { day: 'Thu', hours: 5.1, study: 4.0, teach: 1.1 },
        { day: 'Fri', hours: 2.9, study: 2.0, teach: 0.9 },
        { day: 'Sat', hours: 6.3, study: 5.0, teach: 1.3 },
        { day: 'Today', hours: (stats.total_minutes / 60).toFixed(1), study: (stats.study_minutes / 60).toFixed(1), teach: (stats.teach_minutes / 60).toFixed(1) },
    ];

    const maxHours = Math.max(...weeklyData.map(d => parseFloat(d.hours)));

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white transition-colors">Learning Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400 transition-colors">Track your progress and time spent in the platform.</p>
            </header>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Time', value: '45.2h', icon: Clock, color: 'blue', change: '+12%' },
                    { label: 'Avg / Day', value: '3.8h', icon: Calendar, color: 'purple', change: '+5%' },
                    { label: 'Skills Unlocked', value: '7', icon: TrendingUp, color: 'green', change: '+1' },
                    { label: 'Completion Rate', value: '82%', icon: BarChart3, color: 'pink', change: '+4%' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-950/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 transition-colors`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full transition-colors">
                                <ArrowUpRight size={12} /> {stat.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">{stat.value}</div>
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Studying Trajectory */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-primary-pink rounded-2xl flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white transition-colors">Studying Trajectory</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Focus hours by day</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full flex justify-center">
                                    <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        {d.study}h
                                    </div>
                                    <div
                                        className="w-full max-w-[32px] bg-primary-pink rounded-t-xl transition-all duration-700 hover:brightness-110 shadow-lg shadow-pink-500/10"
                                        style={{ height: `${(d.study / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 mt-4">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teaching Impact */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-primary-blue rounded-2xl flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white transition-colors">Teaching Impact</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mentorship hours allocated</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full flex justify-center">
                                    <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        {d.teach}h
                                    </div>
                                    <div
                                        className="w-full max-w-[32px] bg-primary-blue rounded-t-xl transition-all duration-700 hover:brightness-110 shadow-lg shadow-blue-500/10"
                                        style={{ height: `${(d.teach / 2.5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 mt-4">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Radar/Radar Mock with Progress */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white transition-colors">Skill Resonance</h3>
                        <p className="text-sm font-medium text-slate-500">Your ability distribution across domains.</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-mint/10 text-primary-mint rounded-2xl flex items-center justify-center">
                        <Sparkles size={24} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        {[
                            { skill: 'Development', percentage: 85, color: 'blue' },
                            { skill: 'Design', percentage: 60, color: 'pink' },
                            { skill: 'Marketing', percentage: 45, color: 'green' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                                    <span>{s.skill}</span>
                                    <span>{s.percentage}%</span>
                                </div>
                                <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors">
                                    <div
                                        className={`h-full bg-${s.color}-500 rounded-full transition-all duration-1000`}
                                        style={{ width: `${s.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-6">
                        {[
                            { skill: 'Soft Skills', percentage: 75, color: 'yellow' },
                            { skill: 'Data Science', percentage: 30, color: 'purple' },
                            { skill: 'Management', percentage: 55, color: 'blue' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                                    <span>{s.skill}</span>
                                    <span>{s.percentage}%</span>
                                </div>
                                <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors">
                                    <div
                                        className={`h-full bg-${s.color}-500 rounded-full transition-all duration-1000`}
                                        style={{ width: `${s.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
