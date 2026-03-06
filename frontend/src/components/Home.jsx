import { useState, useEffect } from 'react'
import axios from "../api/axios";
import { Link } from 'react-router';

function Home() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [addedId, setAddedId] = useState(null);

  const loadProducts = async () => {
    const res = await axios.get(`/products?search=${search}&category=${category}`);
    setProduct(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }
    const res = await axios.post('/cart/add', { userId, productId });
    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity, 0
    );
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Search Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 py-10 px-6">
        <p className="text-center text-slate-300 text-sm uppercase tracking-widest mb-2 font-medium">
          Welcome to QuickyStore
        </p>
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Find what you're looking for
        </h1>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white shadow-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="sm:w-44 px-4 py-3 rounded-xl border-0 bg-white shadow-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Laptops">Laptops</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Tablets">Tablets</option>
            <option value="Headphones">Headphones</option>
            <option value="Appliances">Hair Dryer</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {category ? category : "All Products"}
            <span className="ml-2 text-sm font-normal text-slate-400">({product.length} items)</span>
          </h2>
          <div className="h-1 flex-1 mx-6 rounded bg-gradient-to-r from-amber-400 to-transparent" />
        </div>

        {/* Grid */}
        {product.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Image Area */}
                <Link to={`/product/${item._id}`} className="block overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/product/${item._id}`}>
                    <h2 className="font-semibold text-slate-800 text-sm leading-snug mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                  </Link>

                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <p className="text-slate-900 font-bold text-base">₹{item.price.toLocaleString()}</p>

                    <button
                      onClick={() => addToCart(item._id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
                        ${addedId === item._id
                          ? 'bg-green-500 text-white scale-95'
                          : 'bg-slate-800 text-white hover:bg-amber-500 hover:scale-105 active:scale-95'
                        }`}
                    >
                      {addedId === item._id ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
