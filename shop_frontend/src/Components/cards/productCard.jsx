import React, { useState } from "react";
import { Heart, ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";
import { useToast } from "../../context/toastContext";
import { createPortal } from "react-dom";

// MODAL PRODUIT
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
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
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

            <div className="text-4xl font-bold mb-6">
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
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded"
              >
                <Minus size={16} />
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => onAddToCart(quantity)}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Ajouter au panier
              </button>

              <button
                onClick={onToggleFavorite}
                className="w-12 h-12 border rounded-xl flex items-center justify-center"
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

// CARTE PRODUIT
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isProductFavorited = isFavorite(product.id);

  const handleAddToCart = (e, quantity = 1) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product, quantity);
    showToast(`${product.name} ajouté au panier`, "cart");
  };

  return (
    <>
      {/* CARTE CLIQUABLE */}
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="bg-white rounded-xl border cursor-pointer hover:shadow-lg transition"
      >
        {/* IMAGE AVEC OVERLAY */}
        <div className="relative group">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-52 object-cover"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
              Détails
            </span>
          </div>
        </div>

        {/* INFORMATIONS PRODUIT */}
        <div className="p-4">
          <h3 className="font-semibold mb-2">{product.name}</h3>

          <div className="text-xl font-bold mb-3">{product.price} €</div>

          <button
            onClick={(e) => handleAddToCart(e)}
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* MODAL */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={(q) => {
          addToCart(product, q);
          setIsModalOpen(false);
          showToast(`${product.name} ajouté au panier`, "cart");
        }}
        onToggleFavorite={() => {
          toggleFavorite(product);
          showToast(
            isProductFavorited
              ? `${product.name} retiré des favoris`
              : `${product.name} ajouté aux favoris`,
            "favorite"
          );
        }}
        isFavorite={isProductFavorited}
      />
    </>
  );
};

export default ProductCard;
