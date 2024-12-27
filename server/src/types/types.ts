// src/types/JwtPayload.ts
interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export default JwtPayload;