import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: [true, 'Nome do autor(a) é obrigatório'] },
    nationality: { type: String, required: [true, 'Nacionalidade do autor(a) é obrigatório'] },
  },
  {
    versionKey: false,
  },
);
const authors = mongoose.model('authors', authorSchema);

export default authors;
