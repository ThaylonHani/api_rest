/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import BaseError from '../error/baseError.js';
import IncorrectReq from '../error/incorrectReq.js';
import ValidationError from '../error/validationError.js';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectReq().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof BaseError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};
