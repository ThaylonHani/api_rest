import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: [true, 'Nome do livro é obrigatório'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: [true, 'Id do autor(a) é obrigatório'] },
    publishing_company: { type: String },
    pages: { type: Number, required: [true, 'Páginas do livro é obrigatório'] },
  },
);

const books = mongoose.model('books', booksSchema);

export default books;
