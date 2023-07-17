import { error404 } from '../error/error404.js';

export function Handle404(req, res, next) {
  const err404 = new error404();
  next(err404);
}
