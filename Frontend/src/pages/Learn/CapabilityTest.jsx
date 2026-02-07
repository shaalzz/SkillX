import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Brain, Trophy, Timer } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CapabilityTest = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = searchParams.get('mode'); // 'teacher' or null
    const subjectParam = searchParams.get('subject');

    const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Result
    const [answers, setAnswers] = useState({});
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [isPassed, setIsPassed] = useState(false);

    const QUESTION_POOL = {
        "Python": {
            easy: [
                { text: "What is the correct file extension for Python files?", options: [".py", ".pyt", ".python", ".pyc"], correct: ".py" },
                { text: "Which keyword is used to create a function in Python?", options: ["func", "def", "function", "define"], correct: "def" },
                { text: "How do you insert comments in Python code?", options: ["//", "#", "/*", "<!--"], correct: "#" }
            ],
            medium: [
                { text: "What is the output of 'print(2 ** 3)'?", options: ["6", "8", "9", "5"], correct: "8" }
            ],
            hard: [
                { text: "What is the purpose of '__init__' in a Python class?", options: ["To delete an object", "To initialize object attributes", "To import a module", "To define a private method"], correct: "To initialize object attributes" },
                { text: "Which of these is a Python decorator?", options: ["@func", "#func", "$func", "!func"], correct: "@func" }
            ]
        },
        "JavaScript": {
            easy: [
                { text: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], correct: "<script>" },
                { text: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')", "console.log('Hello World')"], correct: "alert('Hello World')" },
                { text: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], correct: "=" }
            ],
            medium: [
                { text: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Facebook"], correct: "Netscape" }
            ],
            hard: [
                { text: "What is the result of 'typeof null'?", options: ["'null'", "'undefined'", "'object'", "'number'"], correct: "'object'" },
                { text: "What is a closure in JavaScript?", options: ["A way to lock a variable", "A function with its lexical environment", "An object method", "A specific loop structure"], correct: "A function with its lexical environment" }
            ]
        },
        "Web Development": {
            easy: [
                { text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: "Hyper Text Markup Language" },
                { text: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: "<h1>" },
                { text: "Where in an HTML document is the correct place to refer to an external style sheet?", options: ["In the <body> section", "At the end of the document", "In the <head> section", "In the <title> section"], correct: "In the <head> section" }
            ],
            medium: [
                { text: "What does CSS stand for?", options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], correct: "Cascading Style Sheets" }
            ],
            hard: [
                { text: "Which CSS property is used to change the stack order of an element?", options: ["z-index", "stack-order", "order", "level"], correct: "z-index" },
                { text: "What is the DOM in web development?", options: ["Data Object Model", "Document Object Model", "Digital Object Method", "Display Order Mode"], correct: "Document Object Model" }
            ]
        },
        "UI/UX Design": {
            easy: [
                { text: "What does UI stand for?", options: ["User Interface", "User Integration", "User Interaction", "User Illustration"], correct: "User Interface" },
                { text: "Which tool is most popular for UI/UX design?", options: ["Photoshop", "Figma", "Excel", "Visual Studio"], correct: "Figma" },
                { text: "What is the primary goal of UX?", options: ["Visual beauty", "User satisfaction", "Fast loading", "Code efficiency"], correct: "User satisfaction" }
            ],
            medium: [
                { text: "What is a wireframe?", options: ["A high-fidelity mockup", "A structural outline of a page", "A final code prototype", "A database schema"], correct: "A structural outline of a page" }
            ],
            hard: [
                { text: "What is heuristic evaluation?", options: ["A coding test", "A usability inspection method", "A marketing strategy", "A database query"], correct: "A usability inspection method" },
                { text: "What does 'Affordance' mean in design?", options: ["Price of the tool", "Visual clue to function", "Speed of the UI", "Size of icons"], correct: "Visual clue to function" }
            ]
        },
        "Data Science": {
            easy: [
                { text: "Which library is used for data manipulation in Python?", options: ["Pandas", "Request", "Flask", "Django"], correct: "Pandas" },
                { text: "What does CSV stand for?", options: ["Common Suffix Value", "Comma Separated Values", "Computer Syntax Version", "Code System Variable"], correct: "Comma Separated Values" },
                { text: "Which of these is a data visualization library?", options: ["React", "Matplotlib", "Express", "Node"], correct: "Matplotlib" }
            ],
            medium: [
                { text: "What is supervised learning?", options: ["Learning with labeled data", "Learning without guidance", "Learning by playing games", "Manual data entry"], correct: "Learning with labeled data" }
            ],
            hard: [
                { text: "What is an outlier?", options: ["A missing value", "An observational point distant from others", "The average value", "The most frequent value"], correct: "An observational point distant from others" },
                { text: "What is a 'p-value' in statistics?", options: ["Probability value", "Parameter value", "Primary value", "Peak value"], correct: "Probability value" }
            ]
        }
    };

    const startTest = () => {
        // Source skills from user or default or param
        const decodedSubject = subjectParam ? decodeURIComponent(subjectParam) : null;
        const selectedSubject = decodedSubject || (user?.skills_have?.[0]) || "Python";
        const pool = QUESTION_POOL[selectedSubject] || QUESTION_POOL["Python"];

        // Select questions as per rule: 3 easy, 1 medium, 1 hard
        const selected = [
            ...pool.easy.slice(0, 3),
            ...pool.medium.slice(0, 1),
            ...pool.hard.slice(0, 1)
        ];

        setActiveQuestions(selected.sort(() => Math.random() - 0.5));
        setStep(1);
    };

    const handleAnswer = (idx, option) => {
        setAnswers({ ...answers, [idx]: option });
    };

    const calculateScore = () => {
        let score = 0;
        activeQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correct) score++;
        });
        return score;
    };

    const submitTest = () => {
        const score = calculateScore();
        const percentage = (score / activeQuestions.length) * 100;
        const passThreshold = mode === 'teacher' ? 80 : 60; // 80% for teachers, 60% for others

        if (percentage >= passThreshold) {
            setIsPassed(true);
            if (mode === 'teacher') {
                // Unlock teacher status for this subject
                const decodedSubject = decodeURIComponent(subjectParam);
                const currentSubjects = user?.verified_subjects || [];
                if (!currentSubjects.includes(decodedSubject)) {
                    updateUser({ verified_subjects: [...currentSubjects, decodedSubject] });
                }
            } else if (score === activeQuestions.length) {
                // Reward 50 credits only for perfect score in student mode
                const newCredits = (user?.credits || 0) + 50;
                updateUser({ credits: newCredits });
            }
        } else {
            setIsPassed(false);
        }
        setStep(2);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up py-8">
            {step === 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl text-center transition-colors duration-300">
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-colors">
                        <Brain size={40} />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-4 transition-colors">
                        {mode === 'teacher' ? `${decodeURIComponent(subjectParam)} Verification` : 'Capability Assessment'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 transition-colors">
                        {mode === 'teacher'
                            ? `Pass this assessment with >80% to unlock teaching privileges for ${decodeURIComponent(subjectParam)}.`
                            : 'Test your skills to unlock advanced courses and earn extra credits!'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <Timer className="text-blue-500" size={20} />
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 underline decoration-blue-200 dark:decoration-blue-900">10 Minutes</div>
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium font-sans">Est. Duration</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 underline decoration-green-200 dark:decoration-green-900">Multiple Choice</div>
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium font-sans">Format</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="text-orange-500" size={20} />
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 underline decoration-orange-200 dark:decoration-orange-900">
                                    {mode === 'teacher' ? 'Teaching ID' : '50 Credits'}
                                </div>
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium font-sans">Reward</div>
                        </div>
                    </div>

                    <button
                        onClick={startTest}
                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
                    >
                        Start {mode === 'teacher' ? 'Verification' : 'Assessment'} <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {step === 1 && (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 pb-4 border-b border-slate-100 dark:border-slate-800 transition-colors">
                        {mode === 'teacher' ? `${subjectParam} Master Drill` : 'Quick Skill Drill'}
                    </h2>
                    <div className="space-y-10">
                        {activeQuestions.map((q, idx) => (
                            <div key={idx} className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex gap-4 transition-colors">
                                    <span className="text-primary-pink">0{idx + 1}.</span> {q.text}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {q.options.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(idx, opt)}
                                            className={`p-4 rounded-2xl text-left font-medium transition-all border ${answers[idx] === opt
                                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary-pink hover:text-primary-pink'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={submitTest}
                        disabled={Object.keys(answers).length < activeQuestions.length}
                        className="w-full mt-12 py-4 bg-gradient-rainbow text-white rounded-2xl font-bold shadow-xl disabled:opacity-50 transition-all font-sans uppercase tracking-widest text-xs"
                    >
                        Submit Verification
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl text-center transition-colors duration-300">
                    <div className={`w-24 h-24 ${isPassed ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner transition-colors`}>
                        {isPassed ? '🎉' : '❌'}
                    </div>
                    <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-2 transition-colors">
                        {isPassed ? 'Verification Successful!' : 'Verification Failed'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 transition-colors">
                        You scored <span className="text-slate-900 dark:text-white font-bold">{calculateScore()} / {activeQuestions.length}</span>
                        <br />
                        {mode === 'teacher'
                            ? (isPassed ? `You are now verified to teach ${subjectParam}!` : `You need at least 80% to be verified for ${subjectParam}.`)
                            : (isPassed ? 'You passed the skill assessment!' : 'Try again to improve your score!')}
                    </p>

                    {isPassed && mode === 'teacher' && (
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8 inline-block transition-colors">
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase mb-2 tracking-widest transition-colors">Verification Badge Unlocked</div>
                            <div className="flex items-center gap-3 text-slate-800 dark:text-white font-[900] text-lg transition-colors">
                                <div className="w-10 h-10 bg-primary-mint rounded-xl flex items-center justify-center text-white shadow-lg">🎓</div>
                                Official {subjectParam} Mentor
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate(mode === 'teacher' ? '/teach' : '/dashboard')}
                            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
                        >
                            {mode === 'teacher' ? 'Return to Teach Dashboard' : 'Return to Dashboard'}
                        </button>
                        {!isPassed && (
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Retake Test
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CapabilityTest;
