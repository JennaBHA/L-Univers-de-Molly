import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import favoriteService from "../services/favoriteService";

const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState(new Set());
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    // Load favorites from backend or localStorage
    const loadFavorites = useCallback(async () => {
        if (isAuthenticated) {
            try {
                setLoading(true);
                const items = await favoriteService.getFavorites();
                setFavorites(items);
                setFavoriteIds(new Set(items.map(item => item.id)));
                setFavoriteCount(items.length);
            } catch (error) {
                console.error("Error loading favorites:", error);
            } finally {
                setLoading(false);
            }
        } else {
            // Load from localStorage for non-authenticated users
            const savedFavoris = localStorage.getItem("favoris");
            if (savedFavoris) {
                const items = JSON.parse(savedFavoris);
                setFavorites(items);
                setFavoriteIds(new Set(items.map(item => item.id)));
                setFavoriteCount(items.length);
            } else {
                setFavorites([]);
                setFavoriteIds(new Set());
                setFavoriteCount(0);
            }
        }
    }, [isAuthenticated]);

    // Load favorites on mount and when auth state changes
    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    // Add product to favorites
    const addToFavorites = async (product) => {
        if (isAuthenticated) {
            try {
                await favoriteService.addToFavorites(product.id);
                await loadFavorites();
            } catch (error) {
                console.error("Error adding to favorites:", error);
            }
        } else {
            // localStorage fallback
            if (favoriteIds.has(product.id)) return;

            const newFavorites = [...favorites, product];
            setFavorites(newFavorites);
            setFavoriteIds(new Set([...favoriteIds, product.id]));
            setFavoriteCount(newFavorites.length);
            localStorage.setItem("favoris", JSON.stringify(newFavorites));
            window.dispatchEvent(new Event("favorisUpdated"));
        }
    };

    // Remove product from favorites
    const removeFromFavorites = async (productId) => {
        if (isAuthenticated) {
            try {
                await favoriteService.removeFromFavorites(productId);
                await loadFavorites();
            } catch (error) {
                console.error("Error removing from favorites:", error);
            }
        } else {
            const newFavorites = favorites.filter(item => item.id !== productId);
            const newIds = new Set(favoriteIds);
            newIds.delete(productId);

            setFavorites(newFavorites);
            setFavoriteIds(newIds);
            setFavoriteCount(newFavorites.length);
            localStorage.setItem("favoris", JSON.stringify(newFavorites));
            window.dispatchEvent(new Event("favorisUpdated"));
        }
    };

    // Toggle favorite status
    const toggleFavorite = async (product) => {
        if (isFavorite(product.id)) {
            await removeFromFavorites(product.id);
        } else {
            await addToFavorites(product);
        }
    };

    // Check if product is favorited
    const isFavorite = (productId) => {
        return favoriteIds.has(productId);
    };

    // Clear all favorites
    const clearFavorites = async () => {
        if (isAuthenticated) {
            // Remove each favorite one by one (no bulk endpoint)
            try {
                for (const fav of favorites) {
                    await favoriteService.removeFromFavorites(fav.id);
                }
                setFavorites([]);
                setFavoriteIds(new Set());
                setFavoriteCount(0);
            } catch (error) {
                console.error("Error clearing favorites:", error);
            }
        } else {
            setFavorites([]);
            setFavoriteIds(new Set());
            setFavoriteCount(0);
            localStorage.removeItem("favoris");
            window.dispatchEvent(new Event("favorisUpdated"));
        }
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                favoriteCount,
                loading,
                addToFavorites,
                removeFromFavorites,
                toggleFavorite,
                isFavorite,
                clearFavorites,
                refreshFavorites: loadFavorites
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoriteProvider");
    }
    return context;
};
