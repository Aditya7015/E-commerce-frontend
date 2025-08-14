import axios from 'axios';

const api = axios.create({
  baseURL: 'https://e-commerce-backend-l4s0.onrender.com/api',
  withCredentials: true
});

export default api;
