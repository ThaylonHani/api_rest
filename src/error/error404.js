import BaseError from './baseError.js';

export class error404 extends BaseError {
  constructor(message = 'Página não encontrada') {
    super(message, 404);
  }
}
