import express from 'express';
import BookController from '../controllers/booksController.js';
import { Pagination } from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/books', BookController.getAllBooks, Pagination)
  .get('/books/search', BookController.getByFilter, Pagination)
  .get('/books/:id', BookController.getBookById)
  .post('/books', BookController.postBook)
  .put('/books/:id', BookController.modifyBook)
  .patch('/books/:id/', BookController.updateBook)
  .delete('/books/:id', BookController.deleteBook);
export default router;
