import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { storeConfig } from '../store.config';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0B0C10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-[#F5F5F5] mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-[#C5C6C7] max-w-2xl mx-auto">
                        Have questions about our products or need assistance? We're here to help you experience the best of Skardu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-fade-in-left">
                        <div className="bg-white dark:bg-[#1F2833] rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-serif font-bold text-brand-primary dark:text-white mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Our Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Skardu, Gilgit-Baltistan,<br />
                                            Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {storeConfig.contact.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Call Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {storeConfig.contact.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Card */}
                        <div className="bg-[#25D366] rounded-2xl p-8 shadow-lg text-white transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <MessageCircle className="w-10 h-10" />
                                <h2 className="text-2xl font-serif font-bold">Chat on WhatsApp</h2>
                            </div>
                            <p className="mb-6 opacity-90">
                                Need quick answers? Chat with our support team directly on WhatsApp for instant assistance.
                            </p>
                            <a
                                href={`https://wa.me/${storeConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center bg-white text-[#25D366] font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-md"
                            >
                                Start Chat
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-[#1F2833] rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in-right">
                        <h2 className="text-2xl font-serif font-bold text-brand-primary dark:text-white mb-6">
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-brand-primary/25 flex items-center justify-center gap-2 group"
                            >
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
