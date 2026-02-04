import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { ChevronDown, HelpCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Are your products truly 100% organic?",
            answer: "Yes, absolutely. All our products are sourced directly from our own orchards and trusted partner farms in Skardu and Gilgit-Baltistan. We use traditional farming methods with zero pesticides or chemical fertilizers. Our Shilajit and dry fruits are processed naturally to retain their purity."
        },
        {
            question: "Do you offer Cash on Delivery (COD)?",
            answer: "We offer Cash on Delivery for most of our products, including Dry Fruits, Shilajit, and Jams. However, for **fresh Seasonal Fruits** (like Cherries and Apricots), we require advance payment via Bank Transfer to ensure timely delivery and reduce spoilage risks."
        },
        {
            question: "How long does shipping take?",
            answer: "Delivery times depend on your city:\n\n* **Islamabad/Rawalpindi:** 1-2 working days\n* **Lahore/Punjab:** 2-3 working days\n* **Karachi/Sindh:** 3-5 working days\n\nWe ship all orders via overnight courier services to maintain freshness."
        },
        {
            question: "What is your return policy?",
            answer: "If you receive a damaged or incorrect product, please contact us within 24 hours of delivery with photos. We will happily replace the item or issue a refund. Due to the perishable nature of our products, we cannot accept returns for change of mind."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within Pakistan to ensure our quality standards. We are working on international shipping solutions for our dry fruits and Shilajit. Stay tuned!"
        },
        {
            question: "How should I store the Shiba/Apricot Oil?",
            answer: "Our organic oils are cold-pressed and preservative-free. We recommend storing them in a cool, dark place away from direct sunlight to maintain their therapeutic properties."
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#F5F4ED] to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10]">
            <SEO title="FAQs - The Skardu Basket" description="Frequently Asked Questions about our organic products, shipping, and delivery." url="/faq" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-white/10 text-brand-primary dark:text-brand-accent mb-6">
                        <HelpCircle size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-white mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Everything you need to know about our products and delivery.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4 mb-20 animate-fade-in-up delay-100">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white dark:bg-[#1F2833] rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === index
                                    ? 'border-brand-primary/20 dark:border-brand-accent/20 shadow-lg'
                                    : 'border-gray-100 dark:border-white/5 hover:border-gray-200'
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg pr-8 transition-colors ${openIndex === index ? 'text-brand-primary dark:text-brand-accent' : 'text-gray-900 dark:text-white'
                                    }`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-brand-primary text-white rotate-180'
                                        : 'bg-gray-100 dark:bg-white/10 text-gray-500'
                                    }`}>
                                    <ChevronDown size={18} />
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Banner */}
                <div className="bg-brand-primary dark:bg-[#1A1D23] rounded-[30px] p-8 md:p-12 text-center text-white relative overflow-hidden animate-fade-in-up delay-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif font-bold mb-4">Still have questions?</h3>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto">
                            Can't find the answer you're looking for? Please chat to our friendly team.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-white text-brand-primary rounded-full font-bold hover:bg-gray-50 transition-colors">
                                <Mail className="w-4 h-4 mr-2" /> Contact Us
                            </Link>
                            <a href="tel:+923001234567" className="inline-flex items-center px-8 py-3 bg-brand-primary/30 border border-white/20 text-white rounded-full font-bold hover:bg-brand-primary/50 transition-colors backdrop-blur-sm">
                                <Phone className="w-4 h-4 mr-2" /> +92 300 1234567
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
