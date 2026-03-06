import { useState } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const saveAddress = async (e) => {
        await axios.post("/address/add", {
            ...form,
            userId,
        });
        navigate("/checkout");
    }
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Delivery Address</h1>
                    <p className="text-slate-400 text-sm mt-1">Where should we deliver your order?</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    {
                        Object.keys(form).map((key) => (
                            <input
                                key={key}
                                name={key}
                                placeholder={key}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl
                                    placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400
                                    focus:border-transparent focus:bg-white transition-all duration-200"
                            />

                        ))
                    }
                    <button className="w-full bg-blue-500 text-white p-2 rounded-xl cursor-pointer" onClick={saveAddress}>
                        Save Address
                    </button>
                </div>
            </div>



        </div>
    )
}