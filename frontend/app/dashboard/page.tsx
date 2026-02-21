'use client';

import { useState } from 'react';
import { DashboardMetricCard } from '@/components/features/dashboard-redesign/DashboardMetricCard';
import { DominantDecisionCard } from '@/components/features/dashboard-redesign/DominantDecisionCard';
import { HarvestRingGauge } from '@/components/features/dashboard-redesign/HarvestRingGauge';
import { FarmlandPriceChart } from '@/components/features/dashboard-redesign/FarmlandPriceChart';
import { InputPanel } from '@/components/features/dashboard/InputPanel';
import { Sprout, AlertTriangle, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [decisionData, setDecisionData] = useState<any>(null);

    const handleAnalyze = async (data: any) => {
        setIsAnalyzing(true);
        try {
            const response = await fetch('http://localhost:8000/api/decision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error("API error", await response.text());
                // Handle error state if needed
                return;
            }

            const result = await response.json();
            setDecisionData(result);
        } catch (error) {
            console.error("Failed to fetch decision data", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full space-y-8 relative">

            {/* Overlay for loading state */}
            {isAnalyzing && (
                <div className="absolute inset-0 bg-[#050505]/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-xl transition-all duration-500">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-green mb-4"></div>
                    <p className="text-agri-green font-medium animate-pulse">Running ML Pipeline...</p>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center relative z-10 transition-opacity duration-500">
                <h1 className="text-3xl font-bold font-display tracking-tight text-white">
                    Crop Center
                </h1>
                <span className="text-sm text-emerald-300/70">US • EN</span>
            </div>

            {/* Row 1 — Metrics + Decision */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10 transition-opacity duration-500 ${isAnalyzing ? 'opacity-40' : 'opacity-100'}`}>

                <DashboardMetricCard
                    label="Total Crops Tracked"
                    value="12"
                    icon={Sprout}
                />

                <DashboardMetricCard
                    label="Risk Alerts"
                    value={decisionData?.spoilage_probability > 0.5 ? "1" : "0"}
                    icon={AlertTriangle}
                    alert={decisionData?.spoilage_probability > 0.5}
                />

                <DashboardMetricCard
                    label="Profit Index"
                    value={decisionData ? `${decisionData.profit_index}%` : "--"}
                    icon={TrendingUp}
                    trend={decisionData?.profit_index > 50 ? "up" : "down"}
                />

                <DominantDecisionCard
                    decision={decisionData?.decision || "AWAITING"}
                    confidence={decisionData ? Math.round(decisionData.model_confidence * 100) : 0}
                    waitDays={decisionData?.wait_days || 0}
                />
            </div>

            {/* Row 2 — Chart + Risk */}
            <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 relative z-10 transition-opacity duration-500 ${isAnalyzing ? 'opacity-40' : 'opacity-100'}`}>

                {/* Price Forecast */}
                <div className="xl:col-span-2">
                    <FarmlandPriceChart forecastData={decisionData?.forecast} />
                </div>

                {/* Risk Gauge */}
                <div>
                    <HarvestRingGauge
                        risk={decisionData ? Math.round(decisionData.spoilage_probability * 100) : 0}
                        spoilageClass={decisionData?.spoilage_class || "AWAITING"}
                    />
                </div>

            </div>

            {/* Row 3 — Input Panel */}
            <div className="relative z-20">
                <InputPanel onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
            </div>

        </div>
    );
}
