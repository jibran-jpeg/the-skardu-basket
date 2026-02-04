import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Cloud, Sun, ArrowRight, Heart, ShieldCheck, Leaf, ChevronDown } from 'lucide-react';
import { storeConfig } from '../store.config';

export function OurOrchards() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const galleryImages = [
        {
            src: "/images/skardu_apricot_sorting_process_1769582130530.png",
            title: "Art of Selection",
            subtitle: "Hand-Sorted Perfection"
        },
        {
            src: "/images/orchard_harvest_basket_1769579947553.png",
            title: "Nature's Bounty",
            subtitle: "Fresh Harvest"
        },
        {
            src: "/images/apricot_drying_rooftop_1769579924155.png",
            title: "Sun-Kissed Goodness",
            subtitle: "Traditional Drying"
        },
        {
            src: "/images/skardu_farmers_harvest_1769580653731.png",
            title: "Hand Picked with Love & Care",
            subtitle: "Our Community"
        },
        {
            src: "/images/skardu_product_jars_landscape_1769582227259.png",
            title: "Pure & Jarred",
            subtitle: "Bottled Nature"
        },
        {
            src: "/images/skardu_traditional_house_1769580633362.png",
            title: "Preserving Heritage",
            subtitle: "Ancient Architecture"
        },
        {
            src: "/images/skardu_cherry_picking_process_1769598711436.png",
            title: "Cherry Picking",
            subtitle: "Fresh from the Branch"
        },
        {
            src: "/images/skardu_apricot_sorting_women_1769598744193.png",
            title: "Community Sorting",
            subtitle: "Traditional Process"
        },
        {
            src: "/images/skardu_apricot_drying_rocks_1769598772752.png",
            title: "Natural Drying",
            subtitle: "Sun & Stone"
        }
    ];

    return (
        <div className="bg-[#F9F8F4] dark:bg-[#0B0C10] transition-colors duration-300 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="/images/skardu_orchard_hero_1769579902788.png"
                        alt="Skardu Valley Orchards"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F9F8F4] dark:to-[#0B0C10]"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 animate-fade-in leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70 drop-shadow-2xl">
                        Guardians of <br /> <i className="font-light italic text-brand-accent">the Valley</i>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up drop-shadow-lg">
                        Where the majestic Karakoram peaks meet the fertile earth, our legacy begins.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center z-20 animate-bounce md:hidden">
                    <div className="flex flex-col items-center gap-2 text-brand-primary/80 dark:text-white/80">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
                {/* Decorative background elements for dark mode */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-brand-accent/5 dark:bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div>
                            <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-2 block">Our Origin</span>
                            <h2 className="text-5xl font-serif font-bold text-brand-primary dark:text-[#E2E2E2] mb-6">Pure by Nature</h2>
                            <div className="w-24 h-1 bg-brand-accent rounded-full"></div>
                        </div>

                        <div className="space-y-6 text-lg text-gray-600 dark:text-[#C5C6C7] font-light leading-relaxed">
                            <p>
                                High in the Himalayas, at an altitude of <strong className="text-brand-primary dark:text-white font-semibold">7,500 feet</strong>, our orchards thrive in one of the purest environments on Earth. Here, the air is crisp, the water is glacial, and the soil is untouched by modern pollutants.
                            </p>

                            <p>
                                We practice strict organic farming methods passed down through generations. No chemicals, no artificial fertilizers—just the wisdom of nature and the hard work of our hands. Every apricot, walnut, and cherry is sun-dried on stone rooftops, preserving its natural sweetness and nutrients.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-4">
                            <div className="group text-center p-6 bg-white dark:bg-[#1F2833] rounded-2xl shadow-lg hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <Mountain className="w-6 h-6 text-brand-accent" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">7,500ft Altitude</span>
                            </div>
                            <div className="group text-center p-6 bg-white dark:bg-[#1F2833] rounded-2xl shadow-lg hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <Cloud className="w-6 h-6 text-brand-accent" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Pure Air</span>
                            </div>
                            <div className="group text-center p-6 bg-white dark:bg-[#1F2833] rounded-2xl shadow-lg hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <Sun className="w-6 h-6 text-brand-accent" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Sun Dried</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 group">
                            <img
                                src="/images/apricot_drying_rooftop_1769579924155.png"
                                alt="Drying Apricots on Stone Roof"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        </div>
                        {/* Decorative Quote */}
                        <div className="relative -mt-8 mx-4 md:mt-0 md:mx-0 md:absolute md:-bottom-10 md:-left-10 bg-white dark:bg-[#1F2833] p-8 md:p-10 rounded-2xl md:rounded-none md:rounded-tr-[3rem] shadow-2xl max-w-sm border-l-4 md:border-l-8 border-brand-accent z-20">
                            <div className="absolute -top-4 -left-2 md:-top-6 text-6xl text-brand-accent opacity-20 font-serif">"</div>
                            <p className="font-serif italic text-lg md:text-xl text-brand-primary dark:text-[#E2E2E2] leading-relaxed relative z-10">
                                We don't just grow food; we cultivate heritage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white dark:bg-[#15191E] relative overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-2 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-[#E2E2E2] mb-6">Our Core Values</h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
                    </div>


                    <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-10 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                        {[
                            {
                                icon: <Mountain className="w-8 h-8 text-brand-accent" />,
                                title: "Authentic Origin",
                                desc: "Born in the majestic valleys of Skardu, our story is woven with the rich traditions of the Himalayas."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />,
                                title: "Pure & Sustainable",
                                desc: "We are strictly committed to 100% organic farming, delivering nature's gifts without synthetic interference."
                            },
                            {
                                icon: <Heart className="w-8 h-8 text-brand-accent" />,
                                title: "Uncompromised Quality",
                                desc: "From harvest to your hands, we meticulously select and process our products to retain their natural nutrients."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="min-w-[85vw] md:min-w-0 snap-center group p-10 bg-[#F9F8F4] dark:bg-[#1F2833]/50 border border-transparent hover:border-brand-accent/30 rounded-3xl text-center hover:shadow-2xl hover:shadow-brand-accent/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-20 h-20 bg-white dark:bg-[#0B0C10] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 ring-1 ring-black/5 dark:ring-white/10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-4 text-brand-primary dark:text-[#E2E2E2]">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-[#C5C6C7] leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Empowering Locals Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary dark:bg-brand-primary/20"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 md:order-1">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>
                            <img
                                src="/images/skardu_farmers_harvest_1769580653731.png"
                                alt="Community Harvest"
                                className="rounded-[40px] shadow-2xl relative z-10 rotate-2 hover:rotate-0 transition-all duration-700 border-4 border-white/10"
                            />
                            {/* Stats Card */}
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-[#1F2833] p-6 rounded-3xl shadow-xl z-20 max-w-[200px] hidden md:block animate-bounce-slow">
                                <p className="text-4xl font-bold text-brand-accent mb-1">100%</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Locally Sourced & Processed</p>
                            </div>
                        </div>

                        <div className="text-white order-1 md:order-2">
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
                                Community First
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                                Empowering the <br /> <span className="text-brand-accent">Heart of Skardu</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
                                Every jar you purchase does more than just taste good—it fuels a community. We work directly with small-scale farmers, eliminating middlemen to ensure <strong className="text-white font-semibold">fair wages</strong> and sustainable livelihoods.
                            </p>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <div className="bg-brand-accent/20 p-1 rounded-full mt-1">
                                        <Leaf size={14} className="text-brand-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Women Empowerment</h4>
                                        <p className="text-sm text-gray-400">Supporting local women through our sorting and drying centers.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-brand-accent/20 p-1 rounded-full mt-1">
                                        <ShieldCheck size={14} className="text-brand-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Preserving Traditions</h4>
                                        <p className="text-sm text-gray-400">Keeping 100-year-old organic farming techniques alive.</p>
                                    </div>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 bg-[#F9F8F4] dark:bg-[#0B0C10]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-brand-primary dark:text-[#E2E2E2] mb-4">Glimpses of Harvest</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light">From the blossoming spring to the golden autumn harvest.</p>
                    </div>

                    {/* Mobile View: Horizontal Scroll Carousel */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
                        {galleryImages.map((img, index) => (
                            <div key={`mobile-${index}`} className="min-w-[85vw] snap-center relative overflow-hidden rounded-2xl h-[400px] shadow-lg">
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>

                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="text-brand-accent text-xs uppercase tracking-[0.2em] font-bold mb-2 block">
                                        {img.subtitle}
                                    </span>
                                    <h3 className="text-white text-2xl font-serif font-bold mb-2">
                                        {img.title}
                                    </h3>
                                    <div className="w-12 h-1 bg-brand-accent"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Grid Layout */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
                        {galleryImages.map((img, index) => (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 0 || index === 3 ? 'md:col-span-2' : ''} shadow-lg`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                {/* Hover Content */}
                                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                                    <span className="text-brand-accent text-xs uppercase tracking-[0.2em] font-bold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {img.subtitle}
                                    </span>
                                    <h3 className="text-white text-2xl font-serif font-bold mb-2 group-hover:text-white transition-colors">
                                        {img.title}
                                    </h3>
                                    <div className="w-12 h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-brand-primary text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/skardu_valley_spring_1769579971443.png"
                        alt="Background"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-brand-primary/90 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">Taste the Purity Yourself</h2>
                    <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto">
                        Experience the authentic flavors of Skardu delivered straight to your home.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-4 bg-white text-brand-primary px-12 py-6 rounded-full font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 group"
                    >
                        Shop the Harvest
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
