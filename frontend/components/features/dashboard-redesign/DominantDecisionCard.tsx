'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DecisionCardProps {
    decision: 'SELL' | 'WAIT' | 'SPOILED' | 'AWAITING' | string;
    confidence: number;
    waitDays?: number;
}

export function DominantDecisionCard({ decision = 'AWAITING', confidence = 0, waitDays = 0 }: DecisionCardProps) {
    const isWait = decision === 'WAIT';
    const isSell = decision === 'SELL';

    // Choose dynamic text color based on decision
    const textColor = isWait ? 'text-yellow-400' : isSell ? 'text-agri-green' : 'text-gray-400';

    return (
        <Card className={`h-[140px] relative overflow-hidden flex flex-col justify-between border-0 bg-gradient-to-br from-[#1A332A] to-[#2E4A3D] transition-all duration-500`}>
            {/* Specific Green Gradient Background from image */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#456A50]/20 to-transparent" />

            <div className="flex justify-between items-start relative z-10 p-1">
                <span className="text-gray-300 text-sm font-medium">AI Decision</span>
                <Brain className={`h-5 w-5 ${textColor}`} />
            </div>

            <div className="relative z-10">
                <h2 className={`text-3xl font-bold font-display tracking-wide mb-1 ${textColor}`}>
                    {decision}
                </h2>

                {decision === 'AWAITING' ? (
                    <p className="text-sm text-gray-400">Enter data to analyze</p>
                ) : (
                    <p className="text-sm text-gray-200">
                        {isWait ? `Wait ${waitDays} days` : 'Immediate Action'}
                    </p>
                )}
            </div>

            {/* Glow effect */}
            <div className={`absolute top-1/2 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-colors duration-500 ${isWait ? 'bg-yellow-400/20' : isSell ? 'bg-agri-green/20' : 'bg-gray-500/10'}`} />
        </Card>
    );
}
