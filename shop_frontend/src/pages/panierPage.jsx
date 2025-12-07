import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
} from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";

const PanierPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Récupérer le panier depuis localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newCart);
  };

  const removeItem = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const applyPromoCode = () => {
    const codes = {
      MOLLY10: 10,
      BIENVENUE: 15,
      SOLDES20: 20,
    };

    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
      alert(
        `Code promo appliqué ! ${codes[promoCode.toUpperCase()]}% de réduction`
      );
    } else {
      alert("Code promo invalide");
      setDiscount(0);
    }
  };

  // Calculs
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("€", "").replace(",", "."));
    return sum + price * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HEADER DE PAGE */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
              <ShoppingCart className="text-purple-600" size={32} />
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <Trash2 size={16} />
                Vider le panier
              </button>
            )}
          </div>

          <p className="text-gray-600 mt-2">
            {cart.length} article{cart.length > 1 ? "s" : ""} dans votre panier
          </p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <ShoppingCart className="mx-auto mb-4 text-gray-300" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits et ajoutez-les à votre panier !
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LISTE DES ARTICLES */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex gap-4"
                >
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* INFOS */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.category}
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      {item.price}
                    </p>
                  </div>

                  {/* QUANTITÉ */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* SOUS-TOTAL ARTICLE */}
                    <p className="text-sm text-gray-600">
                      Sous-total:{" "}
                      <span className="font-semibold text-gray-900">
                        {(
                          parseFloat(
                            item.price.replace("€", "").replace(",", ".")
                          ) * item.quantity
                        ).toFixed(2)}
                        €
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RÉCAPITULATIF */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Récapitulatif
                </h3>

                {/* CODE PROMO */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      placeholder="MOLLY10"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                    >
                      <Tag size={16} />
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Code appliqué : {discount}% de réduction
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  {/* SOUS-TOTAL */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">
                      {subtotal.toFixed(2)}€
                    </span>
                  </div>

                  {/* RÉDUCTION */}
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">
                        Réduction ({discount}%)
                      </span>
                      <span className="font-semibold text-green-600">
                        -{discountAmount.toFixed(2)}€
                      </span>
                    </div>
                  )}

                  {/* LIVRAISON */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `${shipping.toFixed(2)}€`
                      )}
                    </span>
                  </div>

                  {subtotal < 50 && (
                    <p className="text-xs text-gray-500">
                      Ajoutez {(50 - subtotal).toFixed(2)}€ pour la livraison
                      gratuite
                    </p>
                  )}

                  {/* TOTAL */}
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span className="text-purple-600">{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* BOUTON COMMANDER */}
                <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Passer la commande
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm text-gray-600 hover:text-purple-600 mt-4"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PanierPage;
