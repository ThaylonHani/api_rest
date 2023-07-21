/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import IncorrectReq from '../error/incorrectReq.js';

export async function Pagination(req, res, next) {
  try {
    let {
      limit = 5, page = 1, ordination = '_id:-1',
    } = req.query;
    let [orderBy, order] = ordination.split(':');
    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const { result } = req;

    if (limit > 0 && page > 0) {
      const resPag = await result.find()
        .sort({ [orderBy]: [order] })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      res.status(200).json(resPag);
    } else {
      next(new IncorrectReq());
    }
  } catch (error) {
    next(error);
  }
}
