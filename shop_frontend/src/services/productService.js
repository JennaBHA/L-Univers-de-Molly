import api from './api';

const productService = {
    //Get all products with pagination and filters
    getProducts: async ({ page = 0, size = 10, sort = 'name,asc', categoryId, animalId, search } = {}) => {
        try {
            const params = { page, size, sort };
            if (categoryId) params.categoryId = categoryId;
            if (animalId) params.animalId = animalId;
            if (search) params.search = search;

            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all animals
    getAnimals: async () => {
        try {
            const response = await api.get('/animals');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get subcategories by parent ID
    getSubCategories: async (parentId) => {
        try {
            const response = await api.get(`/categories/${parentId}/subcategories`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    //Get product by ID
    getProductById: async (productId) => {
        try {
            const response = await api.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Search products
    searchProducts: async (query) => {
        try {
            const response = await api.get('/products/search', {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    //Get products by category
    getProductsByCategory: async (categoryId, page = 0, size = 10) => {
        try {
            const response = await api.get(`/products/category/${categoryId}`, {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },


    // ADMIN - Create new product
    createProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // ADMIN - Update product
    updateProduct: async (productId, productData) => {
        try {
            const response = await api.put(`/products/${productId}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default productService;