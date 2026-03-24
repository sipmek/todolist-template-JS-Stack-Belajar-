/**
 * Global Error Handler Utility
 * Mengkonversi error dari API menjadi user-friendly messages
 */

export const handleApiError = (error) => {
  // Jika error dari interceptor API
  if (error.status === 'error') {
    return {
      message: error.message,
      code: error.code,
      isAuthError: error.code === 401,
      isForbiddenError: error.code === 403,
      isValidationError: error.code === 400,
      isServerError: error.code === 500
    };
  }

  // Fallback untuk error lainnya
  return {
    message: 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
    code: 'UNKNOWN',
    isAuthError: false,
    isForbiddenError: false,
    isValidationError: false,
    isServerError: false
  };
};

/**
 * Get pesan error yang lebih spesifik berdasarkan action type
 */
export const getErrorMessage = (error, action = 'action') => {
  const defaultMessages = {
    load: 'Gagal memuat data. Server bermasalah?',
    create: 'Gagal membuat data baru.',
    update: 'Gagal memperbarui data.',
    delete: 'Gagal menghapus data.',
    auth: 'Gagal melakukan autentikasi.',
  };

  // Jika error sudah dari interceptor
  if (error.status === 'error') {
    if (error.code === 400) {
      return error.message; // Validation error - show server message
    }
    if (error.code === 401) {
      return 'Session Anda telah berakhir. Silakan login kembali.';
    }
    if (error.code === 403) {
      return 'Anda tidak memiliki izin untuk melakukan ini.';
    }
    if (error.code === 500) {
      return 'Server sedang mengalami masalah. Coba lagi nanti.';
    }
    if (error.code === 'NETWORK_ERROR') {
      return 'Tidak bisa terhubung ke server. Periksa koneksi internet Anda.';
    }
  }

  // Fallback ke default messages
  return defaultMessages[action] || defaultMessages.action;
};

/**
 * Toast/Notification helper (bisa diintegrasikan dengan toast library nanti)
 */
export const showErrorNotification = (error, action = 'action') => {
  const message = getErrorMessage(error, action);
  // TODO: Integrate dengan toast library (React Toastify, etc)
  console.error(`[${action.toUpperCase()}] ${message}`);
  return message;
};

export default {
  handleApiError,
  getErrorMessage,
  showErrorNotification
};
