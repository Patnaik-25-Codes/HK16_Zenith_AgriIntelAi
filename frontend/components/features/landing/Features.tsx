'use client';

import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Brain, LineChart, Sprout, Wind } from 'lucide-react';

const features = [
    {
        title: "Spoilage Prediction",
        desc: "XGBoost classifier predicts crop freshness with 92% accuracy.",
        icon: Wind,
        color: "from-green-400 to-emerald-600"
    },
    {
        title: "Price Forecasting",
        desc: "Know exactly when to sell with 3-day proprietary market prediction.",
        icon: LineChart,
        color: "from-blue-400 to-indigo-600"
    },
    {
        title: "Smart Decision Engine",
        desc: "Get simple 'Sell' or 'Wait' recommendations based on real-time data.",
        icon: Brain,
        color: "from-purple-400 to-pink-600"
    },
    {
        title: "Soil Optimizer",
        desc: "Next-gen crop rotation planning to keep your land fertile.",
        icon: Sprout,
        color: "from-orange-400 to-red-600"
    }
];

export function Features() {
    return (
        <section className="py-24 bg-gradient-to-b from-black/0 to-agri-dark/20">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={idx}
                                className="group relative overflow-hidden border-white/5 bg-white/5 hover:border-white/10"
                            >
                                <div className={`absolute top-0 right-0 p-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full -mr-12 -mt-12`} />

                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.desc}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}