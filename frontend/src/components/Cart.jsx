import { useState, useEffect } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        if (!userId) return;
        const res = await axios.get(`/cart/${userId}`);
        setCart(res.data);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        await axios.post(`/cart/remove`, { userId, productId });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }
        await axios.post(`/cart/update`, { userId, productId, quantity });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cart) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin" />
                    <p className="text-sm font-medium">Loading your cart...</p>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">My Cart</h1>
                    {cart.items.length > 0 && (
                        <p className="text-sm text-slate-400 mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
                    )}
                </div>

                {cart.items.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-24 flex flex-col items-center gap-4 text-center">
                        <span className="text-6xl">🛒</span>
                        <h2 className="text-xl font-semibold text-slate-700">Your cart is empty</h2>
                        <p className="text-slate-400 text-sm max-w-xs">Looks like you haven't added anything yet. Go explore our products!</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors duration-200"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Cart Items */}
                        <div className="flex-1 space-y-3">
                            {cart.items.map((item) => (
                                <div
                                    key={item.productId._id}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Image */}
                                    <div className="bg-gray-50 rounded-xl p-2 w-20 h-20 flex-shrink-0 flex items-center justify-center">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
                                            {item.productId.title}
                                        </h2>
                                        <p className="text-slate-400 text-xs mt-0.5">
                                            ₹{item.productId.price.toLocaleString()} each
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-lg transition-colors text-sm"
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center font-semibold text-slate-800 text-sm">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-lg transition-colors text-sm"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Line Total */}
                                    <div className="text-right flex-shrink-0 w-24">
                                        <p className="font-bold text-slate-900 text-sm">
                                            ₹{(item.productId.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeItem(item.productId._id)}
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                                        title="Remove item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-72 flex-shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                                <h2 className="font-bold text-slate-900 text-base mb-4">Order Summary</h2>

                                <div className="space-y-2 text-sm text-slate-600 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Delivery</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-5 flex justify-between items-center">
                                    <span className="font-bold text-slate-900">Total</span>
                                    <span className="font-bold text-slate-900 text-lg">₹{total.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout-address")}
                                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-amber-500 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    Proceed to Checkout
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full mt-2 text-slate-400 text-xs py-2 hover:text-slate-600 transition-colors"
                                >
                                    ← Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}