'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { FieldDivider } from '@/components/ui/design-system/FieldDivider';

export function TurningPointSection() {
    return (
        <section className="min-h-screen bg-[#0D1211] relative py-24 flex flex-col justify-center overflow-hidden">
            {/* Divider */}
            <div className="absolute top-0 w-full rotate-180 z-10 text-[#0F1115]">
                <FieldDivider />
            </div>

            <div className="container mx-auto px-6 text-center z-20">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold font-display mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    What if you knew the <span className="text-agri-green">right time</span> to sell?
                </motion.h2>

                <div className="relative max-w-4xl mx-auto h-[400px] border-l border-b border-white/10 bg-white/5 rounded-tr-3xl">

                    {/* SVG Graph Animation */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">

                        {/* Spoilage Line (Red - Linear Decline/Increase) */}
                        <motion.path
                            d="M0,350 L800,200"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            initial={{ pathLength: 0, opacity: 0.5 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Price Line (Green - Exponential Growth) */}
                        <motion.path
                            d="M0,400 Q400,350 800,50"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Intersection Marker (calculated approx at 60% width) */}
                        <foreignObject x="60%" y="30%" width="200" height="200" className="overflow-visible">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                                className="relative"
                            >
                                {/* Ripple Effect */}
                                <div className="absolute -inset-4 bg-agri-gold/20 rounded-full animate-ping" />
                                <div className="absolute -inset-8 bg-agri-gold/10 rounded-full animate-ping [animation-delay:0.2s]" />

                                {/* Point */}
                                <div className="w-4 h-4 bg-agri-gold rounded-full shadow-[0_0_20px_#D4AF37] relative z-10 mx-auto" />
                            </motion.div>
                        </foreignObject>
                    </svg>

                    {/* Floating Badge (Absolute Positioned manually to match visual intersection) */}
                    <motion.div
                        className="absolute left-[55%] bottom-[45%] flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        <div className="p-4 bg-[#0F1115]/80 backdrop-blur-md border border-agri-gold rounded-xl mb-2 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center gap-3">
                            <div className="p-2 bg-agri-gold/20 rounded-lg">
                                <TrendingUp className="text-agri-gold h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-agri-gold uppercase font-bold tracking-wider">Optimal Sell Point</p>
                                <p className="text-white font-bold text-lg">+ 22% Profit</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Axis Labels */}
                    <div className="absolute bottom-[-40px] w-full flex justify-between text-gray-500 text-sm font-medium px-4">
                        <span>Harvest Day</span>
                        <span>Day 7</span>
                        <span>Day 14 (Risk Critical)</span>
                    </div>
                </div>
            </div>
        </section>
    );
}