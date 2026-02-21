'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-agri-green/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-agri-teal/20 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-agri-green animate-pulse" />
                    <span className="text-sm font-medium text-white/80">AI Model v2.0 Live</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="block text-white">Reduce Losses.</span>
                    <span className="bg-gradient-to-r from-agri-green via-agri-teal to-sunlight bg-clip-text text-transparent">
                        Maximize Profit.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    The first AI-powered post-harvest intelligence platform designed to help farmers and aggregators make smarter crop decisions.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/auth">
                        <Button size="lg" className="group">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Button variant="secondary" size="lg">
                        View Demo
                        <ChevronRight className="ml-2 h-5 w-5 opacity-50" />
                    </Button>
                </motion.div>

                {/* Floating Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    className="mt-20 mx-auto max-w-4xl relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-agri-green via-agri-teal to-sunlight rounded-2xl blur opacity-30" />
                    <div className="relative rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                        {/* Mock UI for landing preview */}
                        <div className="text-gray-500 font-mono text-sm">
                            [Dashboard Interface Preview]
                        </div>
                        {/* We could add an actual image here later using generate_image */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}