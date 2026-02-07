import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const SkillBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I am SkillBot. How can I help you today? ✨' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const KNOWLEDGE_BASE = {
        "skillx": "SkillX is a magic-powered learning ecosystem where you can learn new skills, teach others, and grow your digital companion! ✨",
        "credits": "You can earn credits by completing courses, passing capability tests, or teaching others. Credits unlock premium content and avatar upgrades! 🪙",
        "avatar": "Your companion evolves as you learn! Feed, train, and study to keep it happy and high-energy. 🦊",
        "react": "React is a powerful library for building UI. In SkillX, we use it to create this magical experience! ⚛️",
        "python": "Python is the backbone of our server. It's great for AI, Data Science, and automation! 🐍",
        "help": "I can help you with platform info, credit tracking, or just chat! Try asking 'What is SkillX?' or 'How to earn credits?'",
        "hello": "Hi there, magic learner! Ready to expand your stats today? 🚀",
        "thank": "You're very welcome! Keep shining! ✨"
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const lowInput = input.toLowerCase();
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Logic to find best match
        let response = "That's a great question! I'm still learning about that, but I can tell you about SkillX, Credits, or Avatars! 📚";

        for (const key in KNOWLEDGE_BASE) {
            if (lowInput.includes(key)) {
                response = KNOWLEDGE_BASE[key];
                break;
            }
        }

        setTimeout(() => {
            setIsTyping(false);
            const botMsg = { role: 'bot', text: response };
            setMessages(prev => [...prev, botMsg]);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-gradient-rainbow rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform animate-bounce-slow"
                >
                    <MessageSquare size={28} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 transition-colors duration-300">
                    {/* Header */}
                    <div className="bg-slate-900 dark:bg-slate-950 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-rainbow rounded-xl flex items-center justify-center">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <div className="font-bold">SkillBot</div>
                                <div className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                    AI ACTIVE
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-slate-900 dark:bg-primary-pink text-white rounded-tr-none shadow-md'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-primary-pink rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-mint rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border-none outline-none p-3 rounded-xl text-sm focus:ring-2 focus:ring-primary-pink transition-all text-slate-900 dark:text-white dark:placeholder:text-slate-500"
                        />
                        <button
                            onClick={handleSend}
                            className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:scale-105 transition-transform"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillBot;
