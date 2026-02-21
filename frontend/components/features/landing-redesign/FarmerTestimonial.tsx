'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function FarmerTestimonial() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
                    style={{ backgroundImage: "url('/assets/images/farmer-testimonial.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Quote className="h-12 w-12 text-agri-gold mx-auto mb-8 opacity-50" />
                    <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-10 text-white/90">
                        "Before AgriIntel, I was guessing when to sell. Last season, I waited 3 days on their advice and made an extra ₹45,000 profit."
                    </h2>
                    <div>
                        <p className="text-xl font-bold text-white">Rajesh Patil</p>
                        <p className="text-agri-gold">Tomato Farmer, Maharashtra</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}