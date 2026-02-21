'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function RealitySection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = 1200;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(start + (end - start) * ease));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView]);

    return (
        <section ref={containerRef} className="min-h-screen bg-[#0F1115] relative py-24 flex items-center overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Content */}
                <div>
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold font-display mb-8 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Up to <span className="text-red-500">40%</span> of crop value is lost post-harvest.
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Every hour your harvest sits without a plan, its value decays. Market volatility and spoilage are the silent killers of your hard-earned profit.
                    </motion.p>
                </div>

                {/* Right Chart - Custom SVG Animation */}
                <div className="relative h-[400px] w-full bg-white/5 rounded-3xl border border-white/10 p-8 overflow-hidden group hover:border-red-500/20 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />

                    {/* SVG Chart */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="decayGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <motion.path
                            d="M0,20 C50,25 100,40 150,60 C200,80 250,110 300,140 C350,170 400,190 400,200 L400,200 L0,200 Z"
                            fill="url(#decayGradient)"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />

                        {/* Stroke Line */}
                        <motion.path
                            d="M0,20 C50,25 100,40 150,60 C200,80 250,110 300,140 C350,170 400,190 400,200"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Pulsing End Point */}
                        <motion.circle
                            cx="400"
                            cy="200"
                            r="6"
                            fill="#ef4444"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                        </motion.circle>
                    </svg>

                    {/* Stats Overlay */}
                    <div className="absolute top-8 left-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-red-400 text-sm uppercase tracking-widest font-bold">Value Decay</p>
                        </div>
                        <p className="text-4xl font-bold text-white tabular-nums">
                            ₹ {count.toLocaleString()}
                            <span className="text-lg font-normal text-gray-500 ml-2">/quintal lost</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}