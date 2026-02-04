import React, { useEffect } from 'react';
import { Mountain, Heart, ShieldCheck, Leaf, Sun, Truck, Package, Droplets, Users, Wheat } from 'lucide-react';
import { CompanyInfo } from '../components/CompanyInfo';

export function AboutUs() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Bento Grid Card Component - Premium Glass Effect
    const BentoCard = ({ children, className = "", title, subtitle, icon: Icon, glow = false }) => (
        <div className={`
            relative overflow-hidden rounded-[32px] 
            bg-white dark:bg-[#1A1D23] 
            border border-stone-200/60 dark:border-white/5
            shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none
            transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group
            hover:-translate-y-1 hover:scale-[1.01]
            hover:shadow-[0_20px_40px_-15px_rgba(255,160,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,160,0,0.15)]
            hover:border-brand-primary/20 dark:hover:border-brand-accent/20
            ${className}
        `}>
            {/* Premium Subtle Sheer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

            {children}

            {(title || Icon) && (
                <div className="absolute top-6 left-6 right-6 z-20">
                    <div className="flex items-center justify-between">
                        {Icon && (
                            <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                                <Icon size={22} className="text-brand-primary dark:text-brand-accent" />
                            </div>
                        )}
                        {subtitle && (
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary/80 dark:text-brand-accent bg-brand-primary/5 dark:bg-brand-accent/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-brand-primary/10 dark:border-brand-accent/20">
                                {subtitle}
                            </span>
                        )}
                    </div>
                    {title && <h3 className="mt-4 text-3xl font-serif font-black text-gray-900 dark:text-white leading-none tracking-tight drop-shadow-sm">{title}</h3>}
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-stone-50 dark:bg-[#0B0C10] min-h-screen pb-20 overflow-hidden selection:bg-brand-accent selection:text-white">

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 dark:bg-brand-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-accent/20 dark:bg-brand-accent/5 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700"></div>
            </div>

            {/* 1. Compact Hero Section */}
            <div className="relative h-[45vh] min-h-[380px] flex items-end justify-center pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hero.png"
                        alt="Skardu Valley"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-50 dark:from-[#0B0C10] via-black/40 to-black/10"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                        <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-[10px]">Est. 2024 • Gilgit-Baltistan</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif font-black text-white mb-4 drop-shadow-2xl tracking-tight">
                        The Soul <span className="italic text-brand-accent font-light">of</span> Skardu
                    </h1>
                </div>
            </div>

            {/* 2. Bento Grid Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* A. The Mission (Large Card) */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 min-h-[350px] flex flex-col md:flex-row group" subtitle="Our Mission" glow>
                        <div className="w-full md:w-[55%] p-8 pt-24 flex flex-col justify-end relative z-10 order-2 md:order-1">
                            <p className="text-2xl md:text-3xl font-serif font-medium text-gray-900 dark:text-white leading-tight mb-6">
                                "We deliver the <span className="text-brand-primary dark:text-brand-accent border-b-2 border-brand-accent/50 pb-1">Himalayas</span>, untouched."
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm border-l-2 border-brand-accent pl-4">
                                Skardu Organics bridges the gap between the pristine valleys of Karakoram and your home. Partnering directly with local families to ensure every harvest retains its vital energy.
                            </p>
                        </div>
                        <div className="w-full md:w-[45%] h-64 md:h-auto relative overflow-hidden order-1 md:order-2">
                            <img
                                src="/assets/hands.png"
                                alt="Farmer Hands"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white dark:to-[#1A1D23] opacity-50 md:opacity-100 mix-blend-normal"></div>
                        </div>
                    </BentoCard>

                    {/* B. Core Stat (Small Card) */}
                    <BentoCard className="md:col-span-3 lg:col-span-4 min-h-[350px] !bg-brand-primary text-white p-8 flex flex-col justify-center items-center text-center !border-none relative overflow-hidden" icon={Users}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute w-32 h-32 bg-brand-accent rounded-full blur-3xl -top-10 -right-10 opacity-40 animate-pulse"></div>

                        <div className="relative z-10 mt-8">
                            <h4 className="text-7xl font-serif font-black mb-0 text-white tracking-tighter">100<span className="text-brand-accent text-5xl align-top">%</span></h4>
                            <p className="text-xl font-medium text-brand-accent mb-4">Direct Trade</p>
                            <div className="w-12 h-1 bg-white/20 mx-auto rounded-full mb-4"></div>
                            <p className="text-xs text-white/70 leading-relaxed max-w-[200px] mx-auto">
                                Sourcing directly from small orchards to ensure fair pay.
                            </p>
                        </div>
                    </BentoCard>

                    {/* C. The Process (Swipeable on Mobile) */}
                    <div className="md:col-span-6 lg:col-span-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex md:grid md:grid-cols-4 gap-3 min-w-[200%] md:min-w-0">
                            {[
                                { icon: Mountain, title: "Harvest", desc: "Hand-picked at peak altitude." },
                                { icon: Sun, title: "Sun-Dry", desc: "Naturally dried under glacial sun." },
                                { icon: ShieldCheck, title: "Verify", desc: "Triple-checked for purity." },
                                { icon: Package, title: "Deliver", desc: "Sealed with care, sent to you." },
                            ].map((step, idx) => (
                                <div key={idx} className="snap-center w-full relative">
                                    <BentoCard className="h-full min-h-[180px] p-6 flex flex-col items-center justify-center text-center !bg-white dark:!bg-[#1F2833] border-stone-100 dark:border-white/5 hover:!border-brand-accent/30 transition-colors relative overflow-hidden group">

                                        {/* 1. Large Ghost Number Background */}
                                        <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-gray-100 dark:text-white/5 opacity-50 select-none group-hover:text-brand-primary/10 transition-colors duration-500 font-serif leading-none">
                                            0{idx + 1}
                                        </div>

                                        {/* 2. Main Icon (Centered) */}
                                        <div className="relative z-10 w-14 h-14 mb-4 rounded-2xl bg-brand-primary/5 dark:bg-white/5 flex items-center justify-center border border-brand-primary/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-brand-accent/20">
                                            <step.icon size={26} className="text-brand-primary dark:text-white" />
                                        </div>

                                        {/* 3. Text Content */}
                                        <div className="relative z-10">
                                            <h4 className="text-lg font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-brand-accent transition-colors">{step.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px] mx-auto leading-relaxed">{step.desc}</p>
                                        </div>

                                    </BentoCard>

                                    {/* Connector Line (Desktop Only) */}
                                    {idx < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-white/10 dark:to-transparent z-10"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* D. Visual Feature (Medium Card) */}
                    <BentoCard className="md:col-span-3 lg:col-span-4 min-h-[300px] relative group" subtitle="Process">
                        <div className="absolute inset-0">
                            <img
                                src="/assets/apricot-drying.png"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1595133642398-3f456185675e?q=80&w=1000&auto=format&fit=crop";
                                }}
                                alt="Drying Apricots"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>
                        <div className="absolute top-6 left-6 right-6 z-20">
                            <h3 className="mt-12 text-3xl font-serif font-black text-white leading-none tracking-tight drop-shadow-md">Sun-Kissed</h3>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                            <p className="text-white/80 text-sm font-light border-l-2 border-brand-accent pl-3">
                                Ancient preservation techniques meet modern hygiene standards.
                            </p>
                        </div>
                    </BentoCard>

                    {/* E. Organic Certification (Medium Card) */}
                    <BentoCard className="md:col-span-3 lg:col-span-8 min-h-[300px] p-0 flex items-center bg-gradient-to-br from-white to-[#FFFAF0] dark:from-[#1A1D23] dark:to-[#15181e] relative overflow-hidden group">

                        {/* 1. Content Side (Left) */}
                        <div className="w-full md:w-1/2 p-8 z-10 flex flex-col justify-center h-full">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl border border-green-200 dark:border-green-800/50">
                                        <Leaf className="text-green-600 dark:text-green-400" size={28} />
                                    </div>
                                    <h3 className="text-3xl font-serif font-black text-gray-900 dark:text-white leading-none">100% Organic</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                                    Our soil has never touched synthetic fertilizers. We rely on glacial meltwater and traditional wisdom to grow fruit that bursts with natural flavor.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Pesticide Free", "Non-GMO", "Glacial Water"].map(item => (
                                        <span key={item} className="px-4 py-1.5 bg-white dark:bg-black/40 border border-gray-100 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shadow-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Visual Side (Right - Image) */}
                        <div className="hidden md:block w-1/2 h-full absolute right-0 top-0 bottom-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#1A1D23] to-transparent z-10"></div>
                            <img
                                src="/assets/certificate.png"
                                alt="Organic Certificate Seal"
                                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3"
                            />
                            {/* Inner Glow/Highlight */}
                            <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay"></div>
                        </div>

                        {/* Mobile Fallback Background */}
                        <div className="md:hidden absolute inset-0 opacity-10 pointer-events-none">
                            <img src="/assets/certificate.png" className="w-full h-full object-cover" />
                        </div>

                    </BentoCard>
                </div>
            </div>

            {/* 3. Footer Call to Action (Reuse) */}
            <div className="mt-20">
                <CompanyInfo />
            </div>
        </div>
    );
}
