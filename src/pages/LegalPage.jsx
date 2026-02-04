import React from 'react';
import { Shield, Truck, FileText, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function LegalPage({ type }) {
    const getContent = () => {
        switch (type) {
            case 'privacy':
                return {
                    title: 'Privacy Policy',
                    icon: <Shield className="w-8 h-8 text-brand-accent" />,
                    content: (
                        <div className="space-y-6 text-gray-600 dark:text-gray-300">
                            <p>At The Skardu Basket, we value your privacy and are committed to protecting your personal information.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Information We Collect</h3>
                            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, shipping address, and phone number.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">How We Use Your Information</h3>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Process and fulfill your orders.</li>
                                <li>Communicate with you about your account and orders.</li>
                                <li>Send you marketing communications (if you've opted in).</li>
                                <li>Improve our website and customer service.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Data Security</h3>
                            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.</p>
                        </div>
                    )
                };
            case 'terms':
                return {
                    title: 'Terms of Service',
                    icon: <FileText className="w-8 h-8 text-brand-accent" />,
                    content: (
                        <div className="space-y-6 text-gray-600 dark:text-gray-300">
                            <p>Welcome to The Skardu Basket. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Use of Our Service</h3>
                            <p>You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use our service in any way that violates any applicable local, national, or international law or regulation.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Product Information</h3>
                            <p>We strive to be as accurate as possible with our product descriptions and images. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Pricing and Availability</h3>
                            <p>All prices are subject to change without notice. We reserve the right to limit the quantity of products we supply.</p>
                        </div>
                    )
                };
            case 'shipping':
                return {
                    title: 'Shipping Information',
                    icon: <Truck className="w-8 h-8 text-brand-accent" />,
                    content: (
                        <div className="space-y-6 text-gray-600 dark:text-gray-300">
                            <p>We are dedicated to delivering the freshest products from Skardu directly to your doorstep.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Delivery Areas</h3>
                            <p>We currently ship to all major cities in Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, and Faisalabad.</p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Delivery Times</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Islamabad/Rawalpindi:</strong> 1-2 business days</li>
                                <li><strong>Lahore & Punjab:</strong> 2-3 business days</li>
                                <li><strong>Karachi & Sindh:</strong> 3-5 business days</li>
                            </ul>
                            <p className="mt-4 text-sm bg-brand-primary/5 p-4 rounded-lg">
                                *Note: Fresh fruit orders may have special shipping schedules to ensure quality.
                            </p>

                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-8">Shipping Rates</h3>
                            <p>Shipping rates are calculated based on the weight of your order and your location. Free shipping is available on orders above PKR 5,000.</p>
                        </div>
                    )
                };
            default:
                return { title: 'Page Not Found', content: <p>Content unavailable.</p> };
        }
    };

    const { title, icon, content } = getContent();

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#F5F4ED] to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10]">
            <SEO title={title} description={`Read our ${title}`} url={window.location.pathname} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-[#1F2833] rounded-[30px] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-white/10 pb-8">
                        <div className="w-16 h-16 rounded-full bg-brand-primary/5 dark:bg-white/5 flex items-center justify-center">
                            {icon}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-white">
                            {title}
                        </h1>
                    </div>

                    <div className="leading-relaxed">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
