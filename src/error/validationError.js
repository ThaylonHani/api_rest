import IncorrectReq from './incorrectReq.js';

class ValidationError extends IncorrectReq {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join('; ');
    super(`Erros encontrados : ${errorMessage}`);
  }
}

export default ValidationError;
