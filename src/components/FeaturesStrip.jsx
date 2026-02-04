import React from 'react';
import { Truck, ShieldCheck, Leaf, Clock } from 'lucide-react';

export function FeaturesStrip() {
    const features = [
        {
            icon: <Truck size={20} />,
            text: "Nationwide Delivery",
            subtext: "Fast & Secure"
        },
        {
            icon: <Leaf size={20} />,
            text: "100% Organic",
            subtext: "Certified Pure"
        },
        {
            icon: <ShieldCheck size={20} />,
            text: "Quality Guarantee",
            subtext: "Satisfaction Assured"
        },
        {
            icon: <Clock size={20} />,
            text: "Fresh Harvest",
            subtext: "Seasonal Picks"
        }
    ];

    return (
        <div className="bg-white dark:bg-[#1A1D23] border-b border-gray-100 dark:border-white/5 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center md:justify-start gap-3 group cursor-default">
                            <div className="p-2 rounded-full bg-brand-primary/5 dark:bg-white/5 text-brand-primary dark:text-brand-accent group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight uppercase tracking-wide text-[10px] md:text-xs">
                                    {feature.text}
                                </span>
                                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                                    {feature.subtext}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
