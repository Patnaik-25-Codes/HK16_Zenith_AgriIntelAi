'use client';

import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function HarvestRingGauge({ risk = 62, spoilageClass = "Analyzing..." }: { risk?: number, spoilageClass?: string }) {
    const radius = 80;
    // Half circle circumference
    const circumference = Math.PI * radius;
    // We want to fill from left to right (or right to left). 0 is empty, 100 is full.
    // StrokeDasharray = circumference
    // StrokeDashoffset = circumference - (risk / 100) * circumference
    const offset = circumference - (risk / 100) * circumference;

    return (
        <Card className="h-full flex flex-col p-6 bg-[#0E1210] border-white/5 relative z-10 transition-opacity duration-500">
            <h3 className="text-lg font-bold text-white mb-6">Spoilage Risk Analysis</h3>

            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px]">
                <svg className="w-64 h-32 overflow-visible" viewBox="0 0 200 100">
                    {/* Background Track (Arch) */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#1F2937"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Progress Value */}
                    <motion.path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#riskGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference} // Start empty
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="50%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#EF4444" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute bottom-4 flex flex-col items-center translate-y-2 px-2 text-center">
                    <span className={`text-xl font-bold ${spoilageClass === 'Severe spoilage' ? 'text-red-500' :
                            spoilageClass === 'Moderate spoilage' ? 'text-yellow-400' :
                                spoilageClass === 'No spoilage' ? 'text-emerald-500' : 'text-gray-400'
                        }`}>
                        {spoilageClass}
                    </span>
                </div>
            </div>

            <div className="space-y-4 mt-6 w-full">
                <RiskBar label="Time Risk" value={risk > 0 ? Math.min(risk + 10, 100) : 0} color="bg-yellow-400" />
                <RiskBar label="Temperature Input" value={risk > 0 ? Math.min(risk * 1.2, 100) : 0} color="bg-red-500" />
                <RiskBar label="Humidity Input" value={risk > 0 ? Math.max(risk - 10, 0) : 0} color="bg-teal-400" />
            </div>
        </Card>
    );
}

function RiskBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </div>
    )
}
