import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, Check, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import orderService from "../services/orderService";

// Wrapper for Stripe Elements
const CheckoutPage = () => {
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const initStripe = async () => {
            try {
                const config = await orderService.getStripeConfig();
                if (config.publishableKey) {
                    setStripePromise(loadStripe(config.publishableKey));
                }
            } catch (err) {
                console.error("Failed to load Stripe config:", err);
            }
        };
        initStripe();
    }, []);

    if (!stripePromise) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

const CheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, cartCount, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "France",
    });

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (cartCount === 0 && !success) navigate("/panier");
    }, [cartCount, success, navigate]);

    const getProductData = (item) => {
        if (item.product) {
            return {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                imageUrl: item.product.imageUrl,
                quantity: item.quantity,
            };
        }
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: item.quantity || 1,
        };
    };

    const parsePrice = (price) => {
        if (typeof price === "number") return price;
        if (typeof price === "string") {
            return parseFloat(price.replace("€", "").replace(",", ".")) || 0;
        }
        return 0;
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const data = getProductData(item);
        return sum + parsePrice(data.price) * data.quantity;
    }, 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");

        try {
            // 1. Create PaymentIntent on backend
            const intentData = await orderService.createPaymentIntent();
            const clientSecret = intentData.clientSecret;

            // 2. Confirm payment with Stripe
            const cardElement = elements.getElement(CardElement);
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${user?.firstName} ${user?.lastName}`,
                        email: user?.email,
                    },
                },
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            if (paymentIntent.status === "succeeded") {
                // 3. Finalize order on backend
                const result = await orderService.checkout({
                    ...formData,
                    paymentMethodId: paymentIntent.payment_method,
                });

                if (result.success) {
                    setSuccess(true); // Keep local state update if needed related to effects, but navigate immediately
                    setOrderId(result.orderId);
                    clearCart();
                    navigate("/order-confirmation", {
                        state: {
                            orderId: result.orderId,
                            email: user?.email
                        }
                    });
                } else {
                    throw new Error(result.error || "Erreur lors de la finalisation de la commande");
                }
            }
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    // Success is now handled by navigation


    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Link to="/panier" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors mb-4">
                    <ArrowLeft size={18} /> Retour au panier
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Finaliser la commande</h1>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="text-purple-600" size={24} />
                                    <h2 className="text-xl font-bold text-gray-900">Adresse de livraison</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                                        <input type="text" name="street" value={formData.street} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
                                        <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required>
                                            <option value="France">France</option>
                                            <option value="Belgique">Belgique</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <CreditCard className="text-purple-600" size={24} />
                                    <h2 className="text-xl font-bold text-gray-900">Paiement</h2>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <CardElement options={{
                                        style: {
                                            base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
                                            invalid: { color: "#9e2146" },
                                        },
                                    }} />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Sous-total</span>
                                        <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Livraison</span>
                                        <span className="font-semibold">{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                                        <span>Total</span>
                                        <span className="text-purple-600">{total.toFixed(2)} €</span>
                                    </div>
                                </div>
                                {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
                                <button type="submit" disabled={loading || !stripe} className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><CreditCard size={20} /> Payer {total.toFixed(2)} €</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
