import { CheckCircle2, Lock } from "lucide-react";

const days = [
    { id: 1, status: "completed", label: "Mon" },
    { id: 2, status: "completed", label: "Tue" },
    { id: 3, status: "current", label: "Today" },
    { id: 4, status: "locked", label: "Thu" },
    { id: 5, status: "locked", label: "Fri" },
];

export default function DailyWorkout() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                            Your Daily Cognitive Workout
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8">
                            Build a habit that sticks. Our adaptive path guides you through
                            personalized exercises that evolve as you improve.
                            Feel the difference in just a few weeks.
                        </p>

                        <ul className="space-y-4 text-left inline-block">
                            <li className="flex items-center text-zinc-300">
                                <CheckCircle2 className="h-5 w-5 text-brand-accent mr-3" />
                                <span>Gamified progress tracking</span>
                            </li>
                            <li className="flex items-center text-zinc-300">
                                <CheckCircle2 className="h-5 w-5 text-brand-accent mr-3" />
                                <span>Adaptive difficulty scaling</span>
                            </li>
                            <li className="flex items-center text-zinc-300">
                                <CheckCircle2 className="h-5 w-5 text-brand-accent mr-3" />
                                <span>Detailed performance analytics</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Visual (Path) */}
                    <div className="flex-1 w-full max-w-md">
                        <div className="relative bg-zinc-900/50 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-50"></div>

                            <div className="flex flex-col items-center space-y-6 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-zinc-800 -translate-x-1/2 -z-10"></div>

                                {days.map((day, index) => (
                                    <div key={day.id} className="relative flex items-center w-full justify-center">
                                        <div
                                            className={`
                        w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 transition-all
                        ${day.status === 'completed' ? 'bg-brand-primary border-brand-primary text-white' : ''}
                        ${day.status === 'current' ? 'bg-zinc-900 border-brand-accent text-white shadow-[0_0_20px_rgba(20,184,166,0.5)] scale-110' : ''}
                        ${day.status === 'locked' ? 'bg-zinc-800 border-zinc-700 text-zinc-600' : ''}
                      `}
                                        >
                                            {day.status === 'completed' ? (
                                                <CheckCircle2 className="h-8 w-8" />
                                            ) : day.status === 'locked' ? (
                                                <Lock className="h-6 w-6" />
                                            ) : (
                                                <span className="text-xl font-bold">Go</span>
                                            )}
                                        </div>

                                        <span className="absolute left-4 text-sm text-zinc-500 font-medium w-12 text-right">
                                            {day.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-zinc-500">Current Streak: <span className="text-white font-bold">3 Days</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
