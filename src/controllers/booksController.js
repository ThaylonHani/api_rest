import { error404 } from '../error/error404.js';
import books from '../models/Book.js';

class BookController {
  static getAllBooks = async (req, res, next) => {
    try {
      const booksRes = await books.find().populate('author');
      res.status(200).json(booksRes);
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await books.findById(id).populate('author', 'name');
      if (book !== null) {
        res.status(200).send(book.toJSON());
      } else {
        next(new error404('Livro não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static postBook = async (req, res, next) => {
    try {
      const newBook = new books(req.body);
      await newBook.save();
      res.status(201).send(newBook.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static modifyBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await books.findByIdAndUpdate(id, { $set: req.body }, { new: true }).populate('author', 'name');
      if (book !== null) {
        res.status(200).send(book.toJSON());
      } else {
        next(new error404('Livro não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await books.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (book !== null) {
        res.status(200).send(book.toJSON());
      } else {
        next(new error404('Livro não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await books.findByIdAndDelete(id);
      if (book !== null) {
        res.status(200).send(book.toJSON());
      } else {
        next(new error404('Livro não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static getByPublishingCompany = async (req, res, next) => {
    try {
      const publishingCompany = req.query.PublishingCompany;
      const bookRes = await books.find({
        publishing_company: publishingCompany,
      });
      res.status(200).json(bookRes);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
