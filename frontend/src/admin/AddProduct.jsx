import {useState} from 'react'
import axios from '../api/axios';
import {useNavigate} from 'react-router';

function AddProduct() {
    const [form, setForm] = useState({
        title:"",
        description:"",
        price: "",
        category:"",
        image:"",
        stock:"",
    })
 const navigate = useNavigate();

    const handleChange=(e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
   };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
           const add = await axios.post("/products/add", form);
           console.log(add);
           alert("product added successfully");
           navigate("/admin/products");
        }catch(error){
            console.log("Error while adding product", error);
        }
    }
  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      {/* Card */}
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md border border-gray-100">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Admin Panel
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            Add New Product
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400
              focus:border-transparent transition"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg
            hover:bg-blue-600 transition font-medium"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddProduct;
