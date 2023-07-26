/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import { ObjectId } from 'mongodb';
import { authors } from '../../models';

describe('Testing authors models', () => {
  const authorObject = {
    name: 'Thaylon Haniel',
    nationality: 'BR',
  };

  it('Should create new author', async () => {
    const author = new authors(authorObject);
    expect(author).toEqual(
      expect.objectContaining(
        {
          _id: expect.any(ObjectId),
          ...authorObject,
        },
      ),
    );
  });

  it('Should save author in BD mock', () => {
    const author = new authors(authorObject);

    author.save = jest.fn().mockReturnValue({
      _id: new ObjectId(),
      name: 'Thaylon Haniel',
      nationality: 'BR',
    });

    const res = author.save();

    expect(res).toEqual(expect.objectContaining({
      _id: expect.any(ObjectId),
      ...authorObject,
    }));
  });
});
