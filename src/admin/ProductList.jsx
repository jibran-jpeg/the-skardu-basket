import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Star,
    Check,
    ChevronDown,
    ChevronRight,
    Filter,
    UploadCloud,
    ArrowRight,
    Layers
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { compressImageIfNeeded, getFileSizeKB } from '../utils/imageCompressor';
import { getImageUrl } from '../utils/imageHelper';

export function ProductList() {
    const { products, categories, addProduct, updateProduct, deleteProduct, loading } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        categoryId: '',
        description: '',
        image: '',
        stock: '',
        rating: 5,
        reviews: 0,
        harvestDate: new Date().toISOString().split('T')[0],
        origin: 'Skardu Valley',
        highlights: [''],
        seasonalStatus: 'available',
        longDescription: '',
        harvestProcess: '',
        badge: '',
        isNew: false,
        isOrganic: true,
        variants: []
    });

    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            categoryId: '',
            description: '',
            image: '',
            stock: '',
            rating: 5,
            reviews: 0,
            harvestDate: new Date().toISOString().split('T')[0],
            origin: 'Skardu Valley',
            highlights: [''],
            seasonalStatus: 'available',
            longDescription: '',
            harvestProcess: '',
            badge: '',
            isNew: false,
            isOrganic: true,
            variants: []
        });
        setEditingProduct(null);
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                ...product,
                highlights: product.highlights || [''],
                seasonalStatus: product.seasonalStatus || 'available',
                longDescription: product.longDescription || '',
                harvestProcess: product.harvestProcess || '',
                badge: product.badge || '',
                isNew: product.isNew || false,
                isOrganic: product.isOrganic !== undefined ? product.isOrganic : true,
                variants: product.variants || []
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    // Prevent background scrolling when modal is open
    React.useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseInt(formData.price),
            stock: parseInt(formData.stock),
            id: editingProduct ? editingProduct.id : undefined
        };

        if (editingProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        handleCloseModal();
    };

    const [isCompressing, setIsCompressing] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setIsCompressing(true);
                console.log(`Original image size: ${getFileSizeKB(file)}KB`);
                const compressedImage = await compressImageIfNeeded(file, 200);
                setFormData({ ...formData, image: compressedImage });
            } catch (error) {
                console.error('Image compression failed:', error);
                // Fallback to original
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result });
                };
                reader.readAsDataURL(file);
            } finally {
                setIsCompressing(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleHighlightChange = (index, value) => {
        const newHighlights = [...formData.highlights];
        newHighlights[index] = value;
        setFormData({ ...formData, highlights: newHighlights });
    };

    const addHighlight = () => {
        setFormData({ ...formData, highlights: [...formData.highlights, ''] });
    };

    const removeHighlight = (index) => {
        const newHighlights = formData.highlights.filter((_, i) => i !== index);
        setFormData({ ...formData, highlights: newHighlights });
    };

    // Variant Handlers
    const handleVariantChange = async (index, field, value) => {
        const newVariants = [...formData.variants];

        if (field === 'image' && value instanceof File) {
            try {
                setIsCompressing(true);
                console.log(`Original variant image size: ${getFileSizeKB(value)}KB`);
                const compressedImage = await compressImageIfNeeded(value, 200);
                newVariants[index] = { ...newVariants[index], image: compressedImage };
                setFormData(prev => ({ ...prev, variants: newVariants }));
            } catch (error) {
                console.error('Variant image compression failed:', error);
                // Fallback to original
                const reader = new FileReader();
                reader.onloadend = () => {
                    newVariants[index] = { ...newVariants[index], image: reader.result };
                    setFormData(prev => ({ ...prev, variants: newVariants }));
                };
                reader.readAsDataURL(value);
            } finally {
                setIsCompressing(false);
            }
        } else {
            newVariants[index] = { ...newVariants[index], [field]: value };
            setFormData({ ...formData, variants: newVariants });
        }
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { weight: '', price: '', image: '' }]
        });
    };

    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    return (
        <>
            <div className="space-y-8 animate-fade-in-up relative z-10">
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                            <span>Inventory</span>
                            <ChevronRight size={10} />
                            <span className="text-brand-primary dark:text-brand-accent">Management</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                            Product Management
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-lg">Manage your inventory, prices, and seasonal status with precision.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/30 hover:-translate-y-1 transition-all duration-300 group w-full md:w-auto relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl"></div>
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500 relative z-10" />
                        <span className="font-bold tracking-wide text-sm relative z-10">Add Product</span>
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white/60 dark:bg-[#1F2833]/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/40 dark:border-white/5 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 placeholder-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto flex-wrap md:flex-nowrap">
                        {['All', ...categories.map(c => c.id)].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                flex-1 md:flex-none px-4 py-2.5 md:px-5 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border text-center shadow-sm
                ${selectedCategory === cat
                                        ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20 scale-105'
                                        : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border-white/40 dark:border-white/10 hover:border-brand-primary/30 hover:bg-white/80 dark:hover:bg-white/10'
                                    }
              `}
                            >
                                {cat === 'All' ? 'All Items' : categories.find(c => c.id === cat)?.name || cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product List - Desktop Table */}
                <div className="hidden md:block bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/40 dark:border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    <div className="overflow-x-auto relative z-10 p-2">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                                    <th className="px-8 py-6">Product</th>
                                    <th className="px-6 py-6">Category</th>
                                    <th className="px-6 py-6">Status</th>
                                    <th className="px-6 py-6">Price</th>
                                    <th className="px-6 py-6">Stock</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="group hover:bg-white/50 dark:hover:bg-white/5 transition-all rounded-2xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:scale-[1.005] duration-300 border-transparent border hover:border-gray-200 dark:hover:border-white/5 relative z-10">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-100 dark:bg-white/5 group-hover:scale-105 transition-transform duration-500 shadow-sm group-hover:shadow-md">
                                                    <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 font-serif group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">{product.name}</h3>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                                        <span className="font-bold">{product.rating}</span>
                                                        <span className="text-[10px] opacity-60">({product.reviews})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-primary/5 text-brand-primary border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                                {categories.find(c => c.id === product.categoryId)?.name || product.categoryId}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm
                            ${product.seasonalStatus === 'harvesting-now' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                                                    product.seasonalStatus === 'starting-soon' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                                                        product.seasonalStatus === 'ending-soon' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                                                            'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10'}
                        `}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                                {product.seasonalStatus === 'harvesting-now' ? 'Harvesting Now' :
                                                    product.seasonalStatus === 'starting-soon' ? 'Harvest Starting Soon' :
                                                        product.seasonalStatus === 'ending-soon' ? 'Harvest Ending Soon' :
                                                            product.seasonalStatus === 'out-of-season' ? 'Out of Season' :
                                                                'Available'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">PKR {product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                                <span className="text-xs font-bold text-gray-400">{product.stock} units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors hover:scale-110 active:scale-95"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            deleteProduct(product.id);
                                                        }
                                                    }}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors hover:scale-110 active:scale-95"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white/60 dark:bg-[#1F2833]/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-sm border border-white/40 dark:border-white/5 active:scale-[0.98] transition-transform relative overflow-hidden">
                            {/* Mobile Card Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                            <div className="flex gap-4 mb-4 relative z-10">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-white/5 shadow-sm">
                                    <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 dark:text-white font-serif text-lg leading-tight mb-1">{product.name}</h3>
                                        <div className="flex gap-1">
                                            <button onClick={() => handleOpenModal(product)} className="p-2 text-blue-600 bg-blue-500/10 rounded-lg">
                                                <Edit2 size={14} />
                                            </button>
                                            <button onClick={() => { if (window.confirm('Delete?')) deleteProduct(product.id); }} className="p-2 text-red-600 bg-red-500/10 rounded-lg">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2 mt-2">
                                        <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded-lg text-gray-300">
                                            {categories.find(c => c.id === product.categoryId)?.name}
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-lg border border-brand-primary/20">
                                            PKR {product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                    <span className="text-xs font-bold text-gray-400">{product.stock} in stock</span>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                        ${product.seasonalStatus === 'harvesting-now' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                                        product.seasonalStatus === 'starting-soon' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                                            product.seasonalStatus === 'ending-soon' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' :
                                                'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10'}
                `}>
                                    {product.seasonalStatus === 'harvesting-now' ? 'Harvesting Now' :
                                        product.seasonalStatus === 'starting-soon' ? 'Harvest Starting Soon' :
                                            product.seasonalStatus === 'ending-soon' ? 'Harvest Ending Soon' :
                                                product.seasonalStatus === 'out-of-season' ? 'Out of Season' :
                                                    'Available'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Add/Edit Modal - Premium Glass Style */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4 md:p-6">
                    {/* Modal Container */}
                    <div className="bg-white/95 dark:bg-[#151c24]/95 backdrop-blur-2xl w-full max-w-5xl h-[90vh] rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden border border-white/20 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">

                        {/* Modal Header */}
                        <div className="px-6 py-5 md:px-10 md:py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-20 bg-white/80 dark:bg-[#151c24]/80 backdrop-blur-md">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                                    {editingProduct ? 'Edit Product' : 'New Product'}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide">Enter DETAILS to update the catalog.</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-gray-400 hover:text-red-400 group shadow-sm hover:shadow-md hover:rotate-90 duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-10 h-full flex flex-col max-w-4xl mx-auto">

                                {/* Top Section: Image & Key Details */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                                    {/* Left Column: Image Upload (Product Card Style) */}
                                    <div className="col-span-12 lg:col-span-5 flex flex-col">
                                        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Product Image
                                        </label>
                                        <div className="relative group flex-1 min-h-[320px] rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/5 transition-all hover:shadow-brand-primary/15 border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 hover:border-brand-accent/50">
                                            <label
                                                htmlFor="image-upload"
                                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                                            >
                                                {formData.image ? (
                                                    <>
                                                        <img
                                                            src={getImageUrl(formData.image)}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm opacity-90 group-hover:opacity-100"
                                                        />
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/40 dark:bg-black/40 backdrop-blur-[2px]">
                                                            <div className="p-4 bg-white/20 dark:bg-white/10 rounded-full backdrop-blur-md border border-white/20 mb-3 shadow-xl">
                                                                <UploadCloud size={32} className="text-white" />
                                                            </div>
                                                            <span className="text-xs font-bold text-white uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Change Image</span>
                                                        </div>
                                                    </>
                                                ) : isCompressing ? (
                                                    <div className="flex flex-col items-center justify-center text-brand-primary dark:text-brand-accent p-8 text-center">
                                                        <div className="p-5 bg-white rounded-full shadow-lg mb-4 dark:bg-white/5 animate-pulse">
                                                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-primary"></div>
                                                        </div>
                                                        <span className="text-sm font-bold uppercase tracking-wider mb-2">Compressing...</span>
                                                        <span className="text-[10px] opacity-60 max-w-[180px]">Optimizing image to ~200KB for faster loading</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors p-8 text-center animate-pulse-slow">
                                                        <div className="p-5 bg-white rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 dark:bg-white/5">
                                                            <UploadCloud size={40} className="text-current opacity-80" />
                                                        </div>
                                                        <span className="text-sm font-bold uppercase tracking-wider mb-2">Click to Upload</span>
                                                        <span className="text-[10px] opacity-60 max-w-[150px]">Supports JPG, PNG, WEBP up to 5MB</span>
                                                    </div>
                                                )}
                                            </label>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Key Details */}
                                    <div className="col-span-12 lg:col-span-7 space-y-8">
                                        {/* Name */}
                                        <div className="group">
                                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1 group-focus-within:text-brand-primary transition-colors">Product Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-serif text-xl border-l-4 border-l-transparent focus:border-l-brand-primary text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                                                placeholder="e.g. Royal Organic Apricots"
                                            />
                                        </div>

                                        {/* Category & Status Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1">Category</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.categoryId}
                                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer text-gray-900 dark:text-white font-medium"
                                                    >
                                                        <option value="" className="bg-white dark:bg-[#151c24]">Select Category</option>
                                                        {categories.map(c => (
                                                            <option key={c.id} value={c.id} className="bg-white dark:bg-[#151c24]">{c.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1">Seasonal Status</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.seasonalStatus}
                                                        onChange={(e) => setFormData({ ...formData, seasonalStatus: e.target.value })}
                                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer text-gray-900 dark:text-white font-medium"
                                                    >
                                                        <option value="available" className="bg-white dark:bg-[#151c24]">Available</option>
                                                        <option value="harvesting-now" className="bg-white dark:bg-[#151c24]">Harvesting Now</option>
                                                        <option value="starting-soon" className="bg-white dark:bg-[#151c24]">Harvest Starting Soon</option>
                                                        <option value="ending-soon" className="bg-white dark:bg-[#151c24]">Harvest Ending Soon</option>
                                                        <option value="out-of-season" className="bg-white dark:bg-[#151c24]">Out of Season</option>
                                                    </select>
                                                    <div className={`absolute right-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                                                        ${formData.seasonalStatus === 'harvesting-now' ? 'bg-emerald-500 animate-pulse' :
                                                            formData.seasonalStatus === 'starting-soon' ? 'bg-blue-400' :
                                                                formData.seasonalStatus === 'ending-soon' ? 'bg-amber-500' :
                                                                    formData.seasonalStatus === 'out-of-season' ? 'bg-gray-400' : 'bg-brand-accent'}
                                                    `}></div>
                                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price & Stock Grid */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-serif">PKR</div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Base Price</label>
                                                <input
                                                    type="number"
                                                    required
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-mono text-lg text-gray-900 dark:text-white placeholder-gray-400"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Stock Count</label>
                                                <input
                                                    type="number"
                                                    required
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-mono text-lg text-gray-900 dark:text-white placeholder-gray-400"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Descriptions Section */}
                                <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner space-y-8">
                                    <div className="group">
                                        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1 group-focus-within:text-brand-primary transition-colors">Short Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-5 py-4 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 min-h-[100px] resize-none"
                                            placeholder="Catchy one-liner for the product..."
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1 group-focus-within:text-brand-primary transition-colors">Long Description (Product Page)</label>
                                        <textarea
                                            value={formData.longDescription}
                                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                            className="w-full px-5 py-4 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 min-h-[150px] resize-none"
                                            placeholder="Detailed information about the product, its taste, benefits, etc..."
                                        />
                                    </div>
                                </div>

                                {/* Highlights Section */}
                                <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-accent">
                                                <Star size={18} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Product Highlights</label>
                                                <p className="text-[10px] text-gray-400 mt-1">Key features that appear on the product page.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addHighlight}
                                            className="px-4 py-2 bg-gray-200 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <Plus size={12} /> Add Feature
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.highlights.map((highlight, index) => (
                                            <div key={index} className="flex gap-3 group animate-slide-in">
                                                <div className="flex-1 relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 dark:text-gray-300 pointer-events-none">0{index + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={highlight}
                                                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                                                        placeholder={`e.g. 100% Organic from Skardu Valley`}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeHighlight(index)}
                                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-50 group-hover:opacity-100"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Harvest & Metadata Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner space-y-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-accent">
                                                <Star size={18} />
                                            </div>
                                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Harvest Process</label>
                                        </div>
                                        <textarea
                                            value={formData.harvestProcess}
                                            onChange={(e) => setFormData({ ...formData, harvestProcess: e.target.value })}
                                            className="w-full px-5 py-4 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 min-h-[120px] resize-none"
                                            placeholder="Explain how this product is harvested or processed..."
                                        />
                                    </div>

                                    <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Origin</label>
                                                <input
                                                    type="text"
                                                    value={formData.origin}
                                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:border-brand-primary outline-none text-gray-900 dark:text-white"
                                                    placeholder="e.g. Skardu Valley"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Harvest Date</label>
                                                <input
                                                    type="date"
                                                    value={formData.harvestDate}
                                                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:border-brand-primary outline-none text-gray-900 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Badge Tag</label>
                                                <input
                                                    type="text"
                                                    value={formData.badge}
                                                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:border-brand-primary outline-none text-gray-900 dark:text-white"
                                                    placeholder="e.g. Best Seller"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center gap-4 pt-2">
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.isNew}
                                                            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-10 h-6 rounded-full transition-all duration-300 ${formData.isNew ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.isNew ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors uppercase tracking-wider">New Arrival</span>
                                                </label>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.isOrganic}
                                                            onChange={(e) => setFormData({ ...formData, isOrganic: e.target.checked })}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-10 h-6 rounded-full transition-all duration-300 ${formData.isOrganic ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.isOrganic ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors uppercase tracking-wider">Organic Certified</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Variants Section */}
                                <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-accent">
                                                <Layers size={18} />
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Variants</h3>
                                                <p className="text-[10px] text-gray-400 mt-1">Define different sizes or weights (e.g. 500g, 1kg)</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addVariant}
                                            className="px-4 py-2 bg-gray-200 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <Plus size={12} /> Add Variant
                                        </button>
                                    </div>

                                    {formData.variants.length > 0 ? (
                                        <div className="space-y-4">
                                            {formData.variants.map((variant, index) => (
                                                <div key={index} className="flex flex-col lg:flex-row gap-4 p-5 rounded-2xl bg-white dark:bg-[#1A232D] border border-gray-200 dark:border-white/5 relative group hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-brand-primary">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeVariant(index)}
                                                        className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg scale-75 hover:scale-100 z-10"
                                                    >
                                                        <X size={12} />
                                                    </button>

                                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 flex-1">
                                                        <div>
                                                            <span className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 block">Weight / Size</span>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. 500g"
                                                                value={variant.weight}
                                                                onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl text-sm font-medium focus:border-brand-primary outline-none focus:bg-white dark:focus:bg-black/40 text-gray-900 dark:text-white transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 block">Override Price</span>
                                                            <input
                                                                type="number"
                                                                placeholder="Same as base"
                                                                value={variant.price}
                                                                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl text-sm font-medium focus:border-brand-primary outline-none focus:bg-white dark:focus:bg-black/40 text-gray-900 dark:text-white transition-colors"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 border-t lg:border-t-0 lg:border-l border-dashed border-gray-200 dark:border-white/10 pt-4 lg:pt-0 lg:pl-4">
                                                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 block">Variant Image (Optional)</span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative group/image flex-1">
                                                                <label
                                                                    htmlFor={`variant-image-${index}`}
                                                                    className="flex items-center justify-center w-full h-12 border border-dashed border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all overflow-hidden relative bg-gray-50 dark:bg-black/20"
                                                                >
                                                                    {variant.image ? (
                                                                        <div className="flex items-center gap-3 px-3 w-full">
                                                                            <img src={variant.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-white" />
                                                                            <span className="text-xs font-medium truncate flex-1 text-gray-700 dark:text-gray-300">Image Uploaded</span>
                                                                            <UploadCloud size={14} className="text-brand-primary" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center gap-2 text-gray-400 hover:text-brand-primary transition-colors">
                                                                            <UploadCloud size={16} />
                                                                            <span className="text-[10px] uppercase font-bold tracking-wider">Upload</span>
                                                                        </div>
                                                                    )}
                                                                </label>
                                                                <input
                                                                    id={`variant-image-${index}`}
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        if (e.target.files[0]) {
                                                                            handleVariantChange(index, 'image', e.target.files[0]);
                                                                        }
                                                                    }}
                                                                    className="hidden"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-xs font-medium border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl bg-gray-50 dark:bg-white/5">
                                            No variants added. Using base product configuration.
                                        </div>
                                    )}
                                </div>

                                {/* Form Actions - Sticky Bottom */}
                                <div className="pt-6 flex items-center justify-end gap-4 bg-white/95 dark:bg-[#151c24]/95 backdrop-blur-md pb-6 border-t border-gray-100 dark:border-white/5 sticky bottom-0 z-20 mt-auto -mx-6 md:-mx-10 px-6 md:px-10">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-4 rounded-2xl font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand-primary/20 hover:bg-brand-dark hover:shadow-2xl hover:shadow-brand-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 group"
                                    >
                                        <span>{editingProduct ? 'Save Updates' : 'Publish Product'}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
