import express from 'express';
import authorController from '../controllers/authorsController.js';
import { Pagination } from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/authors', authorController.getAllAuthors, Pagination)
  .get('/authors/:id', authorController.getAuthorById)
  .post('/authors', authorController.postAuthor)
  .put('/authors/:id', authorController.modifyAuthor)
  .patch('/authors/:id/', authorController.updateAuthor)
  .delete('/authors/:id', authorController.deleteAuthor);
export default router;
