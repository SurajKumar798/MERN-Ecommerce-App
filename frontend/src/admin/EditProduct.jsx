import {useState, useEffect} from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router';

export default function EditProduct(){
    const {id} = useParams();  //deleted item using id
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title:"",
        description:"",
        price: "",
        category:"",
        image:"",
        stock:""
    })
  const allowedField = ["title", "price", "description", "category", "image", "stock"];
  const loadProduct = async()=>{
    const res = await axios.get("/products");
    const product = res.data.find((p)=> p._id === id);
    setForm(product);
  }

  useEffect(()=>{
    loadProduct();
  }, []);

  const handleChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await axios.put(`/products/update/${id}`, form);
    alert('Product update!');
    navigate("/admin/products");
  };

  return(
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Admin Panel
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            Edit Product
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Product Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-600">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Update Product
          </button>

        </form>
      </div>
    </div>
  )
}