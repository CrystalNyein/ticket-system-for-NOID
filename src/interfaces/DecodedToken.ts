export interface DecodedToken {
  id: string;
  iat?: number; // Issued At (added by JWT)
  exp?: number; // Expiration Time (added by JWT)
}
