// types/express.d.ts
import 'express';
import { DecodedToken } from '../interfaces/DecodedToken';

declare module 'express' {
  export interface Request {
    user?: DecodedToken; // Use a specific type instead of `any` for better type safety
  }
}
