import React, { useState, useEffect } from 'react';
import { Star, User, ShieldCheck, Plus, X, Loader2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { createPortal } from 'react-dom';

export function ProductReviews({ productId, className }) {
    const { getReviews, addReview } = useProducts();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        author: '',
        rating: 5,
        content: ''
    });

    useEffect(() => {
        if (productId) {
            loadReviews();
        }
    }, [productId]);

    const loadReviews = async () => {
        setLoading(true);
        const data = await getReviews(productId);
        setReviews(data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const result = await addReview(productId, formData);
        if (result) {
            setIsModalOpen(false);
            setFormData({ author: '', rating: 5, content: '' });
            loadReviews(); // Reload reviews
        }
        setSubmitting(false);
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    if (loading) {
        return (
            <div className={`mt-20 flex flex-col items-center justify-center py-20 ${className}`}>
                <Loader2 size={40} className="text-brand-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading reviews...</p>
            </div>
        );
    }

    return (
        <div className={`mt-20 ${className}`}>
            <h3 className="text-2xl font-serif font-bold text-brand-primary dark:text-[#F5F5F5] mb-8 flex items-center gap-4">
                Customer Reviews
                {reviews.length > 0 && (
                    <span className="text-sm font-sans font-normal bg-brand-primary/10 dark:bg-brand-accent/10 text-brand-primary dark:text-brand-accent px-3 py-1 rounded-full">
                        {averageRating}/5 Rating
                    </span>
                )}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Card */}
                <div className="bg-brand-primary/5 dark:bg-[#1F2833]/50 rounded-[20px] p-8 flex flex-col justify-center items-center text-center border border-brand-primary/10 dark:border-white/5 h-fit">
                    <div className="text-6xl font-black text-brand-primary dark:text-white mb-2">{averageRating}</div>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                className={`${star <= Math.round(Number(averageRating)) ? 'fill-brand-accent text-brand-accent' : 'text-gray-300 dark:text-white/10'}`}
                            />
                        ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        {reviews.length > 0
                            ? `Based on ${reviews.length} verified ${reviews.length === 1 ? 'review' : 'reviews'}`
                            : "Be the first to review this product"}
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 rounded-xl bg-white dark:bg-[#0B0C10] border-2 border-brand-primary/10 dark:border-white/10 text-brand-primary dark:text-brand-accent font-bold hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-brand-primary transition-all shadow-sm"
                    >
                        Write a Review
                    </button>
                </div>

                {/* Recent Reviews List */}
                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        <>
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 dark:border-white/5 pb-6 last:border-0 last:pb-0 animate-fade-in">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                                <User size={14} className="text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                                                    {review.author}
                                                </span>
                                                {review.verified && (
                                                    <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-0.5 mt-0.5">
                                                        <ShieldCheck size={10} /> Verified Buyer
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={`${i < review.rating ? 'fill-brand-accent text-brand-accent' : 'fill-gray-200 text-gray-200 dark:text-white/10 dark:fill-white/10'}`}
                                            />
                                        ))}
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-200 mb-1">{review.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                        "{review.content}"
                                    </p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="py-10 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                            <p className="text-gray-500 dark:text-gray-400">No reviews yet for this product.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !submitting && setIsModalOpen(false)}
                    />
                    <div className="relative w-full max-w-lg bg-white dark:bg-[#151c24] rounded-[32px] shadow-2xl overflow-hidden animate-modal-in border border-white/10">
                        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white">Quick Review</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Takes less than a minute</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={18} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="flex flex-col items-center justify-center p-5 bg-brand-primary/5 dark:bg-white/5 rounded-2xl">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">How would you rate it?</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <Star
                                                size={36}
                                                className={`${star <= formData.rating ? 'fill-brand-accent text-brand-accent' : 'text-gray-300 dark:text-white/10'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1 group-focus-within:text-brand-primary transition-colors">
                                        Your Name <span className="text-gray-400 normal-case">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Anonymous"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1 group-focus-within:text-brand-primary transition-colors">Share your thoughts</label>
                                    <textarea
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="What did you like about this product?"
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
