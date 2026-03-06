import {useState} from 'react'
import { useNavigate } from 'react-router';
import api from '../api/axios.js';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const res = await api.post("/auth/login", form)
      console.log(res, "data");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setMsg("Login Successful");
      setTimeout(()=>{
        navigate("/");
      }, 1000);
    }catch(error){
       setMsg((error.response?.data?.message || "An error occured" ));
    }
  }
  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div  className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {msg && (
          <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name='email'
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent focus:bg-white transition-all duration-200"
            required
          />
          <div className='relative'>
             <input
            name='password'
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent focus:bg-white transition-all duration-200"
            required
          />
          <button 
            type="button"
            onClick={()=> setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-sm cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
         
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-2 border bg-blue-600 text-white cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
