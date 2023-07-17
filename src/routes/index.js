import express from 'express';
import books from './BooksRoutes.js';
import authors from './AuthorsRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ title: 'Node curse' });
  });

  app.use(
    express.json(),
    books,
    authors,
  );
};

export default routes;
