import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, FileText, MessageSquare, CheckCircle, Lock, Sparkles, Send, Zap, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeModule, setActiveModule] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    // Mock Course Data
    const course = {
        title: 'Python Mastery: Zero to Hero',
        progress: 35,
        instructor: 'Alice Dev',
        modules: [
            { id: 0, title: 'Introduction to Python', duration: '15m', completed: true },
            { id: 1, title: 'Setting up Environment', duration: '20m', completed: true },
            { id: 2, title: 'Variables & Data Types', duration: '45m', completed: false },
            { id: 3, title: 'Control Flow (If/Else)', duration: '50m', completed: false, locked: true },
            { id: 4, title: 'Loops & Iterations', duration: '1h 10m', completed: false, locked: true },
        ]
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-8 animate-fade-in-up">

            {/* 1. Sidebar Modules - Glassmorphism */}
            <div className="w-full lg:w-96 flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-slate-800/50 shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
                <div className="p-8 border-b border-slate-100/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30">
                    <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-primary-pink transition-all group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
                    </button>
                    <h2 className="font-display font-[900] text-2xl text-slate-900 dark:text-white leading-tight mb-6 transition-colors">{course.title}</h2>

                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-primary-mint uppercase tracking-widest">{course.progress}% Mastery</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.modules.filter(m => m.completed).length}/{course.modules.length} Steps</span>
                        </div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 transition-colors">
                            <div className="h-full bg-gradient-rainbow rounded-full shadow-[0_0_10px_#FF9BD2]" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {course.modules.map((module, idx) => (
                        <button
                            key={module.id}
                            onClick={() => !module.locked && setActiveModule(idx)}
                            disabled={module.locked}
                            className={`w-full text-left p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 relative group
                                ${activeModule === idx
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl scale-[1.02]'
                                    : module.locked
                                        ? 'opacity-40 cursor-not-allowed bg-slate-50/50 dark:bg-slate-800/50 grayscale'
                                        : 'hover:bg-white/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:shadow-lg'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${module.completed
                                ? 'bg-primary-mint border-primary-mint text-emerald-900'
                                : activeModule === idx ? 'border-primary-pink text-primary-pink animate-pulse' : 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                                }`}>
                                {module.completed ? <CheckCircle size={18} /> : module.locked ? <Lock size={16} /> : <Play size={14} fill="currentColor" />}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-black leading-tight line-clamp-1">{module.title}</div>
                                <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${activeModule === idx ? 'text-slate-400' : 'text-slate-300'}`}>{module.duration}</div>
                            </div>
                            {activeModule === idx && (
                                <div className="absolute right-4 w-2 h-2 bg-primary-pink rounded-full shadow-[0_0_8px_#FF9BD2]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar">

                {/* Video Player - Premium Look */}
                <div className="w-full aspect-video bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl group ring-4 ring-white/50">
                    {!showVideo ? (
                        <>
                            <img
                                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                                alt="Course Thumbnail"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-primary-pink transition-all shadow-2xl group/play"
                                >
                                    <Play size={48} fill="white" className="text-white ml-2 transition-transform group-active/play:scale-90" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <video
                            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                        />
                    )}
                    <div className="absolute top-8 left-8 flex items-center gap-3">
                        <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] border border-white/10">
                            {showVideo ? 'Streaming' : 'Now Playing'}
                        </div>
                    </div>
                    {!showVideo && (
                        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
                            <h3 className="text-white text-3xl font-[900] tracking-tight">{course.modules[activeModule].title}</h3>
                            <p className="text-white/60 text-sm font-medium mt-2">Module {activeModule + 1} • {course.modules[activeModule].duration}</p>
                        </div>
                    )}
                </div>

                {/* Tabbed Content */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Activity Feed & Info (Left 2/3) */}
                    <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
                        <div className="flex gap-10 border-b-2 border-slate-50 dark:border-slate-800 pb-6 mb-8 relative z-10 transition-colors">
                            {['description', 'assessment', 'forum', 'resources'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative
                                        ${activeTab === tab ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute -bottom-[2.1rem] left-0 right-0 h-1 bg-primary-pink rounded-full shadow-[0_0_10px_#FF9BD2] animate-fade-in"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="relative z-10 min-h-[300px]">
                            {activeTab === 'assessment' && (
                                <div className="animate-fade-in-up space-y-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-2xl font-[900] text-slate-800 dark:text-white flex items-center gap-3">
                                            <Sparkles className="text-primary-pink" /> Topic Assessment
                                        </h4>
                                        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            3 Questions • Pass required
                                        </div>
                                    </div>

                                    {!quizSubmitted ? (
                                        <div className="space-y-10">
                                            {[
                                                { q: "What is the primary function of Python's 'def' keyword?", o: ["Define a class", "Define a function", "Define a variable", "Import a library"], c: "Define a function" },
                                                { q: "Which of these is a mutable data type in Python?", o: ["Tuple", "String", "List", "Integer"], c: "List" },
                                                { q: "How do you start a loop in Python?", o: ["for x in y:", "while(true)", "loop through y", "repeat x"], c: "for x in y:" }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-4">
                                                    <h5 className="text-lg font-bold text-slate-700 dark:text-slate-200">{i + 1}. {item.q}</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {item.o.map(opt => (
                                                            <button
                                                                key={opt}
                                                                onClick={() => setQuizAnswers({ ...quizAnswers, [i]: opt })}
                                                                className={`p-4 rounded-2xl text-left font-medium border transition-all ${quizAnswers[i] === opt
                                                                    ? 'bg-primary-pink text-white border-primary-pink shadow-lg'
                                                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:border-primary-pink'}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => setQuizSubmitted(true)}
                                                disabled={Object.keys(quizAnswers).length < 3}
                                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl disabled:opacity-50 hover:scale-105 transition-all"
                                            >
                                                Validate Mastery
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                                            <div className="w-20 h-20 bg-primary-mint rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg shadow-emerald-500/20">🎉</div>
                                            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Mastery Confirmed!</h3>
                                            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">You've successfully completed the assessment for <br /><span className="text-slate-900 dark:text-white font-bold">{course.modules[activeModule].title}</span></p>
                                            <button
                                                onClick={() => {
                                                    setQuizSubmitted(false);
                                                    setQuizAnswers({});
                                                    setActiveTab('description');
                                                    if (activeModule < course.modules.length - 1) setActiveModule(activeModule + 1);
                                                }}
                                                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all"
                                            >
                                                Continue to Next Module
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'description' && (
                                <div className="animate-fade-in-up">
                                    <h4 className="text-2xl font-[900] text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                                        <Award className="text-primary-pink" /> Learning Goals
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium mb-8">In this deep-dive, we explore the core architecture that makes Python so versatile. From object manipulation to memory handling, we'll strip back the layers.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['Advanced Syntax Patterns', 'Memory Management', 'Closure & Decorators', 'Performance Tuning'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-white dark:border-slate-700 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-primary-mint font-black shadow-sm">✓</div>
                                                <span className="text-sm font-black text-slate-700 dark:text-slate-200">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'forum' && (
                                <div className="animate-fade-in-up space-y-8">
                                    <div className="flex gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-white dark:border-slate-700 shadow-inner transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-rainbow flex items-center justify-center text-xl shadow-lg">🦊</div>
                                        <div className="flex-1 space-y-3">
                                            <textarea
                                                placeholder="Join the collective mind..."
                                                className="w-full bg-transparent text-slate-800 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none resize-none"
                                                rows="2"
                                            ></textarea>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white dark:bg-slate-900 px-3 py-1 rounded-lg">#PythonHabits</span>
                                                </div>
                                                <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                                    Post <Send size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { author: 'Sarah S.', emoji: '👩‍🔬', text: 'Does anyone have the link to the Python memory map tool?', time: '2m ago', likes: 12 },
                                            { author: 'Vector AI', emoji: '🤖', text: 'I found that reducing decorator nesting improves readability significantly.', time: '15m ago', likes: 45 },
                                        ].map((post, i) => (
                                            <div key={i} className="flex gap-5 p-2 group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-2xl">
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-2xl shadow-sm">{post.emoji}</div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h5 className="font-black text-slate-800 dark:text-slate-200 text-sm">{post.author}</h5>
                                                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{post.time}</span>
                                                    </div>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{post.text}</p>
                                                    <div className="flex gap-4 mt-3">
                                                        <button className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-primary-pink uppercase transition-colors">Like ({post.likes})</button>
                                                        <button className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 uppercase transition-colors">Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Interactive Code Editor (Right 1/3) */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col font-mono text-sm shadow-2xl relative overflow-hidden group">
                        {/* 3D Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-pink/5 via-transparent to-primary-blue/5 pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10 relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="ml-4 font-bold text-slate-500 text-xs tracking-widest uppercase">SandBox.py</span>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-mint text-emerald-900 rounded-[1rem] text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(153,246,228,0.2)] hover:scale-105 transition-all">
                                Execute <Zap size={14} fill="currentColor" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-2 opacity-90 relative z-10 text-xs font-medium">
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">1</span> <span className="text-pink-400">class</span> <span className="text-blue-300">Avatar</span>:</div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">2</span> <span className="pl-4 text-purple-400">def</span> <span className="text-yellow-200">__init__</span>(self, name):</div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">3</span> <span className="pl-8 text-slate-300">self.name = name</span></div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">4</span> <span className="pl-8 text-slate-300">self.xp = 0</span></div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">5</span> </div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">6</span> <span className="text-slate-500"># Evolution engine start</span></div>
                            <div className="flex"><span className="text-slate-600 w-10 select-none border-r border-white/5 mr-4">7</span> user = Avatar(<span className="text-primary-mint">"SkillX_Dev"</span>)</div>
                        </div>

                        <div className="mt-10 p-6 bg-black/40 rounded-3xl border border-white/5 relative z-10 transition-all group-hover:bg-black/60">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary-mint rounded-full animate-pulse"></div> Output Console
                            </div>
                            <div className="text-primary-mint font-bold text-sm">Initializing SkillBot Evolution Engine...</div>
                            <div className="text-white/60 font-bold text-sm mt-1">Ready for input.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;

