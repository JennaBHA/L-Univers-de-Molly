import axios from "axios";

const API_URL = "http://localhost:8081/api/favorites";

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const favoriteService = {
  // Get all favorites for current user
  getFavorites: async () => {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Add product to favorites
  addToFavorites: async (productId) => {
    const response = await axios.post(
      `${API_URL}/${productId}`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // Remove product from favorites
  removeFromFavorites: async (productId) => {
    await axios.delete(`${API_URL}/${productId}`, {
      headers: getAuthHeader(),
    });
  },

  // Check if product is favorited
  isFavorite: async (productId) => {
    const response = await axios.get(`${API_URL}/${productId}/check`, {
      headers: getAuthHeader(),
    });
    return response.data.isFavorite;
  },

  // Get favorite count
  getFavoriteCount: async () => {
    const response = await axios.get(`${API_URL}/count`, {
      headers: getAuthHeader(),
    });
    return response.data.count;
  },

  // Get all favorite product IDs (useful for checking multiple products)
  getFavoriteIds: async () => {
    const response = await axios.get(`${API_URL}/ids`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};

export default favoriteService;
