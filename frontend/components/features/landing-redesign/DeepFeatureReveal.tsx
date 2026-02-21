'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/Card';

const features = [
    {
        title: "Spoilage Risk Prediction",
        desc: "Know exactly how many days your crop has left before quality degrades. Our XGBoost model analyzes temperature, humidity, and time to give you a precise risk score.",
        gradient: "from-amber-500/20 to-transparent",
        image: "/assets/images/ui-preview-Spoilage-Risk-Prediction.png"
    },
    {
        title: "3-Day Price Forecast",
        desc: "Stop selling at a loss. See where the market is heading with 92% accuracy, powered by historical data from your local mandi.",
        gradient: "from-emerald-500/20 to-transparent",
        image: "/assets/images/ui-preview-3-Day-Price-Forecast.png"
    },
    {
        title: "Sustainability Optimizer",
        desc: "Protect your soil for the next generation. Get AI-driven crop rotation plans that regenerate nitrogen and maintain soil health.",
        gradient: "from-blue-500/20 to-transparent",
        image: "/assets/images/ui-preview-Sustainability-Optimizer.png"
    }
];

export function DeepFeatureReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative">
            {features.map((feature, idx) => (
                <FeatureSection key={idx} feature={feature} index={idx} />
            ))}
        </div>
    );
}

function FeatureSection({ feature, index }: { feature: any, index: number }) {
    return (
        <section className="min-h-screen flex items-center sticky top-0 bg-[#0F1115] border-t border-white/5 overflow-hidden">
            {/* Background Tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 pointer-events-none`} />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-6xl font-bold text-white/5 absolute -top-20 -left-10 z-0 select-none">0{index + 1}</span>
                    <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 relative z-10">{feature.title}</h3>
                    <p className="text-xl text-gray-400 leading-relaxed relative z-10">{feature.desc}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8 }}
                >
                    <Card variant="glass-dark" className="aspect-video flex items-center justify-center bg-black/40 border-white/10 p-0 overflow-hidden">
                        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}