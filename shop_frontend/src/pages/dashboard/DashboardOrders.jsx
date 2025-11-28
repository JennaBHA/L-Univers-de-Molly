import React from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

const DashboardOrders = () => {
    const orders = [
        { id: '1001', customer: 'Sophie Martin', date: '28 Nov 2024', total: 124.50, status: 'En cours', items: 3 },
        { id: '1002', customer: 'Thomas Dubois', date: '27 Nov 2024', total: 45.00, status: 'Livré', items: 1 },
        { id: '1003', customer: 'Marie Leroy', date: '27 Nov 2024', total: 89.90, status: 'Annulé', items: 2 },
        { id: '1004', customer: 'Lucas Petit', date: '26 Nov 2024', total: 230.00, status: 'Livré', items: 5 },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Livré': return 'bg-green-100 text-green-600';
            case 'En cours': return 'bg-blue-100 text-blue-600';
            case 'Annulé': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
                    <p className="text-gray-500">Suivi des commandes clients</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download size={20} />
                    <span>Exporter</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher une commande..."
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
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">Commande</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Client</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Articles</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Statut</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-purple-600">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                                                {order.customer.charAt(0)}
                                            </div>
                                            <span className="text-gray-900">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.items} articles</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.total.toFixed(2)} €</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
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
                </div>
            </div>
        </div>
    );
};

export default DashboardOrders;
