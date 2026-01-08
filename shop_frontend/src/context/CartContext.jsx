import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import cartService from "../services/cartService";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    if (isAuthenticated && token) {
      try {
        setLoading(true);
        const items = await cartService.getCart();
        setCartItems(items);
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (error) {
        console.error("Error loading cart:", error);
        // Si erreur 403, fallback sur localStorage
        if (error.response?.status === 403) {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            const items = JSON.parse(savedCart);
            setCartItems(items);
            setCartCount(
              items.reduce((sum, item) => sum + (item.quantity || 1), 0)
            );
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Load from localStorage for non-authenticated users
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        const count = items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCartCount(count);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    }
  }, [isAuthenticated]);

  // Load cart on mount and when auth state changes
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        await cartService.addToCart(product.id, quantity);
        await loadCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // localStorage fallback
      const existingIndex = cartItems.findIndex(
        (item) => item.id === product.id
      );
      let newCart;

      if (existingIndex >= 0) {
        newCart = cartItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        newCart = [...cartItems, { ...product, quantity }];
      }

      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartCount(
        newCart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      );
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        await cartService.updateQuantity(productId, quantity);
        await loadCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const newCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartCount(
        newCart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      );
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await cartService.removeFromCart(productId);
        await loadCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      const newCart = cartItems.filter((item) => item.id !== productId);
      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartCount(
        newCart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      );
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await cartService.clearCart();
        setCartItems([]);
        setCartCount(0);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      setCartItems([]);
      setCartCount(0);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some(
      (item) =>
        item.id === productId || (item.product && item.product.id === productId)
    );
  };

  // Get cart item by product ID
  const getCartItem = (productId) => {
    return cartItems.find(
      (item) =>
        item.id === productId || (item.product && item.product.id === productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        getCartItem,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
