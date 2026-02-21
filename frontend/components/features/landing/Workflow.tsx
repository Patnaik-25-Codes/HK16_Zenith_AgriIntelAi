'use client';

import { motion } from 'framer-motion';

export function Workflow() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-agri-green font-mono text-sm tracking-wider uppercase">How It Works</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-display mt-2">From Harvest to Profit</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-agri-green/50 to-transparent hidden md:block -z-10" />

                    {[
                        { step: "01", title: "Harvest", desc: "Input crop details" },
                        { step: "02", title: "Analyze", desc: "AI models process data" },
                        { step: "03", title: "Decide", desc: "Get actionable insights" },
                        { step: "04", title: "Profit", desc: "Sell at peak price" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center bg-[#050505] p-4 z-10 my-4 md:my-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-agri-green/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <span className="text-xl font-bold font-mono text-agri-green">{item.step}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}