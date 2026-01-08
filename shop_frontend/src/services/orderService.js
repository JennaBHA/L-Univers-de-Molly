import api from './api';

const orderService = {
    // Get Stripe config
    getStripeConfig: async () => {
        const response = await api.get('/payment/config');
        return response.data;
    },

    // Create payment intent
    createPaymentIntent: async () => {
        const response = await api.post('/payment/create-intent');
        return response.data;
    },

    // Process checkout
    checkout: async (checkoutData) => {
        const response = await api.post('/orders/checkout', checkoutData);
        return response.data;
    },

    // Get user's orders
    getMyOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    // Get order by ID
    getOrderById: async (orderId) => {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },

    // Get all orders (admin)
    getAllOrders: async () => {
        const response = await api.get('/orders/all');
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (orderId, status) => {
        const response = await api.put(`/orders/${orderId}/status`, { status });
        return response.data;
    },

    // Cancel order
    cancelOrder: async (orderId) => {
        const response = await api.put(`/orders/${orderId}/status`, { status: 'CANCELLED' });
        return response.data;
    }
};

export default orderService;
