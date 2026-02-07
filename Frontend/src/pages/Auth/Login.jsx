import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, User, Sparkles, Zap, Mail, Lock, ChevronRight } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Login failed');

            login(data.user);

            // Check onboarding
            const profileRes = await fetch(`/api/profile?user_id=${data.user.id}`);
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                if (!profileData.profile || !profileData.profile.onboarding_complete) {
                    navigate('/onboarding');
                } else {
                    navigate('/dashboard');
                }
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const particles = Array.from({ length: 15 });

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden transition-colors duration-500 font-sans">
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
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-pink/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-blue/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Header Area */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-pink-500/10 hover:scale-110 transition-transform cursor-pointer overflow-hidden p-2">
                        <img src={logo} alt="SkillX Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-4xl font-display font-[900] text-slate-900 dark:text-white mb-2 tracking-tight">Welcome <span className="text-transparent bg-clip-text bg-gradient-rainbow">Back!</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Your digital companion is waiting for you ✨</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 animate-fade-in-up transition-colors duration-300">

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Username or Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="TheMagicLearner"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Secure Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-pink transition-colors">
                                    <LogIn size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-primary-pink/50 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group relative py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? 'Entering Portal...' : (
                                    <>
                                        Launch SkillX <Zap size={18} fill="currentColor" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                            New to the ecosystem?{' '}
                            <Link to="/signup" className="text-primary-pink hover:underline underline-offset-4 decoration-2">
                                Initialize Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
