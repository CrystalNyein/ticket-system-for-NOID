import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError';
import messages from '../../messages';

export default class ConflictError extends HttpError {
  constructor(message = messages.httpMessages[409]) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
    this.name = this.constructor.name;
    this.statusCode = StatusCodes.CONFLICT;
  }
}
