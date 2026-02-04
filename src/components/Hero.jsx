import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../store.config';
import { ChevronDown } from 'lucide-react';

export function Hero() {
    const bgRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const scrollLabelRef = React.useRef(null);

    useEffect(() => {
        let rafId;

        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Optimize: Only animate if visible/near top
            if (scrollY > window.innerHeight) return;

            rafId = requestAnimationFrame(() => {
                // Parallax Background - Desktop Only to prevent mobile stutter
                if (bgRef.current && window.innerWidth >= 768) {
                    bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
                }

                // Content Effects (Fade & Scale)
                if (contentRef.current) {
                    const opacity = Math.max(1 - scrollY / 500, 0);
                    const scale = Math.max(1 - scrollY / 2000, 0.9);
                    const translateY = scrollY * 0.3;

                    // On mobile, reduce the translation distance or disable it for smoother feel
                    const effectiveTranslateY = window.innerWidth >= 768 ? translateY : translateY * 0.5;

                    contentRef.current.style.opacity = opacity;
                    contentRef.current.style.transform = `translate3d(0, ${effectiveTranslateY}px, 0) scale(${scale})`;
                }

                // Scroll Label Fade
                if (scrollLabelRef.current) {
                    scrollLabelRef.current.style.opacity = Math.max(1 - scrollY / 300, 0);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-gray-900">
            {/* Background Image with Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] will-change-transform"
            >
                <img
                    src={storeConfig.heroImage}
                    alt="Skardu Valley"
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
                />
            </div>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 pointer-events-none"></div>

            {/* Decorative corner elements - Static to reduce paint cost or include in contentRef if needed to fade */}
            <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-l-2 border-white/20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-r-2 border-white/20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-l-2 border-white/20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-r-2 border-white/20 pointer-events-none"></div>

            {/* Content with Scroll Effects */}
            <div
                ref={contentRef}
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 will-change-transform"
            >
                {/* Top Badge */}
                <div className="mb-4 md:mb-6 animate-fade-in-down">
                    <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full animate-pulse"></div>
                        <h2 className="text-white uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm font-semibold">
                            100% Organic & Natural
                        </h2>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-2 md:mb-4 leading-tight drop-shadow-2xl animate-fade-in">
                    Taste of the
                </h1>
                <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl animate-fade-in bg-gradient-to-r from-white via-[#F5F5F5] to-white bg-clip-text text-transparent">
                    Himalayas
                </h1>

                {/* Decorative line */}
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent mb-6 md:mb-10 animate-fade-in"></div>

                {/* Subtitle */}
                <p className="text-white/90 text-sm md:text-xl font-sans max-w-xs md:max-w-2xl mb-8 md:mb-10 leading-relaxed drop-shadow-lg animate-fade-in-up">
                    Experience pure, hand-picked treasures from the pristine valleys of Skardu
                </p>

                {/* CTA Button with GREEN hover */}
                <Link
                    to="/products"
                    className="group relative px-5 py-2 md:px-10 md:py-5 bg-white text-gray-900 hover:bg-brand-primary hover:text-white transition-all duration-500 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm font-bold shadow-2xl rounded-full overflow-hidden animate-fade-in-up border-2 border-white hover:border-brand-primary hover:scale-105"
                >
                    {/* Gradient glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/30 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                        Shop Pure Products
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-[-90deg] transform group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                </Link>

                {/* Scroll indicator - Relative to ensure consistent spacing */}
                <div
                    ref={scrollLabelRef}
                    className="mt-12 md:absolute md:bottom-10 md:left-0 md:w-full flex justify-center z-40 will-change-opacity md:mt-0"
                >
                    <div className="flex flex-col items-center gap-2 text-white/70 animate-bounce">
                        <span className="text-xs uppercase tracking-wider">Scroll</span>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>

            </div>
        </div>
    );
}
