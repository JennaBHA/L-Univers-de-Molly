import axios from "axios";

// ============================================
// CONFIGURATION API - BACKEND SPRING BOOT
// ============================================
// URL du backend (tu peux changer dans .env)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Créer l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 secondes
});

// ============================================
// INTERCEPTEUR REQUÊTE
// ============================================
// Ajoute automatiquement le token JWT si l'utilisateur est connecté
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// INTERCEPTEUR RÉPONSE
// ============================================
// Gère les erreurs du serveur
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Erreurs côté serveur
      if (error.response.status === 401) {
        // Non autorisé - token invalide
        console.error("Erreur 401 : Non autorisé");
        // Tu peux rediriger vers la page de connexion ici
        // window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Accès interdit
        console.error("Erreur 403 : Accès interdit");
      } else if (error.response.status === 404) {
        // Ressource non trouvée
        console.error("Erreur 404 : Ressource non trouvée");
      } else {
        console.error(
          `Erreur ${error.response.status} : ${
            error.response.data.message || "Erreur inconnue"
          }`
        );
      }
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error("Erreur réseau : Pas de réponse du serveur");
    } else {
      // Erreur lors de la configuration de la requête
      console.error("Erreur:", error.message);
    }
    return Promise.reject(error);
  }
);

// Export l'instance axios par défaut
export default api;

// ============================================
// FONCTIONS API - PRODUITS
// ============================================

/**
 * Récupérer tous les produits
 */
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

/**
 * Récupérer un produit par ID
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${id}:`, error);
    throw error;
  }
};

/**
 * Rechercher des produits
 */
export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get("/products/search", {
      params: { q: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche de produits:", error);
    throw error;
  }
};

// ============================================
// FONCTIONS API - CATÉGORIES
// ============================================

/**
 * Récupérer toutes les catégories
 */
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
};

/**
 * Récupérer une catégorie par ID
 */
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la catégorie ${id}:`,
      error
    );
    throw error;
  }
};

// ============================================
// FONCTIONS API - PANIER
// ============================================

/**
 * Récupérer le panier de l'utilisateur
 */
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    throw error;
  }
};

/**
 * Ajouter un produit au panier
 */
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    throw error;
  }
};

/**
 * Mettre à jour la quantité d'un article du panier
 */
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    throw error;
  }
};

/**
 * Supprimer un article du panier
 */
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    throw error;
  }
};

// ============================================
// FONCTIONS API - COMMANDES
// ============================================

/**
 * Récupérer toutes les commandes de l'utilisateur
 */
export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    throw error;
  }
};

/**
 * Récupérer une commande par ID
 */
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la commande ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Créer une nouvelle commande
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
};

// ============================================
// FONCTIONS API - AUTHENTIFICATION
// ============================================

/**
 * Inscription d'un nouvel utilisateur
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

/**
 * Connexion d'un utilisateur
 */
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

/**
 * Déconnexion
 */
export const logout = () => {
  localStorage.removeItem("token");
};

/**
 * Récupérer le profil de l'utilisateur connecté
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    throw error;
  }
};

// ============================================
// FONCTIONS API - ADRESSES
// ============================================

/**
 * Récupérer les adresses de l'utilisateur
 */
export const getAddresses = async () => {
  try {
    const response = await api.get("/addresses");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des adresses:", error);
    throw error;
  }
};

/**
 * Ajouter une nouvelle adresse
 */
export const addAddress = async (addressData) => {
  try {
    const response = await api.post("/addresses", addressData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'adresse:", error);
    throw error;
  }
};

/**
 * Mettre à jour une adresse
 */
export const updateAddress = async (id, addressData) => {
  try {
    const response = await api.put(`/addresses/${id}`, addressData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adresse:", error);
    throw error;
  }
};

/**
 * Supprimer une adresse
 */
export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adresse:", error);
    throw error;
  }
};
