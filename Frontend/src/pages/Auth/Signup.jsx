import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Sparkles, Zap, Check } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: '',
        password: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Signup failed');

            // Redirect to login
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Header Area */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-pink-500/10 hover:scale-110 transition-transform cursor-pointer overflow-hidden p-2">
                        <img src={logo} alt="SkillX Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-4xl font-display font-[900] text-slate-900 dark:text-white mb-2 tracking-tight">Create <span className="text-transparent bg-clip-text bg-gradient-rainbow">Account</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Join the magic ecosystem today ✨</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 animate-fade-in-up transition-colors duration-300">

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    name="fullname"
                                    type="text"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <UserPlus size={18} />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="TheWizard"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="magic@skillx.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Secure Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4 py-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${agreedToTerms ? 'bg-primary-pink border-primary-pink' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                                        {agreedToTerms && <Check size={14} className="text-white" strokeWidth={4} />}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary-pink transition-colors underline decoration-primary-pink/20">I agree to every rule and regulations</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={isAgeVerified}
                                        onChange={(e) => setIsAgeVerified(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isAgeVerified ? 'bg-primary-blue border-primary-blue' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                                        {isAgeVerified && <Check size={14} className="text-white" strokeWidth={4} />}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary-blue transition-colors underline decoration-primary-blue/20">I am 15 or 15 years above</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !agreedToTerms || !isAgeVerified}
                            className="w-full group relative py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden disabled:opacity-50 disabled:grayscale disabled:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? 'Initializing Portal...' : (
                                    <>
                                        Launch SkillX <Zap size={18} fill="currentColor" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                            Already part of the magic?{' '}
                            <Link to="/login" className="text-primary-pink hover:underline underline-offset-4 decoration-2">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
