import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  LogOut,
  X,
  Plus,
  Minus,
  Package,
  ChevronLeft,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import orderService from "../../services/orderService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";
import { useToast } from "../../context/ToastContext";
import productService from "../../services/productService";
import { createPortal } from "react-dom";

// MODAL PRODUIT (copié de ProductCard)
const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const formatPrice = (price) =>
    typeof price === "number" ? `${price.toFixed(2)} €` : price || "0.00 €";

  return createPortal(
    // OVERLAY SOMBRE
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* CONTENEUR MODAL */}
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOUTON FERMETURE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <X size={20} />
        </button>

        {/* GRILLE IMAGE + DÉTAILS */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>

            <div className="text-4xl font-bold text-purple-600 mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600 mb-4">
              {product.description || "Aucune description disponible."}
            </p>

            {product.descriptif && (
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="font-semibold mb-2 text-gray-800">
                  Descriptif du produit
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.descriptif}
                </p>
              </div>
            )}

            {/* SÉLECTEUR QUANTITÉ */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Quantité :</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <Minus size={16} />
              </button>

              <span className="font-semibold text-lg w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => onAddToCart(quantity)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                <ShoppingCart size={18} />
                Ajouter au panier
              </button>

              <button
                onClick={onToggleFavorite}
                className="w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Heart
                  size={20}
                  className={
                    isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-700"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const OrderHistoryModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
      setSelectedOrder(null);
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getMyOrders();
      // Trier par date décroissante
      setOrders(data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* EN-TÊTE */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {selectedOrder ? (
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
              >
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Package size={20} />
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {selectedOrder ? `Commande #${selectedOrder.id}` : "Mes commandes"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENU */}
        <div className="overflow-y-auto p-6 flex-1 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
              <p>Chargement de l'historique...</p>
            </div>
          ) : selectedOrder ? (
            // DÉTAILS COMMANDE
            <div className="space-y-6">
              {/* Résumé statut */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date de commande</p>
                    <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-xl text-purple-600">
                      {selectedOrder.total.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Adresse */}
              {selectedOrder.shippingAddress && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold">
                    <MapPin size={20} className="text-purple-500" />
                    <h3>Adresse de livraison</h3>
                  </div>
                  <p className="text-gray-600 ml-7">
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}<br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              )}

              {/* Articles */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800 flex items-center gap-2">
                  <Package size={20} className="text-purple-500" />
                  Articles ({selectedOrder.items.length})
                </h3>
                <div className="divide-y divide-gray-100">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-4 flex gap-4 items-center hover:bg-gray-50 transition">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                        <p className="text-sm text-gray-500">
                          Prix untitaire: {item.price.toFixed(2)} €
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">x{item.quantity}</p>
                        <p className="text-purple-600 font-bold">
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // LISTE COMMANDES
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Package size={40} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-00">Aucune commande pour le moment</h3>
                  <p className="text-gray-500">Vos commandes apparaîtront ici.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-md transition text-left group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Commande #{order.id}
                        </span>
                        <h4 className="font-medium text-gray-900">
                          {formatDate(order.orderDate)}
                        </h4>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex -space-x-2 overflow-hidden py-1">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 overflow-hidden">
                            {item.imageUrl && <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <span className="font-bold text-gray-900">
                          {order.total.toFixed(2)} €
                        </span>
                        <div className="text-purple-500">
                          <ChevronLeft size={16} className="rotate-180" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount, addToCart } = useCart();
  const { favoriteCount, toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  // Mapping des catégories ID vers les routes
  const categoryRoutes = {
    1: "alimentation", // Alimentation
    2: "jouets", // Jouets
    3: "accessoires", // Accessoires
    4: "habitat", // Habitat
    5: "hygiene", // Bien-être
    6: "alimentation", // Pâtée (sous-catégorie)
    7: "alimentation", // Croquettes (sous-catégorie)
    8: "alimentation", // Gourmet (sous-catégorie)
    9: "alimentation", // Friandises (sous-catégorie)
    10: "alimentation", // Petit prix (sous-catégorie)
    11: "habitat", // Cages (sous-catégorie)
    12: "habitat", // Aquariums (sous-catégorie)
    13: "habitat", // Terrariums (sous-catégorie)
    14: "habitat", // Niches (sous-catégorie)
    15: "habitat", // Arbres à chat (sous-catégorie)
    16: "habitat", // Paniers & Coussins (sous-catégorie)
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Recherche avec debounce pour éviter trop d'appels API
  const handleSearch = async (query) => {
    setSearchQuery(query);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    // Si moins de 2 caractères, on attend
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(true);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce de 300ms
    debounceTimer.current = setTimeout(async () => {
      try {
        // Utilise la méthode searchProducts de l'API
        const results = await productService.searchProducts(query);

        console.log("Résultats de recherche:", results); // Debug

        setSearchResults(results || []);
        setShowResults(true);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  // Ouvrir le modal du produit
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    // Réinitialise la recherche
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Fermer les résultats si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Soumettre la recherche avec Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleProductClick(searchResults[0]);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-evenly">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg p-2 flex items-center justify-center">
                <img
                  src="./public/Molly.JPG"
                  alt="Molly"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  L'Univers de Molly
                </h1>
                <p className="text-xs text-gray-500 italic">
                  Tout pour vos compagnons adorés
                </p>
              </div>
            </Link>

            {/* BARRE DE RECHERCHE */}
            <div
              className="hidden md:flex flex-1 max-w-xl mx-8 relative"
              ref={searchRef}
            >
              <form onSubmit={handleSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher un produit, une marque..."
                  className="w-full px-6 py-3 rounded-full bg-gray-50 border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setShowResults(false);
                    }}
                    className="absolute right-32 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={20} />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
                >
                  Rechercher
                </button>
              </form>

              {/* RÉSULTATS DE RECHERCHE */}
              {showResults && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                      <p className="mt-2">Recherche en cours...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition text-left"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML =
                                    '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>';
                                }}
                              />
                            ) : (
                              <Search size={20} className="text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-sm text-purple-600 font-semibold">
                              {product.price}€
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.length < 2 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Search
                        size={40}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>Tapez au moins 2 caractères pour rechercher</p>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Search
                        size={40}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>Aucun produit trouvé pour "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-6">
              {/* COMPTE */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="hidden md:flex items-center gap-2 text-gray-700 hover:text-purple-600 transition"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">
                      Bonjour {user?.firstName || "Utilisateur"}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition"
                    title="Se déconnecter"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-purple-600 transition"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">Se connecter</span>
                </Link>
              )}

              {/* FAVORIS */}
              <Link
                to="/favoris"
                className="relative hover:text-purple-600 transition"
              >
                <Heart size={24} className="text-gray-700" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <Link
                to="/panier"
                className="relative hover:text-purple-600 transition"
              >
                <ShoppingCart size={24} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* COMMANDES (Connnecté + Non Admin) */}
              {isAuthenticated && user?.role !== "ADMIN" && (
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="relative hover:text-purple-600 transition text-gray-700"
                  title="Mes commandes"
                >
                  <Package size={24} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MENU NAVIGATION */}
        <nav className="border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center gap-8 py-3">
              <li>
                <Link
                  to="/alimentation"
                  className="text-md font-medium text-gray-700 hover:text-orange-600 transition"
                >
                  Alimentation
                </Link>
              </li>

              <li>
                <Link
                  to="/jouets"
                  className="text-md font-medium text-gray-700 hover:text-purple-600 transition"
                >
                  Jouets
                </Link>
              </li>

              <li>
                <Link
                  to="/accessoires"
                  className="text-md font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Accessoires
                </Link>
              </li>

              <li>
                <Link
                  to="/habitat"
                  className="text-md font-medium text-gray-700 hover:text-green-600 transition"
                >
                  Habitat
                </Link>
              </li>

              <li>
                <Link
                  to="/hygiene"
                  className="text-md font-medium text-gray-700 hover:text-pink-600 transition"
                >
                  Bien-être
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MODAL PRODUIT */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={(quantity) => {
          addToCart(selectedProduct, quantity);
          setIsModalOpen(false);
          showToast(`${selectedProduct.name} ajouté au panier`, "cart");
        }}
        onToggleFavorite={() => {
          const isProductFavorited = isFavorite(selectedProduct.id);
          toggleFavorite(selectedProduct);
          showToast(
            isProductFavorited
              ? `${selectedProduct.name} retiré des favoris`
              : `${selectedProduct.name} ajouté aux favoris`,
            "favorite"
          );
        }}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
      />

      {/* MODAL HISTORIQUE COMMANDES */}
      <OrderHistoryModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
};

export default Header;
