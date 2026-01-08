import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      // Set default axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // Nouvelle fonction login qui accepte directement les données
  const login = (userData, token) => {
    try {
      // Save to local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
      setIsAuthenticated(true);

      console.log("Connexion réussie:", userData.firstName);

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      return {
        success: false,
        error: "Erreur lors de la sauvegarde des données",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (firstName, lastName, email, phone, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
        }
      );

      // Registration successful
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error:
          error.response?.data ||
          "Une erreur est survenue lors de l'inscription",
      };
    }
  };

  const updateUser = (newUserData) => {
    try {
      const updatedUser = { ...user, ...newUserData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      console.log("Profil mis à jour");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        updateUser,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
