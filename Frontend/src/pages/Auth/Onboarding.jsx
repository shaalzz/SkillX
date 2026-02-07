import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAvatar } from '../../context/AvatarContext';
import { Check, ChevronRight, User, BookOpen, GraduationCap, Briefcase, Sparkles, Zap } from 'lucide-react';

const Onboarding = () => {
    const { user, updateUser } = useAuth();
    const { createAvatar } = useAvatar();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [avatarConfig, setAvatarConfig] = useState({ species: 'PixelFox', color: '#ff9bd2' });
    const [formData, setFormData] = useState({
        college: '',
        department: '',
        year: '',
        user_category: '', // student, ug, pg, working, others
        profession: '',
        skills_have: [],
        skills_learn: []
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleSkill = (type, skill) => {
        const key = type === 'teach' ? 'skills_have' : 'skills_learn';
        setFormData(prev => {
            const current = prev[key];
            if (current.includes(skill)) {
                return { ...prev, [key]: current.filter(s => s !== skill) };
            } else {
                return { ...prev, [key]: [...current, skill] };
            }
        });
    };

    const skillOptions = [
        "Python", "Java", "C", "C++", "HTML", "CSS", "JavaScript", "SQL",
        "Machine Learning", "Data Science", "UI/UX", "Web Development",
        "App Development", "Cloud Computing", "Cyber Security",
        "Communication Skills", "Exam Preparation"
    ];

    const handleNext = () => {
        if (step < 6) setStep(step + 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/onboarding/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    ...formData
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Onboarding failed');

            // Create Avatar
            createAvatar(avatarConfig.species, avatarConfig.color);

            // Update local user context with new completion status
            updateUser({ onboarding_complete: 1 });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-3xl text-slate-900 dark:text-white font-[900] mb-8 tracking-tight">What describes you <span className="text-transparent bg-clip-text bg-gradient-rainbow">best?</span></h3>
            {[
                { id: 'student', label: 'School Student', icon: User },
                { id: 'ug', label: 'Undergraduate (UG)', icon: GraduationCap },
                { id: 'pg', label: 'Postgraduate (PG)', icon: BookOpen },
                { id: 'working', label: 'Working Professional', icon: Briefcase },
                { id: 'others', label: 'Others', icon: User }
            ].map(opt => (
                <button
                    key={opt.id}
                    onClick={() => { updateForm('user_category', opt.id); handleNext(); }}
                    className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all group hover:scale-[1.02] active:scale-[0.98] ${formData.user_category === opt.id
                        ? 'bg-gradient-rainbow text-white border-transparent shadow-lg shadow-pink-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-pink/30'
                        }`}
                >
                    <div className={`p-3 rounded-xl mr-5 transition-colors ${formData.user_category === opt.id ? 'bg-white/20' : 'bg-white dark:bg-slate-900 shadow-sm'}`}>
                        <opt.icon size={24} className={formData.user_category === opt.id ? 'text-white' : 'text-primary-pink'} />
                    </div>
                    <span className="font-medium">{opt.label}</span>
                    {formData.user_category === opt.id && <Check className="ml-auto text-teal-400" />}
                </button>
            ))}
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h3 className="text-xl text-white font-semibold mb-6">Education Details</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-teal-200 text-sm mb-1">College / School / Workplace</label>
                    <input
                        value={formData.college}
                        onChange={(e) => updateForm('college', e.target.value)}
                        className="w-full bg-black/20 dark:bg-slate-900/50 border border-white/10 dark:border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500"
                        placeholder="Enter name"
                    />
                </div>
                <div>
                    <label className="block text-teal-200 text-sm mb-1">Department / Stream (Optional)</label>
                    <input
                        value={formData.department}
                        onChange={(e) => updateForm('department', e.target.value)}
                        className="w-full bg-black/20 dark:bg-slate-900/50 border border-white/10 dark:border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500"
                        placeholder="e.g. Computer Science"
                    />
                </div>
                <div>
                    <label className="block text-teal-200 text-sm mb-1">Year / Role</label>
                    <input
                        value={formData.year}
                        onChange={(e) => updateForm('year', e.target.value)}
                        className="w-full bg-black/20 dark:bg-slate-900/50 border border-white/10 dark:border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500"
                        placeholder="e.g. 3rd Year or Senior Engineer"
                    />
                </div>
            </div>
            <button onClick={handleNext} disabled={!formData.college} className="w-full mt-6 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
                Continue
            </button>
        </div>
    );

    const renderStep3 = () => (
        <div>
            <h3 className="text-xl text-white font-semibold mb-2">Skills you can Teach 🎓</h3>
            <p className="text-slate-400 text-sm mb-6">Select skills you are proficient in (at least one)</p>
            <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                {skillOptions.map(skill => (
                    <button
                        key={skill}
                        onClick={() => toggleSkill('teach', skill)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.skills_have.includes(skill)
                            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                            : 'bg-white/5 dark:bg-slate-800/50 text-slate-300 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800 border border-white/5 dark:border-slate-700'
                            }`}
                    >
                        {skill} {formData.skills_have.includes(skill) && '✓'}
                    </button>
                ))}
            </div>
            <button onClick={handleNext} disabled={formData.skills_have.length === 0} className="w-full mt-8 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
                Continue
            </button>
        </div>
    );

    const renderStep4 = () => (
        <div>
            <h3 className="text-xl text-white font-semibold mb-2">Skills you want to Learn 🎯</h3>
            <p className="text-slate-400 text-sm mb-6">We'll recommend content based on this</p>
            <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                {skillOptions.map(skill => (
                    <button
                        key={skill}
                        onClick={() => toggleSkill('learn', skill)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.skills_learn.includes(skill)
                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-white/5 dark:bg-slate-800/50 text-slate-300 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800 border border-white/5 dark:border-slate-700'
                            }`}
                    >
                        {skill} {formData.skills_learn.includes(skill) && '✓'}
                    </button>
                ))}
            </div>
            <button onClick={handleNext} disabled={formData.skills_learn.length === 0} className="w-full mt-8 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
                Continue
            </button>
        </div>
    );

    const renderStep5 = () => (
        <div className="text-center">
            <h3 className="text-xl text-white font-semibold mb-2">Create Your Companion 🧬</h3>
            <p className="text-slate-400 text-sm mb-6">Choose a buddy to learn with you!</p>

            <div className="mb-8 p-6 bg-white/5 rounded-2xl flex justify-center">
                {/* Mock Context for preview */}
                <div style={{ transform: 'scale(1.2)' }}>
                    <div className="relative text-[5rem]">
                        {avatarConfig.species === 'PixelFox' && '🦊'}
                        {avatarConfig.species === 'DataBunny' && '🐰'}
                        {avatarConfig.species === 'CodeKitty' && '🐱'}
                        {avatarConfig.species === 'LearnOwl' && '🦉'}
                        <div className={`absolute inset-0 rounded-full blur-xl opacity-50`} style={{ backgroundColor: avatarConfig.color }}></div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm text-teal-200 block mb-3 font-medium">Choose Species</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['PixelFox', 'DataBunny', 'CodeKitty', 'LearnOwl'].map(s => (
                            <button
                                key={s}
                                onClick={() => setAvatarConfig(prev => ({ ...prev, species: s }))}
                                className={`p-3 rounded-xl border transition-all ${avatarConfig.species === s ? 'bg-teal-500/20 border-teal-500' : 'bg-white/5 dark:bg-slate-800 border-white/10 dark:border-slate-700 hover:bg-white/10 dark:hover:bg-slate-700'}`}
                            >
                                <div className="text-2xl mb-1">
                                    {s === 'PixelFox' && '🦊'}
                                    {s === 'DataBunny' && '🐰'}
                                    {s === 'CodeKitty' && '🐱'}
                                    {s === 'LearnOwl' && '🦉'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-teal-200 block mb-3 font-medium">Personality Color</label>
                    <div className="flex justify-center gap-3">
                        {['#ff9bd2', '#60a5fa', '#34d399', '#fbfb8c', '#a78bfa'].map(c => (
                            <button
                                key={c}
                                onClick={() => setAvatarConfig(prev => ({ ...prev, color: c }))}
                                className={`w-8 h-8 rounded-full transition-transform ${avatarConfig.color === c ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={handleNext} className="w-full mt-8 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold">
                Adopt Companion
            </button>
        </div>
    );

    const renderStep6 = () => (
        <div className="text-center py-6">
            <div className="w-24 h-24 bg-gradient-rainbow rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-pink-500/20 animate-bounce-slow">
                <Check size={48} className="text-white" strokeWidth={3} />
            </div>
            <h3 className="text-4xl text-slate-900 dark:text-white font-[900] mb-4 tracking-tight">You're Magic! ✨</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 text-lg">Your profile is ready. We've added <span className="text-slate-900 dark:text-white font-black underline decoration-primary-pink decoration-2">50 Credits</span> to your account!</p>
            <button onClick={handleSubmit} disabled={loading} className="w-full relative group py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                    {loading ? 'Finalizing...' : 'Enter the Portal'}
                </span>
            </button>
        </div>
    );

    const particles = Array.from({ length: 15 });

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 relative overflow-hidden transition-colors duration-500 font-sans">
            {/* Animated Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary-pink/20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="w-full max-w-xl relative z-10">
                {/* Progress Bar */}
                <div className="flex items-center gap-3 mb-12 px-2">
                    {[1, 2, 3, 4, 5, 6].map(s => (
                        <div key={s} className="flex-1 h-2 relative rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                                className={`absolute inset-0 bg-gradient-rainbow transition-transform duration-700 ease-out ${s <= step ? 'translate-x-0' : '-translate-x-full'}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-colors duration-300 animate-fade-in-up">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                    {step === 5 && renderStep5()}
                    {step === 6 && renderStep6()}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
