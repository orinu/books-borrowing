import { JwtPayload } from './types'; // or wherever JwtPayload is exported from

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
