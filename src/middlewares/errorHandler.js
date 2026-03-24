const errorHandler = (err, req, res, next) => {
  // Catat error ke terminal (untuk keperluan debugging developer)
  console.error('[ERROR_TERTANGKAP]', err.message || err);

  // 1. Tangkap error JSON cacat (dari tipe PayloadTooLargeError atau SyntaxError express)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      status: 'fail', 
      message: 'Format Payload JSON tidak valid! Cek kembali tanda kutip atau koma.' 
    });
  }

  // 2. Tangkap error Validasi Joi
  if (err.isJoi === true) {
    return res.status(400).json({
      status: 'fail',
      message: err.details[0].message
    });
  }

  // 3. Error lainnya (Database down, Null Pointer, Dll)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
  return res.status(statusCode).json({ 
    status: 'error', 
    message: err.message || "Terjadi kesalahan sistem internal."
  });
};

module.exports = errorHandler;
