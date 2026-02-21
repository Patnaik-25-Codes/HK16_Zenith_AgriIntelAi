'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

interface InputPanelProps {
    onAnalyze?: (data: {
        crop: string;
        region: string;
        days_after_harvest: number;
        temperature: number;
        humidity: number;
        current_market_price: number;
    }) => void;
    isLoading?: boolean;
}

export function InputPanel({ onAnalyze, isLoading }: InputPanelProps) {
    const [crop, setCrop] = useState('Potato');
    const [region, setRegion] = useState('National');
    const [daysAfterHarvest, setDaysAfterHarvest] = useState(5);
    const [temperature, setTemperature] = useState(28.5);
    const [humidity, setHumidity] = useState(75.0);
    const [currentMarketPrice, setCurrentMarketPrice] = useState(1950);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnalyze?.({
            crop,
            region,
            days_after_harvest: daysAfterHarvest,
            temperature,
            humidity,
            current_market_price: currentMarketPrice
        });
    };

    return (
        <Card className="bg-[#0E1210] border-white/5 p-6 relative z-10 transition-opacity duration-500">
            <h3 className="text-lg font-bold text-white mb-6">Analysis Input</h3>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-end gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Select Crop</label>
                        <div className="relative">
                            <select
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-agri-green/50"
                            >
                                <option value="Potato">Potato</option>
                                <option value="Rice">Rice</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Tomato">Tomato</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Select Region</label>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-agri-green/50"
                        >
                            <option value="National">National</option>
                            <option value="North India">North India</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Maharashtra">Maharashtra</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Days After Harvest</label>
                        <input
                            type="number"
                            value={daysAfterHarvest}
                            onChange={(e) => setDaysAfterHarvest(Number(e.target.value))}
                            min="0"
                            className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-agri-green/50 placeholder:text-gray-600"
                        />
                        <p className="text-[10px] text-gray-500">Number of days since crop was harvested.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Temperature (°C)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(Number(e.target.value))}
                            className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-agri-green/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Humidity (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={humidity}
                            onChange={(e) => setHumidity(Number(e.target.value))}
                            className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-agri-green/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Current Market Price (₹ / Qtl)</label>
                        <input
                            type="number"
                            value={currentMarketPrice}
                            onChange={(e) => setCurrentMarketPrice(Number(e.target.value))}
                            className="w-full bg-[#1F2937]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-agri-green/50 placeholder:text-gray-600"
                        />
                        <p className="text-[10px] text-gray-500">Current mandi modal price.</p>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full lg:w-auto min-w-[200px] h-[48px] !bg-[#10B981] !bg-none text-black font-bold text-lg hover:!bg-[#059669] border-none shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 transition-all duration-300 transform active:scale-95"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                            Processing ML...
                        </>
                    ) : (
                        <>
                            <Search className="h-5 w-5 mr-2" />
                            Analyze
                        </>
                    )}
                </Button>
            </form>
        </Card>
    );
}
