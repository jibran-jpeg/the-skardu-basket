import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { getImageUrl } from '../utils/imageHelper';
import { Package, AlertTriangle, TrendingDown, Search, Plus, Minus, RefreshCw, FileDown } from 'lucide-react';

export default function InventoryManagement() {
    const { products, updateStock, getLowStockProducts, getOutOfStockProducts, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, low, out
    const [editingStock, setEditingStock] = useState({});

    const lowStockCount = getLowStockProducts().length;
    const outOfStockCount = getOutOfStockProducts().length;

    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' };
        if (stock <= 5) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' };
        return { label: 'In Stock', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        if (filterStatus === 'low') return product.stock > 0 && product.stock <= 5;
        if (filterStatus === 'out') return product.stock === 0;
        return true;
    });

    const handleStockAdjust = async (productId, currentStock, adjustment) => {
        const newStock = Math.max(0, currentStock + adjustment);
        await updateStock(productId, newStock);
    };

    const handleStockEdit = (productId, value) => {
        setEditingStock({ ...editingStock, [productId]: value });
    };

    const handleStockSave = async (productId) => {
        const newStock = parseInt(editingStock[productId]);
        if (!isNaN(newStock) && newStock >= 0) {
            await updateStock(productId, newStock);
            setEditingStock({ ...editingStock, [productId]: undefined });
        }
    };

    const exportInventoryReport = () => {
        const csvContent = [
            ['Product Name', 'Category', 'Current Stock', 'Status', 'Price'],
            ...products.map(p => [
                p.name,
                p.categoryId,
                p.stock,
                getStockStatus(p.stock).label,
                `PKR ${p.price}`
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inventory-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw className="w-8 h-8 animate-spin text-brand-primary dark:text-brand-accent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
                        Inventory Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track and manage product stock levels
                    </p>
                </div>
                <button
                    onClick={exportInventoryReport}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-all"
                >
                    <FileDown size={18} />
                    Export Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1F2833] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Products</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1F2833] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Low Stock Items</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{lowStockCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1F2833] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Out of Stock</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{outOfStockCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#1F2833] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterStatus === 'all'
                                ? 'bg-brand-primary text-white'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus('low')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterStatus === 'low'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                }`}
                        >
                            Low Stock
                        </button>
                        <button
                            onClick={() => setFilterStatus('out')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterStatus === 'out'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                }`}
                        >
                            Out of Stock
                        </button>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white dark:bg-[#1F2833] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Current Stock
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {filteredProducts.map((product) => {
                                const status = getStockStatus(product.stock);
                                const isEditing = editingStock[product.id] !== undefined;

                                return (
                                    <tr
                                        key={product.id}
                                        className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${product.stock === 0 ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={getImageUrl(product.image)}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-white/5"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">PKR {product.price}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {product.categoryId?.replace(/-/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isEditing ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={editingStock[product.id]}
                                                        onChange={(e) => handleStockEdit(product.id, e.target.value)}
                                                        className="w-20 px-2 py-1 text-center bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white"
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') handleStockSave(product.id);
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => handleStockSave(product.id)}
                                                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            ) : (
                                                <p
                                                    className="text-center font-bold text-gray-900 dark:text-white cursor-pointer hover:text-brand-primary dark:hover:text-brand-accent"
                                                    onClick={() => handleStockEdit(product.id, product.stock)}
                                                >
                                                    {product.stock}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleStockAdjust(product.id, product.stock, -1)}
                                                    disabled={product.stock === 0}
                                                    className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                >
                                                    <Minus size={16} className="text-gray-700 dark:text-gray-300" />
                                                </button>
                                                <button
                                                    onClick={() => handleStockAdjust(product.id, product.stock, 1)}
                                                    className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                                                >
                                                    <Plus size={16} className="text-gray-700 dark:text-gray-300" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No products found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
