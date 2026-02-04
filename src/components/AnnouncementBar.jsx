import React from 'react';

export function AnnouncementBar() {
    return (
        <div className="bg-brand-primary text-white text-xs py-2 overflow-hidden border-b border-brand-primary/20 uppercase tracking-widest font-medium relative z-50">
            <div className="animate-marquee whitespace-nowrap flex will-change-transform">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex items-center flex-shrink-0">
                        <span className="mx-4">Pure Gold from the Mountains - 100% Organic Shilajeet & Dry Fruits</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Free Shipping on Orders Over PKR 5000</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Cash on Delivery Available Nationwide</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">fresh harvesting start</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Authentic Products from Skardu</span>
                        <span className="mx-4">•</span>
                    </div>
                ))}
            </div>
        </div >
    );
}
