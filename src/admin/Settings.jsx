import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Plus, Trash2, Save, X, UploadCloud, Folder, Grid, Database } from 'lucide-react';
import { storeConfig } from '../store.config';
import { supabase } from '../lib/supabase';

export function Settings() {
    const { categories, addCategory, updateCategory, deleteCategory } = useProducts();
    const [editingCategory, setEditingCategory] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        image: ''
    });

    const resetForm = () => {
        setFormData({ id: '', name: '', description: '', image: '' });
        setEditingCategory(null);
        setIsFormOpen(false);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData(category);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Auto-generate ID if empty (only for new categories if user didn't specify)
        const submitData = {
            ...formData,
            id: editingCategory ? formData.id : (formData.id || formData.name.toLowerCase().replace(/\s+/g, '-'))
        };

        if (editingCategory) {
            updateCategory(submitData);
        } else {
            addCategory(submitData);
        }
        resetForm();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const handleSeedDatabase = async () => {
        if (!window.confirm('This will populate the database with initial products and categories from the store configuration. Existing data with same Names/IDs will be updated. Continue?')) {
            return;
        }

        try {
            // Seed Categories
            console.log('Seeding categories...');
            for (const category of storeConfig.categories) {
                // Check if exists
                const { data: existing, error: checkError } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('id', category.id)
                    .single();

                if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "Row not found"
                    console.error('Check Category Error:', checkError);
                }

                if (existing) {
                    const { error } = await supabase.from('categories').update(category).eq('id', category.id);
                    if (error) {
                        console.error('Update Category Error:', error);
                        throw new Error(`Cat Update Failed: ${error.message} (${error.code}) - ${error.details}`);
                    }
                } else {
                    const { error } = await supabase.from('categories').insert(category);
                    if (error) {
                        console.error('Insert Category Error:', error);
                        // Try without ID just in case
                        if (error.code === '22P02') { // Invalid text representation (e.g. UUID vs Text)
                            console.warn('Retrying category insert without ID');
                            const { id, ...noIdCat } = category;
                            const { error: retryError } = await supabase.from('categories').insert(noIdCat);
                            if (retryError) throw new Error(`Cat Insert Retry Failed: ${retryError.message} (${retryError.code})`);
                        } else {
                            throw new Error(`Cat Insert Failed: ${error.message} (${error.code}) - ${error.details} - ${error.hint}`);
                        }
                    }
                }
            }

            // Seed Products
            console.log('Seeding products...');
            for (const product of storeConfig.products) {
                // Prepare product data - REMOVE ID initially to let DB handle it if needed
                const { id, ...productData } = product;

                // Ensure types
                const cleanProduct = {
                    ...productData,
                    price: Number(productData.price),
                    rating: Number(productData.rating),
                    reviews: Number(productData.reviews),
                    harvestDate: productData.harvestDate ? formatDate(productData.harvestDate) : null,
                };

                if (!cleanProduct.harvestDate) delete cleanProduct.harvestDate;

                // Check if exists by NAME
                const { data: existingProduct, error: checkError } = await supabase
                    .from('products')
                    .select('id')
                    .eq('name', product.name)
                    .single();

                if (checkError && checkError.code !== 'PGRST116') {
                    console.error('Check Product Error:', checkError);
                }

                if (existingProduct) {
                    console.log(`Updating product: ${product.name}`);
                    const { error } = await supabase
                        .from('products')
                        .update(cleanProduct)
                        .eq('id', existingProduct.id);
                    if (error) throw new Error(`Prod Update Failed: ${error.message} - ${error.details}`);
                } else {
                    console.log(`Inserting product: ${product.name}`);
                    const { error } = await supabase
                        .from('products')
                        .insert(cleanProduct); // Insert without ID, assuming auto-gen
                    if (error) {
                        console.error('Insert Product Error:', error);
                        throw new Error(`Prod Insert Failed: ${error.message} (${error.code}) - ${error.details} - ${error.hint}`);
                    }
                }
            }

            alert('Database seeded successfully! The page will reload.');
            window.location.reload();
        } catch (error) {
            console.error('Seeding failed:', error);
            alert(`Seeding failed: ${error.message}`);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                        <span>Configuration</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-brand-primary dark:text-brand-accent">Platform</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
                        Store Settings
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
                        Manage global configurations, categories, and store information.
                    </p>
                </div>
                <button
                    onClick={handleSeedDatabase}
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 border border-brand-primary/20 dark:border-white/10 text-brand-primary dark:text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-brand-primary/5 hover:border-brand-primary/50 transition-all"
                >
                    <Database size={16} /> Seed Database
                </button>
            </div>

            {/* Categories Section */}
            <div className="bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/40 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl">
                            <Grid size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">Product Categories</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Define the main sections of your store</p>
                        </div>
                    </div>
                    {!isFormOpen && (
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5"
                        >
                            <Plus size={16} /> New Category
                        </button>
                    )}
                </div>

                {isFormOpen ? (
                    <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-6 border border-gray-200 dark:border-white/5 animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 dark:text-white">{editingCategory ? 'Edit Category' : 'New Category'}</h3>
                            <button onClick={resetForm} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-[#151c24] border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                        placeholder="e.g. Seasonal Fruits"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category ID (Slug)</label>
                                    <input
                                        type="text"
                                        value={formData.id}
                                        disabled={!!editingCategory}
                                        onChange={e => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 cursor-not-allowed outline-none font-mono text-sm"
                                        placeholder="Auto-generated"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-[#151c24] border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all h-24 resize-none"
                                        placeholder="Brief description for SEO and cards..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Cover Image</label>
                                    <div className="flex items-center gap-4">
                                        {formData.image && (
                                            <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-white/10" />
                                        )}
                                        <label className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-[#151c24] border border-dashed border-gray-300 dark:border-white/20 rounded-xl cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all text-sm text-gray-500 dark:text-gray-400">
                                            <UploadCloud size={18} />
                                            <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/5">
                                <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm uppercase">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all flex items-center gap-2">
                                    <Save size={16} /> Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {categories.map(category => (
                            <div key={category.id} className="group p-5 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-[#151c24] border border-gray-100 dark:border-white/5 rounded-3xl transition-all hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-1 relative">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-black/20 overflow-hidden shrink-0 border border-gray-200 dark:border-white/5">
                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 dark:text-white font-serif">{category.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5 truncate uppercase tracking-widest">{category.id}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{category.description}</p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(category)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                                        <Folder size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(category.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
