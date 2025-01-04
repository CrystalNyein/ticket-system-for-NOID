declare namespace Express {
  interface User {
    id: string;
    role: TUserRole;
  }
  export interface Request {
    user?: User;
  }
}
