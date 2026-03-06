import axios from "axios";

const api = axios.create({
    baseURL: 'https://ecommerce-backend-ln2c.onrender.com/api',
})

export default api;
