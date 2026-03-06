import React from 'react'
import { useState } from 'react'
import api from '../api/axios';

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [msg, setMsg] = useState("");
  const handleChange = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
    }catch(error){
       setMsg(error.response?.data?.message || 'An error occured');
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div  className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {msg && (
          <div className='mb-4 text-center text-sm text-blue-600 font-medium'>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            name='name'
            placeholder='Enter Name'
            value={form.name}
            onChange={handleChange}
            className='w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent focus:bg-white transition-all duration-200'
            required
          />
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
          <input
            name='password'
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl
                  placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent focus:bg-white transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-2 border bg-blue-600 text-white"
          >
            Sign Up
          </button>
        </form>
      </div>     
    </div>
  )
}

export default Signup
