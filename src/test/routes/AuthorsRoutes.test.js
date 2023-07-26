/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import {
  afterEach, beforeEach, describe, it, expect, test,
} from '@jest/globals';
import request from 'supertest';
import { app } from '../../app.js';
import authors from '../../models/Author.js';

const authorObject = {
  name: 'Thaylon',
  nationality: 'BR',
};

let server;
beforeEach(() => {
  const port = 8080;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET in /authors', () => {
  it('Should return a list of authors', async () => {
    const res = await request(app)
      .get('/authors')
      .expect('content-type', /json/)
      .expect(200);
    const authorId = res.body[0]._id;
    const findAuthor = await authors.findById(authorId);
    expect(res.body[0].name).toEqual(findAuthor.name);
  });
});
let testAuthorId;
describe('POST in /authors', () => {
  it('Implement a new author', async () => {
    const res = await request(app)
      .post('/authors')
      .send(authorObject)
      .expect(201);
    testAuthorId = res.body._id;
  });
  it('Should return an error if any parameters are invalid or empty', async () => {
    const res = await request(app)
      .post('/authors')
      .send({
        name: 'Thaylon',
      })
      .expect(400);
  });
});

describe('GET in /authors/id', () => {
  it('Get an author by id', async () => {
    await request(app).get(`/authors/${testAuthorId}`).expect(200);
  });
});
describe('PUT in /authors/id', () => {
  test.each([['name', { name: 'Pirula' }], ['nationality', { nationality: 'acre' }]])('Update an author %s by id', async (key, params) => {
    await request(app).put(`/authors/${testAuthorId}`).send(params).expect(204);
  });
});
describe('Delete in /authors/id', () => {
  it('Delete an author', async () => {
    await request(app).delete(`/authors/${testAuthorId}`).expect(200);
  });
});
