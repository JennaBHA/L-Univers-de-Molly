import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import AddProductModal from "../../Components/dashboard/AddProductModal";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/api/products");
      const sortedProducts = response.data.sort((a, b) => b.id - a.id);
      setProducts(sortedProducts);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = () => {
    fetchProducts();
    setSelectedProduct(null);
  };

  const handleEdit = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products/${product.id}`
      );
      setSelectedProduct(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erreur chargement produit :", err);
      alert("Impossible de charger le produit");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Erreur lors de la suppression du produit");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { label: "Rupture", color: "bg-red-100 text-red-600" };
    if (stock < 20)
      return { label: "Faible", color: "bg-orange-100 text-orange-600" };
    return { label: "En stock", color: "bg-green-100 text-green-600" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement des produits...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-500">Gérez votre catalogue</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          <span>Nouveau Produit</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Produit
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Catégorie
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">Prix</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Stock</th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Statut
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Aucun produit trouvé.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = getStockStatus(product.stock);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-purple-100" />
                            )}
                          </div>
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.category?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.price} €
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        key={selectedProduct ? selectedProduct.id : "new"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleProductCreated}
        product={selectedProduct}
      />
    </div>
  );
};

export default DashboardProducts;
