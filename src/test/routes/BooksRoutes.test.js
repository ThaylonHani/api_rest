/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import {
  afterEach, beforeEach, describe, it, expect, test,
} from '@jest/globals';
import request from 'supertest';
import { app } from '../../app.js';
import books from '../../models/Book.js';

const bookObject = {
  title: 'Meditações',
  publishing_company: 'Marco Aurélio',
  pages: 308,
};

let server;

beforeEach(() => {
  const port = 8081;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET in books/', () => {
  it('should return list of books', async () => {
    const res = await request(app)
      .get('/books')
      .expect('content-type', /json/)
      .expect(200);
    const bookId = res.body[0]._id;
    const findBook = await books.findById(bookId);
    expect(res.body[0].name).toEqual(findBook.name);
  });
});
let testBookId;
describe('POST in books/', () => {
  it('Should create a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send(bookObject)
      .expect(201);
    testBookId = res.body._id;
  });
});

describe('GET in books/id', () => {
  it('Should return a book by id', async () => {
    const res = await request(app)
      .get(`/books/${testBookId}`)
      .expect(200);
  });
});

describe('PUT in books/id', () => {
  it.each([['title', { title: 'De Vida Beata' }], ['publishing_company', { publishing_company: 'Sêneca' }], ['pages', { pages: 55 }]])('Should modify a book %s by id', async (key, params) => {
    const res = await request(app)
      .put(`/books/${testBookId}`)
      .send(params)
      .expect(204);
  });
});

describe('DELETE in books/id', () => {
  it('Should delete a book', async () => {
    const res = await request(app)
      .delete(`/books/${testBookId}`)
      .expect(200);
  });
});
