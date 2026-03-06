import {useState, useEffect} from 'react'
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");
     
    useEffect(()=>{
        const loadCart = async()=>{
            if(!userId) return setCartCount(0);

            const res = await axios.get(`/cart/${userId}`);
            const total = res.data.items.reduce(
                (sum,item) => sum + item.quantity, 0
            );
            setCartCount(total);
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart);

        return()=>{
            window.removeEventListener("cartUpdated", loadCart);
        }
    }, [userId]);

    const logout = ()=>{
        localStorage.clear();
        setCartCount(0);
        navigate('/login');
    }

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
            <Link to= "/" className="flex items-center gap-2 group">
            <span className="text-amber-400 text-xl font-black tracking-tight group-hover:text-amber-300 transition-colors">
          ⚡ quickystore
          <span className="text-slate-400 font-light">.in</span>
        </span>
        </Link>

            <div className="flex items-center gap-4">
                <Link to="/cart" className="relative p-2 rounded-xl hover:bg-slate-700 transition-colors group">
                 🛒
                 
                 {
                    cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )
                 }
                </Link>

                {
                    !userId ?(
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
                            <Link to="/signup" className="px-4 py-1.5 text-sm font-semibold bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors">Signup</Link>
                        </div>
                    ) : (
                        <button onClick={logout} className="text-lg cursor-pointer">Logout</button>
                    )
                }
            </div>     
    </nav>
  )
}

export default Navbar
