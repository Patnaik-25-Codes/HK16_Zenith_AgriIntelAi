'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FarmlandPriceChartProps {
    forecastData?: number[];
}

export function FarmlandPriceChart({ forecastData }: FarmlandPriceChartProps) {

    const chartData = useMemo(() => {
        // Base historical data up to today (assuming today is Thursday for the demo)
        const base = [
            { day: 'Mon', price: 1850 },
            { day: 'Tue', price: 1910 },
            { day: 'Wed', price: 1890 },
            { day: 'Thu', price: 1900 }, // Current Day
        ];

        if (!forecastData || forecastData.length < 3) {
            // Default "awaiting data" state
            return [
                ...base,
                { day: 'Fri', price: null },
                { day: 'Sat', price: null },
                { day: 'Sun', price: null },
            ];
        }

        // We have forecast data, append it
        return [
            ...base,
            { day: 'Fri', price: forecastData[0] },
            { day: 'Sat', price: forecastData[1] },
            { day: 'Sun', price: forecastData[2] },
        ];
    }, [forecastData]);

    const nextPrice = forecastData ? forecastData[0] : '--';
    const day3Price = forecastData ? forecastData[2] : '--';

    return (
        <Card className="h-[400px] flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#0B1F17]/50 mix-blend-overlay pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 relative z-10 px-6 pt-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold font-display text-white tracking-tight">Price Forecast</h3>
                    <p className="text-sm text-gray-400 font-light">3-Day Predictive Analysis</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                        <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-wider">Tomorrow</p>
                        <p className="text-xl font-bold text-white">{nextPrice !== '--' ? `₹ ${nextPrice}` : '--'} <span className="text-xs font-normal text-gray-400">/ Qtl</span></p>
                    </div>
                    <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                        <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-wider">Day 3 Target</p>
                        <p className="text-xl font-bold text-white">{day3Price !== '--' ? `₹ ${day3Price}` : '--'} <span className="text-xs font-normal text-gray-400">/ Qtl</span></p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="farmlandGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(47,166,106,0.6)" />
                                <stop offset="100%" stopColor="rgba(15,40,30,0.1)" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="day"
                            stroke="#4B5563"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#4B5563"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            domain={['dataMin - 50', 'dataMax + 50']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0E241C',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#farmlandGradient)"
                            animationDuration={1200}
                            connectNulls
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
