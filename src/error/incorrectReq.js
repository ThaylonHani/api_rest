import BaseError from './baseError.js';

class IncorrectReq extends BaseError {
  constructor(message = 'Um ou mais dados fornecido estão incorretos') {
    super(message, 400);
  }
}
export default IncorrectReq;
