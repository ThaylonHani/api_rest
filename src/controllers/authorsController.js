import { error404 } from '../error/error404.js';
import { authors } from '../models/index.js';

class authorController {
  static getAllAuthors = async (req, res, next) => {
    try {
      const searchAuthors = authors.find();
      req.result = searchAuthors;
      next();
    } catch (err) {
      next(err);
    }
  };

  static getAuthorById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const author = await authors.findById(id);
      if (author !== null) {
        res.status(200).send(author.toJSON());
      } else {
        next(new error404('Autor(a) não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static postAuthor = async (req, res, next) => {
    try {
      const newAuthor = new authors(req.body);
      await newAuthor.save();
      res.status(201).send(newAuthor.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static modifyAuthor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const author = await authors.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (author !== null) {
        res.status(204).send(author.toJSON());
      } else {
        next(new error404('Autor(a) não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    const { id } = req.params;
    try {
      const author = await authors.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (author !== null) {
        res.status(200).send(author.toJSON());
      } else {
        next(new error404('Autor(a) não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const author = await authors.findByIdAndDelete(id);
      if (author !== null) {
        res.status(200).send(author.toJSON());
      } else {
        next(new error404('Autor(a) não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default authorController;
