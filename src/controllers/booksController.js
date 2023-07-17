import books from '../models/Book.js';

class BookController {
  static getAllBooks = async (req, res) => {
    try {
      const booksRes = await books.find().populate('author');
      res.status(200).json(booksRes);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getBookById = async (req, res) => {
    const { id } = req.params;

    try {
      const book = await books.findById(id).populate('author', 'name');
      res.status(200).send(book.toJSON());
    } catch (error) {
      res
        .status(404)
        .send({ message: `${error.message} - Livro não encontrado` });
    }
  };

  static postBook = (req, res) => {
    try {
      const newBook = new books(req.body);
      newBook.save(res.status(201).send(newBook.toJSON()));
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Livro não cadastrado` });
    }
  };

  static modifyBook = async (req, res) => {
    const { id } = req.params;

    try {
      await books.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).send('Livro modificado com sucesso');
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Livro não modificado` });
    }
  };

  static updateBook = async (req, res) => {
    const { id } = req.params;

    try {
      await books.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).send('Livro atualizado com sucesso');
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Livro não atualizado` });
    }
  };

  static deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
      await books.findByIdAndDelete(id);
      res.status(200).send('Livro deletado com sucesso');
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Livro não deletado` });
    }
  };

  static getByPublishingCompany = async (req, res) => {
    try {
      const publishingCompany = req.query.PublishingCompany;
      const bookRes = await books.find({
        publishing_company: publishingCompany,
      });
      res.status(200).json(bookRes);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Livro não encontrado` });
    }
  };
}

export default BookController;
