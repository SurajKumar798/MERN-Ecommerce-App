import { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useNavigate } from 'react-router';

function Checkout() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const [placing, setPlacing] = useState(false);

    useEffect(() => {
        if (!userId) { navigate('/'); return; }
        axios.get(`/cart/${userId}`).then((res) => setCart(res.data));
        axios.get(`/address/${userId}`).then((res) => {
            setAddresses(res.data);
            setSelectedAddress(res.data[0]);
        });
    }, []);

    if (!cart) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin" />
                    <p className="text-sm font-medium">Loading checkout...</p>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity, 0
    );
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const placeOrder = async () => {
        if (!selectedAddress) { alert('Please select an address'); return; }
        setPlacing(true);
        try {
            const res = await axios.post('/order/place', { userId, address: selectedAddress });
            navigate(`/order-success/${res.data.orderId}`);
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-1">Almost there</p>
                    <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left — Address Selection */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                                    <span className="w-6 h-6 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
                                    Delivery Address
                                </h2>
                                <button
                                    onClick={() => navigate('/add-address')}
                                    className="text-xs text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                                >
                                    + Add New
                                </button>
                            </div>

                            {addresses.length === 0 ? (
                                <div className="text-center py-10 text-slate-400">
                                    <p className="text-4xl mb-3">📍</p>
                                    <p className="text-sm font-medium text-slate-600">No saved addresses</p>
                                    <p className="text-xs mt-1 mb-4">Add an address to continue</p>
                                    <button
                                        onClick={() => navigate('/add-address')}
                                        className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {addresses.map((addr) => {
                                        const isSelected = selectedAddress?._id === addr._id;
                                        return (
                                            <label
                                                key={addr._id}
                                                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-slate-900 bg-slate-50'
                                                        : 'border-gray-100 hover:border-gray-300 bg-white'
                                                    }`}
                                            >
                                                {/* Custom Radio */}
                                                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                                                    ${isSelected ? 'border-slate-900' : 'border-gray-300'}`}>
                                                    {isSelected && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    checked={isSelected}
                                                    onChange={() => setSelectedAddress(addr)}
                                                    className="sr-only"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-slate-800 text-sm">{addr.fullName}</p>
                                                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                                                        {addr.addressLine}, {addr.city}, {addr.state}
                                                    </p>
                                                    <p className="text-slate-400 text-xs mt-1">📞 {addr.phone}</p>
                                                </div>
                                                {isSelected && (
                                                    <span className="flex-shrink-0 text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full font-medium">
                                                        Selected
                                                    </span>
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-4">
                            <h2 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-4">
                                <span className="w-6 h-6 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
                                Payment Method
                            </h2>
                            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-900 bg-slate-50">
                                <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">Cash on Delivery</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Pay when your order arrives</p>
                                </div>
                                <span className="ml-auto text-lg">💵</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Order Summary */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                            <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                                Order Summary
                            </h2>

                            {/* Items */}
                            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                                {cart.items.map((item) => (
                                    <div key={item.productId._id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                                            <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-contain rounded-lg" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-slate-700 line-clamp-1">{item.productId.title}</p>
                                            <p className="text-xs text-slate-400">x{item.quantity}</p>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-800 flex-shrink-0">
                                            ₹{(item.productId.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({itemCount} items)</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Delivery</span>
                                    <span className="font-medium">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center mb-5">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="font-bold text-slate-900 text-lg">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={placeOrder}
                                disabled={placing || !selectedAddress}
                                className={`w-full cursor-pointer py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200
                                    ${placing || !selectedAddress
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-900 text-white hover:bg-amber-500 active:scale-95'
                                    }`}
                            >
                                {placing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Placing Order...
                                    </>
                                ) : (
                                    <>
                                        Place Order (COD)
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-400 mt-3">🔒 Safe & secure checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;