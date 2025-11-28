import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                {change >= 0 ? '+' : ''}{change}%
                <TrendingUp size={16} />
            </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
);

const DashboardHome = () => {
    const stats = [
        { title: 'Ventes Totales', value: '12,450 €', change: 12.5, icon: DollarSign, color: 'bg-purple-500' },
        { title: 'Commandes', value: '154', change: 8.2, icon: ShoppingBag, color: 'bg-pink-500' },
        { title: 'Nouveaux Clients', value: '45', change: -2.4, icon: Users, color: 'bg-orange-500' },
        { title: 'Produits Actifs', value: '89', change: 4.1, icon: TrendingUp, color: 'bg-blue-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Bienvenue sur votre espace d'administration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Commandes Récentes</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                        #{1000 + i}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Commande #{1000 + i}</p>
                                        <p className="text-sm text-gray-500">Il y a 2 heures</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                                    Complété
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Products */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Produits Populaires</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Produit Super Cool {i}</p>
                                    <p className="text-sm text-gray-500">24 ventes</p>
                                </div>
                                <p className="font-bold text-gray-900">45.00 €</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
