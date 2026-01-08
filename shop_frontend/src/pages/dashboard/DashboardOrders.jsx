import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, Loader2, RefreshCw } from 'lucide-react';
import orderService from '../../services/orderService';

const DashboardOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (err) {
            setError("Erreur lors de la récupération des commandes");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PAID':
            case 'Livré':
                return 'bg-green-100 text-green-600';
            case 'PENDING':
            case 'En cours':
                return 'bg-blue-100 text-blue-600';
            case 'CANCELLED':
            case 'Annulé':
                return 'bg-red-100 text-red-600';
            case 'SHIPPED':
                return 'bg-purple-100 text-purple-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            fetchOrders(); // Refresh list
        } catch (err) {
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
                    <p className="text-gray-500">Suivi des commandes clients en temps réel</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchOrders}
                        className="p-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                        title="Actualiser"
                    >
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                        <Download size={20} />
                        <span>Exporter</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher par # ID, client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                    <Filter size={20} />
                    <span>Filtres</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading && orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
                            <p className="text-gray-500">Chargement des commandes...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">
                            {error}
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            Aucune commande trouvée.
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Commande</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Client</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Total</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Statut</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-purple-600">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                                                    {order.customerName?.charAt(0) || 'U'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 font-medium">{order.customerName}</span>
                                                    <span className="text-xs text-gray-500">{order.customerEmail}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(order.orderDate)}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.total?.toFixed(2)} €</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium border-none focus:ring-2 focus:ring-purple-200 cursor-pointer ${getStatusColor(order.status)}`}
                                            >
                                                <option value="PENDING">En attente</option>
                                                <option value="PAID">Payée</option>
                                                <option value="SHIPPED">Expédiée</option>
                                                <option value="DELIVERED">Livrée</option>
                                                <option value="CANCELLED">Annulée</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOrders;
