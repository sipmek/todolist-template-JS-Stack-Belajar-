const validate = (schema) => {
  return (req, res, next) => {
    // Jalankan validasi pada req.body
    // 'abortEarly: false' berarti kumpulkan seluruh error sekaligus (jangan berhenti di error pertama)
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      // Tandai bahwa error ini berasal dari Joi, 
      // lalu Oper error ke Global Error Handler di app.js
      error.isJoi = true;
      return next(error);
    }

    // Jika aman, lanjut ke controller berikutnya
    next();
  };
};

module.exports = validate;
