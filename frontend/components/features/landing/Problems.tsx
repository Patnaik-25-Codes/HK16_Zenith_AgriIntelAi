'use client';

import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, CalendarClock } from 'lucide-react';

const problems = [
    {
        icon: AlertTriangle,
        title: "Post-Harvest Losses",
        description: "Up to 40% of crops are lost due to spoilage before they reach the market.",
        color: "text-red-400",
        delay: 0
    },
    {
        icon: TrendingDown,
        title: "Market Volatility",
        description: "Unpredictable price drops force farmers to sell at a loss.",
        color: "text-orange-400",
        delay: 0.1
    },
    {
        icon: CalendarClock,
        title: "Poor Planning",
        description: "Lack of data-driven crop rotation leads to soil degradation.",
        color: "text-yellow-400",
        delay: 0.2
    }
];

export function Problems() {
    return (
        <section className="py-24 bg-black/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">The Silent Killers of Profit</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Traditional farming relies on intuition. In a changing climate, that's no longer enough.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {problems.map((problem, idx) => {
                        const Icon = problem.icon;
                        return (
                            <Card
                                key={idx}
                                variant="glass-dark"
                                className="relative overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: problem.delay }}
                            >
                                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100" />

                                <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6`}>
                                    <Icon className={`h-6 w-6 ${problem.color}`} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{problem.description}</p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}