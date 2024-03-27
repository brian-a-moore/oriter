// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: { isAdmin: boolean; id: string };
    routeId?: string;
  }
}
