import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AddProductModal = ({ isOpen, onClose, onSuccess, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    descriptif: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
    animalId: "",
  });

  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FILTRAGE DES CATÉGORIES
  const parentCategories = categories.filter((c) => !c.parentId);
  const subCategories = categories.filter(
    (c) => c.parentId && c.parentId === parseInt(selectedParentId)
  );

  // CHARGEMENT DES DONNÉES INITIALES
  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("=== PRODUCT REÇU DANS MODAL ===");
    console.log("Product complet:", product);
    console.log("Descriptif:", product?.descriptif);
    console.log("================================");
  }, [product]);

  const fetchInitialData = async () => {
    try {
      const [categoriesRes, animalsRes] = await Promise.all([
        axios.get("http://localhost:8081/api/categories"),
        axios.get("http://localhost:8081/api/animals"),
      ]);
      setCategories(categoriesRes.data);
      setAnimals(animalsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Erreur lors du chargement des données");
    }
  };

  // CHARGEMENT DES DONNÉES PRODUIT POUR ÉDITION
  useEffect(() => {
    if (isOpen && product && categories.length > 0) {
      console.log("Chargement du produit dans le formulaire");

      const newFormData = {
        name: product.name || "",
        description: product.description || "",
        descriptif: product.descriptif || "",
        price: product.price || "",
        stock: product.stock || "",
        imageUrl: product.imageUrl || "",
        categoryId: product.categoryId || product.category?.id || "",
        animalId: product.animalId || product.animal?.id || "",
      };

      console.log("Données du formulaire:", newFormData);
      setFormData(newFormData);

      // RECHERCHE DE LA CATÉGORIE PARENT
      const productCategoryId = product.categoryId || product.category?.id;
      if (productCategoryId) {
        const selectedCategory = categories.find(
          (c) => c.id === productCategoryId
        );
        if (selectedCategory) {
          if (selectedCategory.parentId) {
            setSelectedParentId(selectedCategory.parentId.toString());
          } else {
            setSelectedParentId(selectedCategory.id.toString());
          }
        }
      }
    } else if (isOpen && !product) {
      // RÉINITIALISATION POUR NOUVEAU PRODUIT
      setFormData({
        name: "",
        description: "",
        descriptif: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: "",
        animalId: "",
      });
      setSelectedParentId("");
    }
  }, [isOpen, product, categories]);

  const handleParentCategoryChange = (e) => {
    const newParentId = e.target.value;
    setSelectedParentId(newParentId);

    const requiresSubCategory = newParentId === "1" || newParentId === "4";

    setFormData({
      ...formData,
      categoryId: requiresSubCategory ? "" : newParentId,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changement de ${name}:`, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
        animalId: formData.animalId ? parseInt(formData.animalId) : null,
      };

      console.log("Payload envoyé:", payload);

      if (product) {
        await axios.put(
          `http://localhost:8081/api/products/${product.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:8081/api/products", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // RÉINITIALISATION
      setFormData({
        name: "",
        description: "",
        descriptif: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: "",
        animalId: "",
      });
      setSelectedParentId("");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
      setError(
        err.response?.data ||
          `Erreur lors de ${
            product ? "la modification" : "la création"
          } du produit`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold text-white">
            {product ? "Modifier le Produit" : "Nouveau Produit"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* NOM */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Laisse Premium"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
            />
          </div>

          {/* DESCRIPTION COURTE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description courte *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Description courte affichée dans les cartes produit..."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition resize-none"
            />
          </div>

          {/* DESCRIPTIF DÉTAILLÉ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descriptif détaillé
            </label>
            <textarea
              name="descriptif"
              value={formData.descriptif}
              onChange={handleChange}
              rows={4}
              placeholder="Informations complémentaires, conseils d'utilisation, détails techniques..."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition resize-none"
            />
            <div className="mt-1 text-xs text-gray-500">
              Caractères: {formData.descriptif?.length || 0}
            </div>
          </div>

          {/* PRIX ET STOCK */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="24.99"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="50"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
              />
            </div>
          </div>

          {/* ANIMAL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Animal *
            </label>
            <select
              name="animalId"
              value={formData.animalId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
            >
              <option value="">Sélectionner un animal</option>
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>

          {/* CATÉGORIES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catégorie Principale *
              </label>
              <select
                value={selectedParentId}
                onChange={handleParentCategoryChange}
                required
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
              >
                <option value="">Choisir une catégorie</option>
                {parentCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sous-catégorie *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                disabled={
                  !selectedParentId ||
                  (parseInt(selectedParentId) !== 1 &&
                    parseInt(selectedParentId) !== 4)
                }
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">
                  {selectedParentId
                    ? parseInt(selectedParentId) === 1 ||
                      parseInt(selectedParentId) === 4
                      ? "Choisir une sous-catégorie"
                      : "Aucune sous-catégorie"
                    : "Sélectionnez d'abord une catégorie"}
                </option>
                {subCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL de l'image
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
            />
          </div>

          {/* BOUTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? product
                  ? "Modification..."
                  : "Création..."
                : product
                ? "Modifier le produit"
                : "Créer le produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
