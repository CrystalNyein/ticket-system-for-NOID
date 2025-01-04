import { StatusCodes } from 'http-status-codes';
import messages from '../../messages';
import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  constructor(message = messages.httpMessages[404]) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = this.constructor.name;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
