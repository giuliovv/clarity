import { Brain, Zap, Layers } from "lucide-react";

const features = [
    {
        name: "Deep Focus",
        description: "Train your ability to maintain attention on a single task without distraction.",
        icon: Zap,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        name: "Working Memory",
        description: "Expand your capacity to hold and manipulate information in your mind.",
        icon: Layers,
        color: "text-brand-accent",
        bg: "bg-brand-accent/10",
    },
    {
        name: "Cognitive Flexibility",
        description: "Improve your brain's ability to switch between concepts and adapt to new information.",
        icon: Brain,
        color: "text-brand-secondary",
        bg: "bg-brand-secondary/10",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-white/5">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Target Core Executive Functions
                    </h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Just like a gym targets specific muscle groups, Clarity targets the fundamental systems of your brain.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.name}
                            </h3>
                            <p className="text-center text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
