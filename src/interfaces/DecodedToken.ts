import { TUserRole } from '../common/types';

export interface DecodedToken {
  id: string;
  role: TUserRole;
  iat?: number; // Issued At (added by JWT)
  exp?: number; // Expiration Time (added by JWT)
}
