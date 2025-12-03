import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import axios from 'axios';

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: ''
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch categories on mount
    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Erreur lors du chargement des catégories');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8081/api/products', {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                categoryId: parseInt(formData.categoryId)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Reset form and close modal
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                imageUrl: '',
                categoryId: ''
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error creating product:', err);
            setError(err.response?.data || 'Erreur lors de la création du produit');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex items-center justify-between rounded-t-3xl">
                    <h2 className="text-2xl font-bold text-white">Nouveau Produit</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nom du produit *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Laisse Premium"
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Description détaillée du produit..."
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition resize-none"
                        />
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Prix (€) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="24.99"
                                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Stock *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                placeholder="50"
                                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Catégorie *
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            URL de l'image
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Création...' : 'Créer le produit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
