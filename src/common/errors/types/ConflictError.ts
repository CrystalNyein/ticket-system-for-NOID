import { HttpStatus } from 'http-status-ts';
import HttpError from './HttpError';
import messages from '../../messages';

export default class ConflictError extends HttpError {
  constructor(message = messages.httpMessages[409]) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
    this.name = this.constructor.name;
    this.statusCode = HttpStatus.CONFLICT;
  }
}
