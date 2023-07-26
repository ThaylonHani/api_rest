import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, 'Nome do livro é obrigatório'] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
  },
  publishing_company: { type: String },
  pages: {
    type: Number,
    required: [true, 'Páginas do livro é obrigatório'],
    validate: {
      validator: (value) => value >= 15 && value <= 2500,
      message: 'Página deve estar entre 15 e 2500 páginas',
    },
  },
});

const books = mongoose.model('books', booksSchema);

export default books;
