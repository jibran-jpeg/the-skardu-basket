import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Droplets, Sun } from 'lucide-react';

export function StorySection() {
    const [imageError, setImageError] = React.useState(false);

    return (
        <section className="py-12 md:py-24 relative overflow-hidden bg-white dark:bg-[#0B0C10] text-gray-600 dark:text-[#C5C6C7] transition-colors duration-300">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundColor = 'transparent'; // Let parent bg handle it
                    }}
                    className="w-full h-full object-cover opacity-15 dark:opacity-20"
                    alt="Mountains Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#0B0C10] dark:via-transparent dark:to-[#0B0C10]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <div className="animate-fade-in-left">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="h-px w-8 bg-brand-primary dark:bg-brand-accent"></span>
                            <span className="text-brand-primary dark:text-brand-accent uppercase tracking-[0.2em] text-xs font-bold">The Origin</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                            Born in the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark dark:from-brand-accent dark:to-white">Valley of Giants</span>
                        </h2>

                        <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-400">
                            Skardu isn't just a place; it's a sanctuary where nature follows its own ancient rhythm.
                            Nestled between the Karakoram and Himalayan ranges, our orchards drink from glacial streams
                            and breathe the purest air on earth.
                        </p>

                        <div className="grid grid-cols-2 gap-4 md:gap-8 my-8 md:my-12">
                            <div className="flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-2">
                                    <Mountain size={24} />
                                </div>
                                <h4 className="text-gray-900 dark:text-white font-bold text-lg">2,500m Altitude</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-500">High-altitude farming enhances natural sweetness and nutrient density.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-2">
                                    <Droplets size={24} />
                                </div>
                                <h4 className="text-gray-900 dark:text-white font-bold text-lg">Glacial Water</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-500">Irrigated by mineral-rich meltwater from K2 and centuries-old glaciers.</p>
                            </div>
                        </div>

                        <Link to="/about" className="inline-block px-8 py-4 border border-brand-primary dark:border-brand-accent text-brand-primary dark:text-brand-accent font-bold rounded-full hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-brand-primary transition-all duration-300 uppercase tracking-widest text-sm">
                            Read Our Full Story
                        </Link>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative animate-fade-in-right">
                        <div className="relative z-10 rounded-[40px] overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-2xl transition-transform duration-700 h-[250px] md:h-[400px] w-full">
                            {!imageError ? (
                                <img
                                    src="/images/skardu_orchard_bloom.png" // AI Generated Orchard Image
                                    alt="Majestic Skardu Landscape"
                                    onError={() => setImageError(true)}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-black flex items-center justify-center p-8 text-center">
                                    <div className="flex flex-col items-center">
                                        <Mountain size={48} className="text-brand-primary dark:text-brand-accent mb-4 opacity-50" />
                                        <p className="text-gray-500 font-serif italic">"Where earth meets sky"</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <p className="text-white font-serif text-2xl italic">"Nature's masterpiece."</p>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-primary/10 dark:bg-brand-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
