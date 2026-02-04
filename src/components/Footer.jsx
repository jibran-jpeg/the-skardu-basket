import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../store.config';
import { Facebook, Instagram, Twitter, Mail, ArrowRight, MapPin, Phone, ChevronDown } from 'lucide-react';

export function Footer() {
    const [openSection, setOpenSection] = useState('');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? '' : section);
    };

    return (
        <footer className="bg-gradient-to-br from-[#1A3C22] to-[#0B1A0F] dark:from-[#0B0C10] dark:to-[#1A1D23] text-white pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
            {/* Decorative decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-brand-accent text-3xl">✦</span>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-serif font-black text-white uppercase tracking-widest leading-none">
                                    The Skardu
                                </h3>
                                <span className="font-sans font-light text-xs text-white/50 tracking-[0.3em] uppercase mt-1">
                                    Basket
                                </span>
                            </div>
                        </div>
                        <p className="text-white/60 leading-relaxed font-sans mb-8 text-sm">
                            Bringing you the purest gifts from the Himalayas. Certified organic, sustainably harvested, and delivered with care.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 group">
                                <Facebook className="w-4 h-4 text-white/70 group-hover:text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 group">
                                <Instagram className="w-4 h-4 text-white/70 group-hover:text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 group">
                                <Twitter className="w-4 h-4 text-white/70 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <button
                            onClick={() => toggleSection('explore')}
                            className="w-full flex items-center justify-between md:block text-left group"
                        >
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-brand-accent">Explore</h4>
                            <ChevronDown className={`w-5 h-5 md:hidden text-brand-accent transition-transform duration-300 ${openSection === 'explore' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-4 text-sm overflow-hidden transition-all duration-300 ${openSection === 'explore' ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mb-0'}`}>
                            <li><Link to="/products" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2">Shop All <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" /></Link></li>
                            <li><Link to="/about" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300">About Us</Link></li>
                            <li><Link to="/faq" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300">FAQs</Link></li>
                            <li><Link to="/about" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300">Sustainability</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <Link
                            to="/contact"
                            className="w-full flex items-center justify-between md:block text-left group"
                        >
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-brand-accent group-hover:text-white transition-colors">Contact</h4>
                        </Link>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-4 text-white/60 group">
                                <MapPin className="w-5 h-5 text-brand-accent mt-0.5" />
                                <span className="group-hover:text-white transition-colors duration-300">Skardu, Gilgit-Baltistan,<br />Pakistan</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/60 group">
                                <Mail className="w-5 h-5 text-brand-accent" />
                                <span className="group-hover:text-white transition-colors duration-300">{storeConfig.contact.email}</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/60 group">
                                <Phone className="w-5 h-5 text-brand-accent" />
                                <span className="group-hover:text-white transition-colors duration-300">{storeConfig.contact.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <button
                            onClick={() => toggleSection('newsletter')}
                            className="w-full flex items-center justify-between md:block text-left group"
                        >
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-brand-accent">Newsletter</h4>
                            <ChevronDown className={`w-5 h-5 md:hidden text-brand-accent transition-transform duration-300 ${openSection === 'newsletter' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openSection === 'newsletter' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
                            <p className="text-white/60 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
                            <form className="relative" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                                />
                                <button className="absolute right-2 top-2 p-1.5 bg-brand-accent text-white rounded-md hover:bg-brand-accent/90 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} {storeConfig.name}. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/shipping-info" className="hover:text-white transition-colors">Shipping Info</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
