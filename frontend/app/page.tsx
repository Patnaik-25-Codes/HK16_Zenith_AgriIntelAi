'use client';

// AgriIntel AI Landing Page

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/features/landing-redesign/HeroSection';
import { RealitySection } from '@/components/features/landing-redesign/RealitySection';
import { TurningPointSection } from '@/components/features/landing-redesign/TurningPointSection';
import { IntelligenceEngineSection } from '@/components/features/landing-redesign/IntelligenceEngineSection';
import { DeepFeatureReveal } from '@/components/features/landing-redesign/DeepFeatureReveal';
import { FarmerTestimonial } from '@/components/features/landing-redesign/FarmerTestimonial';
import { FinalCTA } from '@/components/features/landing-redesign/FinalCTA';
import { Footer } from '../components/Footer';

export default function LandingPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-agri-green/30 overflow-x-hidden">
            <Navbar />

            <div className="relative z-10">
                <HeroSection />
                <RealitySection />
                <TurningPointSection />
                <IntelligenceEngineSection />
                <DeepFeatureReveal />
                <FarmerTestimonial />
                <FinalCTA />
                <Footer />
            </div>
        </main>
    );
}
