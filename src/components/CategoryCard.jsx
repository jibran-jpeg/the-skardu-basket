import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CategoryCard({ category, isActive }) {
    const navigate = useNavigate();

    const handleExplore = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Navigate to products page with category filter
        navigate(`/products?category=${category.id}`);
    };

    return (
        <div
            onClick={handleExplore}
            className={`group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-500 border-2 border-transparent
            ${isActive
                    ? '-translate-y-3 shadow-brand-accent/30 border-brand-accent/50'
                    : 'hover:-translate-y-3 hover:shadow-brand-accent/30 hover:border-brand-accent/50'
                }`}
        >
            {/* Gradient border glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br from-brand-accent/40 via-transparent to-brand-accent/40 transition-opacity duration-500 blur-xl -z-10
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}></div>

            {/* Dark overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 z-10
                ${isActive
                    ? 'from-black/70 via-black/40 to-black/20'
                    : 'from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20'
                }
            `} />

            {/* Shine effect on hover */}
            <div className={`absolute inset-0 transition-opacity duration-700 z-20 pointer-events-none
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-transform duration-1000
                    ${isActive ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'}
                `}></div>
            </div>

            {/* Image */}
            <img
                src={Array.isArray(category.image) ? (category.image[0] || '/images/placeholder.png') : (category.image || '/images/placeholder.png')}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className={`w-full h-80 md:h-96 object-cover object-center transform transition-all duration-700
                    ${isActive ? 'scale-110 rotate-1' : 'group-hover:scale-110 group-hover:rotate-1'}
                `}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 p-6 md:p-8 text-center">
                {/* Category name */}
                <h3 className={`text-3xl md:text-5xl font-bold font-serif text-white mb-2 md:mb-3 tracking-wide drop-shadow-lg transform transition-transform duration-500
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                    {category.name}
                </h3>

                {/* Decorative line */}
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent mb-3 md:mb-4"></div>

                {/* Description */}
                <p className="text-gray-100 font-sans text-sm md:text-base md:text-lg max-w-md leading-relaxed drop-shadow-md">
                    {category.description}
                </p>

                {/* Explore button with icon */}
                <button
                    onClick={handleExplore}
                    className={`mt-4 px-5 py-2 bg-transparent border border-white/80 text-white font-sans text-xs tracking-widest uppercase transform transition-all duration-500 delay-150 hover:bg-brand-accent hover:border-brand-accent hover:shadow-lg hover:shadow-brand-accent/50 rounded-full flex items-center gap-2 group/btn
                        ${isActive
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                        }
                    `}
                >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Corner decorative element */}
                <div className={`absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 transition-all duration-500 rounded-tr-2xl
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}></div>
                <div className={`absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/30 transition-all duration-500 rounded-bl-2xl
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}></div>
            </div>
        </div>
    );
}
