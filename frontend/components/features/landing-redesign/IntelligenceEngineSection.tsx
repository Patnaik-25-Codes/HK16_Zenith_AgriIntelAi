'use client';

import { motion } from 'framer-motion';
import { CropIcons } from '@/components/ui/design-system/CropIconSet';
import { Brain, CloudRain, Database } from 'lucide-react';

export function IntelligenceEngineSection() {
    const steps = [
        { icon: CropIcons.Tomato, label: "Harvest Data" },
        { icon: Database, label: "Historical Prices" },
        { icon: Brain, label: "AI Analysis" },
        { icon: CloudRain, label: "Spoilage Risk" },
    ];

    return (
        <section className="py-32 bg-[#0F1115] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-agri-gold font-mono uppercase tracking-widest text-sm">The Engine</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">How AgriIntel Works</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 hidden md:block -z-10" />
                    <motion.div
                        className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-agri-green via-agri-gold to-agri-green hidden md:block -z-10"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ originX: 0 }}
                    />

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="relative z-10 bg-[#0F1115] p-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <div className="h-20 w-20 rounded-2xl bg-[#1A1D23] border border-white/10 flex items-center justify-center mb-4 transition-all hover:border-agri-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                    <Icon className="h-8 w-8 text-white/80" />
                                </div>
                                <p className="text-center font-medium text-gray-300">{step.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}