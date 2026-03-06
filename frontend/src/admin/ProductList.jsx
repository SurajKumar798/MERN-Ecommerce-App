import { useState, useEffect } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router';

function ProductList() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await axios.get("/products");
        setProducts(response.data);
    }

    const deletedProduct = async (id) => {
        try {
            await axios.delete(`/products/delete/${id}`);
            alert("product deleted successfully");
            loadProducts();
        } catch (error) {
            console.log("error while deleting", error);
        }
    }
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-100">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                            Admin Panel
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Product List
                        </h2>
                    </div>

                    <Link
                        to="/admin/products/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        + Add Product
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-3 font-medium">Product</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium">Stock</th>
                                <th className="px-6 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    {/* Product */}
                                    <td className="px-6 py-4 flex items-center gap-3">


                                        {product.title}

                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-gray-700">
                                        ₹{product.price}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                            {product.stock}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-center space-x-3">

                                        <Link
                                            to={`/admin/products/edit/${product._id}`}
                                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deletedProduct(product._id)}
                                            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    )
}

export default ProductList
