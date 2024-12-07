import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import type { User } from '../types';

export const register = async (userData: Omit<User, '_id'>) => {
  const hashedPassword = await bcrypt.hash(userData.password, 7);
  const user = await UserModel.create({
    ...userData,
    password: hashedPassword
  });
  return { ...user.toJSON(), password: undefined };
};

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
  return { token, user: { ...user.toJSON(), password: undefined } };
};
