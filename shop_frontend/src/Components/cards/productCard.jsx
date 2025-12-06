import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  // FONCTION pour afficher les étoiles
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }
          />
        ))}
        <span className="text-xs text-gray-600 ml-1.5">
          ({product.reviews})
        </span>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold">
              -{product.discount}
            </span>
          )}
          {product.isPremium && (
            <span className="bg-purple-600 text-white px-2.5 py-1 rounded-md text-xs font-semibold">
              Premium
            </span>
          )}
        </div>

        {/* BOUTON FAVORIS */}
        <button
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-50"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            size={18}
            className="text-gray-700 hover:text-pink-500 transition-colors"
          />
        </button>
      </div>

      {/* INFORMATIONS PRODUIT */}
      <div className="p-4">
        {/* NOM */}
        <h3 className="font-semibold text-gray-900 mb-2 h-11 line-clamp-2 text-sm leading-snug">
          {product.name}
        </h3>

        {/* ÉTOILES + AVIS */}
        <div className="mb-3">{renderStars(product.rating)}</div>

        {/* PRIX */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* ÉCONOMIE */}
          {product.oldPrice && product.discount && (
            <span className="text-xs text-green-600 font-medium">
              Économisez {product.discount}
            </span>
          )}
        </div>

        {/* BOUTON PANIER */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
          <ShoppingCart size={16} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
