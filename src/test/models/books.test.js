/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import { ObjectId } from 'mongodb';
import { books } from '../../models';

describe('Testing books models', () => {
  const bookObject = {
    title: 'Thaylon Biografia',
    publishing_company: 'Eu mesmo',
    pages: 100,
  };

  it('Should create new book', async () => {
    const book = new books(bookObject);
    expect(book).toEqual(
      expect.objectContaining(
        {
          _id: expect.any(ObjectId),
          ...bookObject,
        },
      ),
    );
  });

  it('Should save book in BD mock', () => {
    const author = new books(bookObject);

    author.save = jest.fn().mockReturnValue({
      _id: new ObjectId(),
      title: 'Thaylon Biografia',
      publishing_company: 'Eu mesmo',
      pages: 100,
    });

    const res = author.save();

    expect(res).toEqual(expect.objectContaining({
      _id: expect.any(ObjectId),
      ...bookObject,
    }));
  });
});
