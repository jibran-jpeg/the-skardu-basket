import React, { createContext, useState, useEffect, useContext } from 'react';
import { storeConfig } from '../store.config';
import { supabase } from '../lib/supabase';
import { useToast } from './ToastContext';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Initial Fetch
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('*');

            if (productsError) throw productsError;

            const { data: categoriesData, error: categoriesError } = await supabase
                .from('categories')
                .select('*');

            if (categoriesError) throw categoriesError;

            // Map products from snake_case (DB) to camelCase (Frontend)
            const mappedProducts = (productsData || []).map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                categoryId: p.category_id,
                image: p.image,
                rating: p.rating,
                reviews: p.reviews,
                stock: p.stock,
                origin: p.origin,
                badge: p.badge,
                isNew: p.is_new,
                isOrganic: p.is_organic || false,
                seasonalStatus: p.seasonal_status,
                harvestDate: p.harvest_date,
                highlights: p.highlights || [],
                features: p.highlights || [], // Alias for ProductDetails
                longDescription: p.long_description || '',
                harvestProcess: p.harvest_process || '',
                variants: p.variants || []
            }));

            setProducts(mappedProducts);
            setCategories(categoriesData || []);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            // Map frontend camelCase to DB snake_case
            const dbProduct = {
                name: productData.name,
                description: productData.description,
                price: Number(productData.price),
                category_id: productData.categoryId,
                image: productData.image,
                rating: Number(productData.rating) || 0,
                reviews: Number(productData.reviews) || 0,
                stock: Number(productData.stock) || 0,
                origin: productData.origin,
                badge: productData.badge,
                is_new: productData.isNew || false,
                is_organic: productData.isOrganic || false,
                seasonal_status: productData.seasonalStatus,
                harvest_date: productData.harvestDate || null,
                highlights: productData.highlights || [],
                long_description: productData.longDescription || '',
                // harvest_process removed as it is not in schema
                variants: productData.variants && productData.variants.length > 0
                    ? productData.variants.map(v => ({ ...v, price: Number(v.price) }))
                    : []
            };

            const { data, error } = await supabase
                .from('products')
                .insert([dbProduct])
                .select();

            if (error) throw error;

            // Map back to camelCase for local state to avoid refresh
            if (data) {
                const newProduct = { ...productData, id: data[0].id };
                setProducts(prev => [...prev, newProduct]);
            }
            showToast('Product added successfully!', 'success');
        } catch (error) {
            console.error('Error adding product:', error);
            showToast(`Failed to add product: ${error.message}`, 'error');
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;
            setProducts((prevProducts) => prevProducts.filter(p => p.id !== productId));
            showToast('Product deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast(`Failed to delete product: ${error.message}`, 'error');
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const dbProduct = {
                name: updatedProduct.name,
                description: updatedProduct.description,
                price: Number(updatedProduct.price),
                category_id: updatedProduct.categoryId,
                image: updatedProduct.image,
                rating: Number(updatedProduct.rating),
                reviews: Number(updatedProduct.reviews),
                stock: Number(updatedProduct.stock),
                origin: updatedProduct.origin,
                badge: updatedProduct.badge,
                is_new: updatedProduct.isNew,
                is_organic: updatedProduct.isOrganic,
                seasonal_status: updatedProduct.seasonalStatus,
                harvest_date: updatedProduct.harvestDate,
                highlights: updatedProduct.highlights,
                long_description: updatedProduct.longDescription,
                // harvest_process removed
                variants: updatedProduct.variants
            };

            const { error } = await supabase
                .from('products')
                .update(dbProduct)
                .eq('id', updatedProduct.id);

            if (error) throw error;

            setProducts(prevProducts => prevProducts.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            ));
            showToast('Product updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating product:', error);
            showToast(`Failed to update product: ${error.message}`, 'error');
        }
    };

    // Category Management
    // Category Management
    const addCategory = async (categoryData) => {
        try {
            const newCategory = {
                id: categoryData.id || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
                ...categoryData
            };
            const { data, error } = await supabase.from('categories').insert([newCategory]).select();
            if (error) throw error;
            if (data) setCategories(prev => [...prev, ...data]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const updateCategory = async (updatedCategory) => {
        try {
            const { error } = await supabase
                .from('categories')
                .update(updatedCategory)
                .eq('id', updatedCategory.id);

            if (error) throw error;

            setCategories(prev => prev.map(c =>
                c.id === updatedCategory.id ? updatedCategory : c
            ));
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const { error } = await supabase.from('categories').delete().eq('id', categoryId);
            if (error) throw error;
            setCategories(prev => prev.filter(c => c.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const getReviews = async (productId) => {
        try {
            const { data, error } = await supabase
                .from('product_reviews')
                .select('*')
                .eq('product_id', productId)
                .eq('is_approved', true) // Only fetch approved reviews
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data.map(r => ({
                id: r.id,
                author: r.author_name,
                rating: r.rating,
                date: new Date(r.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                title: r.review_title,
                content: r.review_content,
                verified: r.is_verified
            }));
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    };

    const addReview = async (productId, reviewData) => {
        try {
            // Auto-generate title from first few words of content if not provided
            const autoTitle = reviewData.content.split(' ').slice(0, 4).join(' ') + '...';

            const dbReview = {
                product_id: productId,
                author_name: reviewData.author || 'Anonymous',
                rating: Number(reviewData.rating),
                review_title: autoTitle,
                review_content: reviewData.content,
                is_verified: true,
                is_approved: false // Pending admin approval
            };

            const { data, error } = await supabase
                .from('product_reviews')
                .insert([dbReview])
                .select();

            if (error) throw error;

            // Optional: Update product's average rating in DB
            // This would normally be handled by a DB trigger or a background job
            // For now, we'll just return the new review

            showToast('Review submitted! It will appear after admin approval.', 'success');
            return data[0];
        } catch (error) {
            console.error('Error adding review:', error);
            showToast(`Failed to submit review: ${error.message}`, 'error');
            return null;
        }
    };

    // Admin: Get all approved reviews
    const getAllApprovedReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('product_reviews')
                .select(`
                    *,
                    products (name, image)
                `)
                .eq('is_approved', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data.map(r => ({
                id: r.id,
                productName: r.products?.name || 'Unknown Product',
                productImage: r.products?.image,
                author: r.author_name,
                rating: r.rating,
                date: new Date(r.created_at).toLocaleDateString(),
                title: r.review_title,
                content: r.review_content,
                isFeatured: r.is_featured || false
            }));
        } catch (error) {
            console.error('Error fetching approved reviews:', error);
            return [];
        }
    };

    // Admin: Get all pending reviews
    const getAllPendingReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('product_reviews')
                .select(`
                    *,
                    products (name, image)
                `)
                .eq('is_approved', false)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data.map(r => ({
                id: r.id,
                productName: r.products?.name || 'Unknown Product',
                productImage: r.products?.image,
                author: r.author_name,
                rating: r.rating,
                date: new Date(r.created_at).toLocaleDateString(),
                title: r.review_title,
                content: r.review_content
            }));
        } catch (error) {
            console.error('Error fetching pending reviews:', error);
            return [];
        }
    };

    // Admin: Approve review
    const approveReview = async (reviewId) => {
        try {
            const { error } = await supabase
                .from('product_reviews')
                .update({ is_approved: true })
                .eq('id', reviewId);

            if (error) throw error;
            showToast('Review approved!', 'success');
        } catch (error) {
            console.error('Error approving review:', error);
            showToast(`Failed to approve: ${error.message}`, 'error');
        }
    };

    // Admin: Reject (delete) review
    const rejectReview = async (reviewId) => {
        try {
            const { error } = await supabase
                .from('product_reviews')
                .delete()
                .eq('id', reviewId);

            if (error) throw error;
            showToast('Review rejected!', 'success');
        } catch (error) {
            console.error('Error rejecting review:', error);
            showToast(`Failed to reject: ${error.message}`, 'error');
        }
    };

    // Get featured reviews for homepage
    const getFeaturedReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('product_reviews')
                .select(`
                    *,
                    products (name, image)
                `)
                .eq('is_approved', true)
                .eq('is_featured', true)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            return data.map(r => ({
                id: r.id,
                name: r.author_name,
                location: r.products?.name || 'Customer',
                rating: r.rating,
                role: r.is_verified ? 'Verified Buyer' : 'Customer',
                comment: r.review_content,
                date: new Date(r.created_at).toLocaleDateString()
            }));
        } catch (error) {
            console.error('Error fetching featured reviews:', error);
            return [];
        }
    };

    // Admin: Toggle featured status
    const toggleFeatured = async (reviewId, currentStatus) => {
        try {
            const { error } = await supabase
                .from('product_reviews')
                .update({ is_featured: !currentStatus })
                .eq('id', reviewId);

            if (error) throw error;
            showToast(!currentStatus ? 'Review featured on homepage!' : 'Removed from homepage', 'success');
        } catch (error) {
            console.error('Error toggling featured:', error);
            showToast(`Failed to update: ${error.message}`, 'error');
        }
    };

    // Inventory Management Methods
    const checkStock = async (productId, quantity) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('stock')
                .eq('id', productId)
                .single();

            if (error) throw error;
            return data.stock >= quantity;
        } catch (error) {
            console.error('Error checking stock:', error);
            return false;
        }
    };

    const updateStock = async (productId, quantity) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({ stock: quantity })
                .eq('id', productId);

            if (error) throw error;

            // Update local state
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, stock: quantity } : p
            ));

            showToast('Stock updated successfully!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Error updating stock:', error);
            showToast(`Failed to update stock: ${error.message}`, 'error');
            return { success: false };
        }
    };

    const deductStock = async (productId, quantity) => {
        try {
            // First get current stock
            const { data: product, error: fetchError } = await supabase
                .from('products')
                .select('stock')
                .eq('id', productId)
                .single();

            if (fetchError) throw fetchError;

            const newStock = product.stock - quantity;
            if (newStock < 0) {
                throw new Error('Insufficient stock');
            }

            // Update stock
            const { error: updateError } = await supabase
                .from('products')
                .update({ stock: newStock })
                .eq('id', productId);

            if (updateError) throw updateError;

            // Update local state
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, stock: newStock } : p
            ));

            return { success: true, newStock };
        } catch (error) {
            console.error('Error deducting stock:', error);
            return { success: false, error: error.message };
        }
    };

    const getLowStockProducts = () => {
        return products.filter(p => p.stock > 0 && p.stock <= 5);
    };

    const getOutOfStockProducts = () => {
        return products.filter(p => p.stock === 0);
    };

    const value = {
        products,
        categories,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        getReviews,
        addReview,
        getAllPendingReviews,
        getAllApprovedReviews,
        approveReview,
        rejectReview,
        getFeaturedReviews,
        toggleFeatured,
        // Inventory methods
        checkStock,
        updateStock,
        deductStock,
        getLowStockProducts,
        getOutOfStockProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
