import { Response } from 'express';

class ResponseWrapper {
  static success(res: Response, data: any = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({ message, data });
  }

  static error(res: Response, error: any = 'An error occurred', statusCode = 500) {
    return res.status(statusCode).json({
      message: typeof error === 'string' ? error : error.message || 'An error occurred',
      error: typeof error === 'string' ? null : error,
    });
  }
}

export default ResponseWrapper;
