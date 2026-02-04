import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Award, MapPin, Mountain, ShieldCheck, Heart } from 'lucide-react';

export function CompanyInfo() {
    const [activeCard, setActiveCard] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const cardsRef = useRef([]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCard(Number(entry.target.dataset.index));
                    }
                });
            },
            {
                threshold: 0.6,
                root: null,
            }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [isMobile]);

    const features = [
        {
            icon: <MapPin className="w-10 h-10 text-brand-accent" />,
            title: "Our Heritage",
            subtitle: "Roots in Skardu",
            description: "Born in the majestic valleys of Skardu, our story is woven with the rich traditions of the Himalayas. We bring you the authentic taste of the mountains, sourced directly from where the air is pure and nature thrives.",
            highlight: "Authentic Origin",
            decorativeIcon: <Mountain className="w-5 h-5 opacity-20" />
        },
        {
            icon: <Leaf className="w-10 h-10 text-brand-accent" />,
            title: "Our Mission",
            subtitle: "Pure & Sustainable",
            description: "We are strictly committed to 100% organic farming. Our mission is to deliver nature's gifts without any synthetic interference, preserving the earth's fertility and ensuring your health with every chemical-free bite.",
            highlight: "Earth First",
            decorativeIcon: <ShieldCheck className="w-5 h-5 opacity-20" />
        },
        {
            icon: <Award className="w-10 h-10 text-brand-accent" />,
            title: "Our Promise",
            subtitle: "Uncompromised Quality",
            description: "From the harvest to your hands, quality is our obsession. We meticulously select and process our products to retain their natural nutrients and flavor, promising you nothing but the absolute premium standard.",
            highlight: "Premium Grade",
            decorativeIcon: <Heart className="w-5 h-5 opacity-20" />
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-[#ECEBE4] to-[#F5F4ED] dark:from-[#0B0C10] dark:to-[#1A1D23] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-32 left-10 w-64 h-64 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-serif text-brand-primary dark:text-[#F5F5F5] mb-4">
                        About Us
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-[#C5C6C7] max-w-2xl mx-auto">
                        Bringing the purity of the Himalayas directly to your doorstep with a commitment to authenticity and wellness.
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-10 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
                    {features.map((feature, index) => {
                        const isActive = isMobile && activeCard === index;

                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                data-index={index}
                                className={`min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center group flex flex-col items-center p-8 border-2 rounded-2xl transition-all duration-500 bg-white dark:bg-[#1F2833]/40 backdrop-blur-sm relative overflow-hidden
                                    ${isActive
                                        ? 'border-brand-accent dark:border-brand-accent shadow-2xl shadow-brand-accent/20 -translate-y-2'
                                        : 'border-gray-200 dark:border-[#2C3E50] hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-2xl hover:shadow-brand-accent/20 hover:-translate-y-2'
                                    }
                                `}
                            >
                                {/* Decorative corner icon */}
                                <div className={`absolute top-4 right-4 text-brand-accent transition-transform duration-500 ${isActive ? 'rotate-12' : 'group-hover:rotate-12'}`}>
                                    {feature.decorativeIcon}
                                </div>

                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 transition-opacity duration-500 rounded-2xl ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                                {/* Icon with animated background */}
                                <div className={`relative mb-6 p-5 bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 dark:from-brand-accent/20 dark:to-brand-accent/10 rounded-2xl transition-all duration-500 shadow-lg 
                                    ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-110 group-hover:rotate-3'}
                                `}>
                                    <div className={`absolute inset-0 bg-brand-accent/20 rounded-2xl transition-all duration-500 ${isActive ? 'blur-2xl' : 'blur-xl group-hover:blur-2xl'}`}></div>
                                    <div className="relative">
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 text-center">
                                    <h3 className="text-2xl font-bold font-serif text-brand-primary dark:text-[#F5F5F5] mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-brand-accent mb-4 tracking-wide uppercase">
                                        {feature.subtitle}
                                    </p>
                                    <p className="text-gray-700 dark:text-[#C5C6C7] font-sans text-sm leading-relaxed mb-4">
                                        {feature.description}
                                    </p>

                                    {/* Highlight badge */}
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full border transition-colors duration-300
                                        ${isActive ? 'border-brand-accent' : 'border-brand-accent/30 group-hover:border-brand-accent'}
                                    `}>
                                        <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold text-brand-primary dark:text-brand-accent uppercase tracking-wider">
                                            {feature.highlight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom decorative divider */}
                <div className="mt-16 flex items-center justify-center gap-4">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent to-brand-accent/50"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <div className="h-px w-24 bg-gradient-to-l from-transparent to-brand-accent/50"></div>
                </div>
            </div>
        </section>
    );
}
