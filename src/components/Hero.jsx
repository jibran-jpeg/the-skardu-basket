import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../store.config';
import { ChevronDown } from 'lucide-react';
import { getImageUrl } from '../utils/imageHelper';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Desktop-only sub-component that uses Framer Motion hooks.
function HeroDesktop({ containerRef }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 15,
        stiffness: 100,
        mass: 0.5
    });

    const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
    const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

    return (
        <>
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 w-full h-[120%] will-change-transform transform-gpu"
            >
                <img
                    src={getImageUrl(storeConfig.heroImage)}
                    alt="Skardu Valley"
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            <motion.div
                style={{ y }}
                className="absolute inset-0 h-[120%] bg-gradient-to-b from-black/20 via-black/10 to-black/40 pointer-events-none"
            />

            <motion.div
                style={{ opacity }}
                className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 backface-visibility-hidden"
            >
                <HeroContent isMobile={false} />
            </motion.div>
        </>
    );
}

// Mobile sub-component — ZERO Framer Motion, ZERO expensive CSS filters.
function HeroMobile() {
    return (
        <>
            {/* Static image — no parallax, exact viewport size, no oversized layer */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={getImageUrl(storeConfig.heroImage)}
                    alt="Skardu Valley"
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Simple dark overlay instead of gradient (cheaper to paint) */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Static text layer */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
                <HeroContent isMobile={true} />
            </div>
        </>
    );
}

// Shared text/UI content.
// On mobile: NO drop-shadow, NO bg-clip-text, NO backdrop-blur, NO transition-all,
// NO continuous animations (pulse/bounce), NO blur-xl effects.
function HeroContent({ isMobile }) {
    return (
        <>
            {/* Top Badge */}
            <div className="mb-4 md:mb-6">
                <div className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-white/15 rounded-full border border-white/30 ${isMobile ? '' : 'backdrop-blur-md'}`}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full ${isMobile ? '' : 'animate-pulse'}`}></div>
                    <h2 className="text-white uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm font-semibold">
                        100% Organic & Natural
                    </h2>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full ${isMobile ? '' : 'animate-pulse'}`}></div>
                </div>
            </div>

            {/* Main Heading — NO drop-shadow on mobile (expensive GPU filter) */}
            <h1 className={`text-5xl md:text-8xl font-serif text-white mb-2 md:mb-4 leading-tight ${isMobile ? '' : 'drop-shadow-2xl'}`}>
                Taste of the
            </h1>
            {/* NO bg-clip-text on mobile (expensive GPU compositing) */}
            <h1 className={`text-5xl md:text-8xl font-serif italic mb-6 md:mb-8 leading-tight ${isMobile ? 'text-white' : 'drop-shadow-2xl bg-gradient-to-r from-white via-[#F5F5F5] to-white bg-clip-text text-transparent'}`}>
                Himalayas
            </h1>

            {/* Decorative line */}
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent mb-6 md:mb-10"></div>

            {/* Subtitle — NO drop-shadow on mobile */}
            <p className={`text-white/90 text-sm md:text-xl font-sans max-w-xs md:max-w-2xl mb-8 md:mb-10 leading-relaxed ${isMobile ? '' : 'drop-shadow-lg'}`}>
                Experience pure, hand-picked treasures from the pristine valleys of Skardu
            </p>

            {/* CTA Button — transition-colors instead of transition-all on mobile */}
            <Link
                to="/products"
                className={`group relative px-5 py-2 md:px-10 md:py-5 bg-white text-gray-900 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm font-bold shadow-2xl rounded-full overflow-hidden border-2 border-white ${isMobile ? 'transition-colors duration-300' : 'transition-all duration-500 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-105'}`}
            >
                {/* Gradient glow + Shine effects — DESKTOP ONLY */}
                {!isMobile && (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/30 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </>
                )}

                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    Shop Pure Products
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-[-90deg]" />
                </span>
            </Link>

            {/* Scroll indicator — static on mobile */}
            <div className="mt-12 md:absolute md:bottom-10 md:left-0 md:w-full flex justify-center z-40 md:mt-0">
                <div className={`flex flex-col items-center gap-2 text-white/70 ${isMobile ? '' : 'animate-bounce'}`}>
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
        </>
    );
}

export function Hero() {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100dvh] overflow-hidden bg-gray-900"
            style={{ contain: 'layout style paint' }}
        >
            {/* Decorative Static Corner Elements */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-l-2 border-white/20"></div>
                <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-r-2 border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-l-2 border-white/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-r-2 border-white/20"></div>
            </div>

            {isMobile ? <HeroMobile /> : <HeroDesktop containerRef={containerRef} />}
        </div>
    );
}
