"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Scene3D to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-brand-accent backdrop-blur-sm mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-brand-accent mr-2 animate-pulse"></span>
                        Coming Soon
                    </div>

                    <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        A Gym for Your Brain to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                            Fight AI Fatigue
                        </span>
                    </h1>

                    <p className="max-w-2xl text-lg leading-8 text-zinc-400 mb-10">
                        Reclaim your cognitive edge. Structured like a workout, designed for your mind.
                        Train focus, working memory, and cognitive flexibility in just 10 minutes a day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-sm hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                            Start Training
                        </button>
                        <button className="text-sm font-semibold leading-6 text-white hover:text-brand-accent transition-colors">
                            Learn more <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            {/* Hero Image (Brain 3D) */}
            <div className="mt-16 relative z-10 flex justify-center h-[500px] w-full">
                <div className="relative w-full max-w-3xl h-full">
                    <Scene3D />
                </div>
            </div>
        </section>
    );
}
