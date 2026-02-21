'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { HarvestGradientBackground } from '@/components/ui/design-system/HarvestGradientBackground';
import { SunriseGlow } from '@/components/ui/design-system/SunriseGlow';
import { GrainOverlay } from '@/components/ui/design-system/GrainOverlay';
import { useRef } from 'react';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            <GrainOverlay />
            <HarvestGradientBackground />
            <div className="absolute inset-0 bg-black/30 z-[1]" />

            {/* Parallax Field Image */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('/assets/images/field-hero.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/80 via-transparent to-[#0F1115]" />
            </motion.div>

            <SunriseGlow />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight mb-8 drop-shadow-2xl">
                        <span className="block text-white/90">Harvest Smarter.</span>
                        <span className="block text-agri-gold">Earn Better.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                        AI-powered post-harvest intelligence built for <span className="text-white font-medium">real farmers</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-agri-gold text-[#0F1115] hover:bg-agri-amber border-none shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                Enter Dashboard
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                <Play className="h-5 w-5 fill-white" />
                            </div>
                            <span className="font-medium">See How It Works</span>
                        </button>
                    </div>
                </motion.div>

                {/* Floating Metric Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-1/2 right-10 hidden lg:block"
                >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-1 bg-green-500 rounded-full animate-ping" />
                        <p className="text-white/60 text-sm mb-1">User Savings</p>
                        <p className="text-3xl font-bold text-agri-green">₹ 32,000</p>
                        <p className="text-xs text-gray-400 mt-2">Saved This Season</p>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
        </section>
    );
}