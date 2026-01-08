import axios from "axios";

const API_URL = "http://localhost:8081/api/cart";

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const cartService = {
  // Get all cart items for current user
  getCart: async () => {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await axios.post(
      API_URL,
      { productId, quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Update item quantity
  updateQuantity: async (productId, quantity) => {
    const response = await axios.put(
      `${API_URL}/${productId}`,
      { quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    await axios.delete(`${API_URL}/${productId}`, {
      headers: getAuthHeader(),
    });
  },

  // Clear entire cart
  clearCart: async () => {
    await axios.delete(API_URL, {
      headers: getAuthHeader(),
    });
  },

  // Get cart item count
  getCartCount: async () => {
    const response = await axios.get(`${API_URL}/count`, {
      headers: getAuthHeader(),
    });
    return response.data.count;
  },
};

export default cartService;
