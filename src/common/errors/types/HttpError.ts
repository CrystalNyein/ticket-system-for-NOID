import messages from '../../messages';

export default class HttpError extends Error {
  declare messageKey: string;
  declare statusCode: number;

  constructor(message = messages.httpMessages[544]) {
    super();

    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    this.message = message;
  }
}
