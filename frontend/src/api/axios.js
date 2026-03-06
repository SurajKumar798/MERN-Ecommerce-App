import axios from "axios";

const api = axios.create({
    baseURL: 'https://ecommerce-backend-h25p.onrender.com/api',
})

export default api;
