import axios from 'axios';

const API = axios.create( {baseURL:'http://localhost:5000/api'} );
// { baseURL: process.env.REACT_APP_API_URL ||}

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['x-auth-token'] = token;
  return config;
});

export default API;