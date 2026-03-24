import axios from 'axios';

// 🚀 Pondasi utama Axios untuk seluruh Request API kita
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// ✨ Interceptor: "Satpam Pintar" 
// Secara otomatis mencari Token JWT di brankas browser (localStorage) 
// dan menyelipkannya ke "DOMPET" Header Request setiap kali kita menembak API!
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
