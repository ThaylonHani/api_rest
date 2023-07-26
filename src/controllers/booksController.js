/* eslint-disable prefer-const */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import { error404 } from '../error/error404.js';
import { authors, books } from '../models/index.js';

export async function handleSearch(req) {
  const {
    publishingCompany, title, minPage, maxPage, authorName,
  } = req.query;

  const regex = new RegExp(publishingCompany, 'i');
  const regexAuthorName = new RegExp(authorName, 'i');

  let search = {};

  if (publishingCompany) search.publishing_company = regex;
  if (title) search.title = { $regex: title, $options: 'i' };
  if (minPage || maxPage) search.pages = {};
  if (minPage) search.pages.$gte = minPage;
  if (maxPage) search.pages.$lte = maxPage;

  if (authorName) {
    const author = await authors.findOne({ name: regexAuthorName });
    if (author !== null) {
      const authorId = author._id;
      search.author = authorId;
    } else {
      search = null;
    }
  }

  return search;
}

class BookController {
  static getAllBooks = async (req, res, next) => {
    try {
      const searchBooks = books.find();

      req.result = searchBooks;
      next();
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

  static getByFilter = async (req, res, next) => {
    try {
      const search = await handleSearch(req);
      if (search !== null) {
        const bookRes = books
          .find(search);
        req.result = bookRes;
        next();
      } else {
        next(new error404('Autor não encontrado'));
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
        res.status(204).send(book.toJSON());
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
}

export default BookController;
