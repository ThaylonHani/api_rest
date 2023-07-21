import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (value) => value.trim() !== '',
  message: ({ path }) => `Campo ${path} foi fornecido em branco`,
});
