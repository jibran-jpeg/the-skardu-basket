import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { getImageUrl } from '../utils/imageHelper';
import { Star, Check, X, MessageSquare, Loader2, Trash2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewManagement() {
    const { getAllPendingReviews, getAllApprovedReviews, approveReview, rejectReview, toggleFeatured, products } = useProducts();
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingReviews, setPendingReviews] = useState([]);
    const [approvedReviews, setApprovedReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    useEffect(() => {
        loadReviews();
    }, [activeTab]);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when filters change
    }, [searchQuery, selectedRating, selectedProduct, sortBy, activeTab]);

    const loadReviews = async () => {
        setLoading(true);
        if (activeTab === 'pending') {
            const reviews = await getAllPendingReviews();
            setPendingReviews(reviews);
        } else {
            const reviews = await getAllApprovedReviews();
            setApprovedReviews(reviews);
        }
        setLoading(false);
    };

    const handleApprove = async (reviewId) => {
        await approveReview(reviewId);
        loadReviews();
    };

    const handleReject = async (reviewId) => {
        await rejectReview(reviewId);
        loadReviews();
    };

    const handleDelete = async (reviewId) => {
        if (confirm('Are you sure you want to delete this approved review?')) {
            await rejectReview(reviewId);
            loadReviews();
        }
    };

    const handleToggleFeatured = async (reviewId, currentStatus) => {
        await toggleFeatured(reviewId, currentStatus);
        loadReviews();
    };

    // Filter and search logic
    const getFilteredReviews = () => {
        let reviews = activeTab === 'pending' ? pendingReviews : approvedReviews;

        // Search filter
        if (searchQuery) {
            reviews = reviews.filter(review =>
                review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Rating filter
        if (selectedRating !== 'all') {
            reviews = reviews.filter(review => review.rating === parseInt(selectedRating));
        }

        // Product filter
        if (selectedProduct !== 'all') {
            reviews = reviews.filter(review => review.productName === selectedProduct);
        }

        // Sort
        reviews = [...reviews].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return reviews;
    };

    const filteredReviews = getFilteredReviews();

    // Pagination logic
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const currentReviews = filteredReviews.slice(startIndex, endIndex);

    // Get unique product names for filter
    const allReviews = [...pendingReviews, ...approvedReviews];
    const uniqueProducts = [...new Set(allReviews.map(r => r.productName))].sort();

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedRating('all');
        setSelectedProduct('all');
        setSortBy('newest');
        setCurrentPage(1);
    };

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                    Review Management
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage customer reviews with advanced filters
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'pending'
                        ? 'bg-white dark:bg-[#1a1f2e] text-brand-primary dark:text-brand-accent shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    Pending {pendingReviews.length > 0 && `(${pendingReviews.length})`}
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'approved'
                        ? 'bg-white dark:bg-[#1a1f2e] text-brand-primary dark:text-brand-accent shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    Approved {approvedReviews.length > 0 && `(${approvedReviews.length})`}
                </button>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-4 md:p-6 mb-6 border border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={18} className="text-brand-primary dark:text-brand-accent" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Filters & Search</h3>
                    <button
                        onClick={resetFilters}
                        className="ml-auto text-xs text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-accent transition-colors"
                    >
                        Reset All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                        />
                    </div>

                    {/* Rating Filter */}
                    <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none text-gray-800 dark:text-gray-200"
                    >
                        <option value="all">All Ratings</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                        <option value="3">⭐⭐⭐ (3 Stars)</option>
                        <option value="2">⭐⭐ (2 Stars)</option>
                        <option value="1">⭐ (1 Star)</option>
                    </select>

                    {/* Product Filter */}
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none text-gray-800 dark:text-gray-200"
                    >
                        <option value="all">All Products</option>
                        {uniqueProducts.map(product => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none text-gray-800 dark:text-gray-200"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                {/* Results Count */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-bold text-brand-primary dark:text-brand-accent">{startIndex + 1}-{Math.min(endIndex, filteredReviews.length)}</span> of <span className="font-bold">{filteredReviews.length}</span> reviews
                    </p>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 size={40} className="text-brand-primary dark:text-brand-accent animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Loading reviews...</p>
                </div>
            ) : currentReviews.length === 0 ? (
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-white/10">
                    <div className="w-16 h-16 bg-brand-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare size={32} className="text-brand-primary dark:text-brand-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {filteredReviews.length === 0 && (searchQuery || selectedRating !== 'all' || selectedProduct !== 'all')
                            ? 'No reviews match your filters'
                            : activeTab === 'pending' ? 'All caught up!' : 'No approved reviews yet'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {filteredReviews.length === 0 && (searchQuery || selectedRating !== 'all' || selectedProduct !== 'all')
                            ? 'Try adjusting your search or filters'
                            : activeTab === 'pending'
                                ? 'No pending reviews at the moment.'
                                : 'Approved reviews will appear here.'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {currentReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                                    {review.productImage && (
                                        <img
                                            src={getImageUrl(review.productImage)}
                                            alt={review.productName}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                                            {review.productName}
                                        </h3>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={`${i < review.rating
                                                        ? 'fill-brand-accent text-brand-accent'
                                                        : 'text-gray-300 dark:text-white/10'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                            by {review.author}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                                        {review.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        "{review.content}"
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                {activeTab === 'pending' ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="flex-1 py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <Check size={16} />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(review.id)}
                                            className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <X size={16} />
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleToggleFeatured(review.id, review.isFeatured)}
                                            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${review.isFeatured
                                                ? 'bg-brand-accent/20 text-brand-accent border-2 border-brand-accent'
                                                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-brand-accent/10 border-2 border-transparent'
                                                }`}
                                        >
                                            ⭐ {review.isFeatured ? 'Featured' : 'Feature'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="flex-1 py-2.5 px-4 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white dark:text-red-400 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between bg-white dark:bg-[#1a1f2e] rounded-2xl p-4 border border-gray-100 dark:border-white/10">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    // Show first, last, current, and adjacent pages
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === page
                                                    ? 'bg-brand-primary text-white dark:bg-brand-accent'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="text-gray-400">...</span>;
                                    }
                                    return null;
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
