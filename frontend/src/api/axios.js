import axios from "axios";

const api = axios.create({
    baseURL: 'https://ecommerce-backend-t4vy.onrender.com/api',
})

export default api;
