import api from './api';

const orderService = {
    //Get all user orders
    getUserOrders: async () => {
        try {
            const response = await api.get('/orders/user');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

//Get order by ID
orderService.getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//Create new order
orderService.createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// ADMIN - Update order status
updateOrderStatus: async (id, status) => {
    try {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// ADMIN - Get all orders
orderService.getAllOrders = async (page = 0, size = 10) => {
    try {
        const response = await api.get('/orders', {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// CANCEL order
orderService.cancelOrder = async (orderId) => {
    try {
        const response = await api.put(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default orderService;