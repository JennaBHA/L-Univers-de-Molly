import api from './api';

const productService = {
//Get all products with pagination
getProducts: async (page = 0, size = 10, sort = 'name,asc') => {
try {
const response = await api.get('/products', {
params: { page, size, sort },
});
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
    const  response  = await api.get('/products/search', {
    params: { q: query },
    });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;}
}
},

//Get products by category
getProductsByCategory: async (categoryId, page = 0, size = 10) => {
try {
    const response = await api.get(`/products/category/${categoryId}`,
    params: { page, size },
    });
    return  response.data;
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