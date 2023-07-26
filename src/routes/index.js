import express from 'express';
import books from './BooksRoutes.js';
import authors from './AuthorsRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.send({ message: 'Página principal' });
  });

  app.use(
    express.json(),
    books,
    authors,
  );
};

export default routes;
