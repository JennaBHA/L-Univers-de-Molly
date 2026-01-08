import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";

const OrderSuccessPage = () => {
    const location = useLocation();
    const { orderId, email } = location.state || {};

    // If no orderId (e.g. direct access), redirect to home
    if (!orderId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <div className="max-w-lg w-full bg-white rounded-2xl p-10 shadow-sm border border-gray-200 text-center animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
                    <p className="text-gray-600 mb-2 text-lg">Merci pour votre commande <span className="font-semibold text-gray-900">#{orderId}</span></p>
                    <p className="text-gray-500 mb-10">
                        Un email de confirmation a été envoyé à <br />
                        <span className="font-medium text-gray-900">{email}</span>
                    </p>
                    <Link
                        to="/"
                        className="inline-block w-full px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderSuccessPage;
