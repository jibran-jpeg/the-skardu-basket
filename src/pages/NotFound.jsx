import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, MapPin } from 'lucide-react';

export function NotFound() {
    return (
        <div className="min-h-screen bg-[#F9F8F4] dark:bg-[#0B0C10] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="bg-white/80 dark:bg-[#1F2833]/80 backdrop-blur-xl p-8 md:p-16 rounded-[40px] shadow-2xl border border-white/20 dark:border-white/5 max-w-2xl w-full text-center relative z-10 animate-fade-in-up">

                <div className="inline-flex justify-center mb-8 relative">
                    <div className="w-32 h-32 bg-brand-primary/5 rounded-full flex items-center justify-center animate-pulse">
                        <Compass size={64} className="text-brand-primary dark:text-brand-accent" />
                    </div>
                </div>

                <h1 className="text-8xl font-serif font-black text-brand-primary dark:text-[#F5F5F5] mb-4 opacity-20 select-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6 -mt-12 relative z-20">
                    Lost in the Orchards?
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 max-w-md mx-auto">
                    It seems you've wandered off the path. The page you're looking for might have been moved or doesn't exist.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group"
                    >
                        <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
                        Return Home
                    </Link>

                    <Link
                        to="/products"
                        className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <MapPin size={20} />
                        Visit Shop
                    </Link>
                </div>
            </div>
        </div>
    );
}
