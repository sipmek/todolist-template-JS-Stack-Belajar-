const Joi = require('joi');

const createTodo = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Judul To-Do tidak boleh kosong!',
    'string.min': 'Judul To-Do minimal 3 karakter!',
    'string.max': 'Judul To-Do maksimal 100 karakter!',
    'any.required': 'Field "title" wajib dikirim lewat JSON Body!'
  })
});

const updateTodo = Joi.object({
  title: Joi.string().min(3).max(100).optional().messages({
    'string.empty': 'Judul To-Do tidak boleh kosong!',
    'string.min': 'Judul To-Do minimal 3 karakter!',
    'string.max': 'Judul To-Do maksimal 100 karakter!',
  }),
  completed: Joi.boolean().optional().messages({
    'boolean.base': 'Field "completed" harus bernilai true atau false (tanpa tanda kutip)!'
  })
}).min(1).messages({
  'object.min': 'Anda harus mengirimkan minimal salah satu: "title" atau "completed" untuk diupdate!'
});

module.exports = {
  createTodo,
  updateTodo
};
