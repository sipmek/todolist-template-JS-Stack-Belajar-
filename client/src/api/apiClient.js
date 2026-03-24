import axios from 'axios';

// 🚀 Pondasi utama Axios untuk seluruh Request API kita
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// ✨ REQUEST INTERCEPTOR: Otomatis attach JWT token di setiap request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 🛡️ RESPONSE INTERCEPTOR: Global Error Handler
apiClient.interceptors.response.use(
  (response) => {
    // ✅ Response OK, langsung return data
    return response.data;
  },
  (error) => {
    // ❌ Ada error, handle dengan detail

    // Jika error response dari server
    if (error.response) {
      const { status, data } = error.response;
      
      // 401 - Unauthorized (Token expired atau invalid)
      if (status === 401) {
        // Clear token dari localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Arahkan ke login page
        window.location.href = '/login';
        
        return Promise.reject({
          status: 'error',
          code: 401,
          message: 'Session Anda telah berakhir. Silakan login kembali.',
          originalError: data?.message || 'Unauthorized'
        });
      }

      // 403 - Forbidden (User tidak punya akses)
      if (status === 403) {
        return Promise.reject({
          status: 'error',
          code: 403,
          message: data?.message || 'Anda tidak memiliki izin untuk mengakses resource ini.',
          originalError: data?.message || 'Forbidden'
        });
      }

      // 400 - Bad Request (Input validation error)
      if (status === 400) {
        return Promise.reject({
          status: 'error',
          code: 400,
          message: data?.message || 'Data yang Anda kirim tidak valid. Silakan periksa kembali.',
          originalError: data?.message || 'Bad Request'
        });
      }

      // 404 - Not Found
      if (status === 404) {
        return Promise.reject({
          status: 'error',
          code: 404,
          message: 'Resource tidak ditemukan.',
          originalError: data?.message || 'Not Found'
        });
      }

      // 500 - Server Error
      if (status === 500) {
        return Promise.reject({
          status: 'error',
          code: 500,
          message: 'Terjadi kesalahan pada server. Tim kami sedang menanganinya.',
          originalError: data?.message || 'Internal Server Error'
        });
      }

      // Error lainnya
      return Promise.reject({
        status: 'error',
        code: status,
        message: data?.message || `Error: ${status}`,
        originalError: data?.message || 'Unknown Error'
      });
    }

    // Jika error network (tidak bisa connect ke server)
    if (error.request && !error.response) {
      return Promise.reject({
        status: 'error',
        code: 'NETWORK_ERROR',
        message: 'Tidak bisa terhubung ke server. Periksa koneksi internet Anda.',
        originalError: error.message
      });
    }

    // Error lainnya (setup error, etc)
    return Promise.reject({
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: 'Terjadi kesalahan yang tidak terduga.',
      originalError: error.message
    });
  }
);

export default apiClient;
