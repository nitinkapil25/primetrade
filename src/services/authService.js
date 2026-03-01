import { prisma } from '../config/prismaClient.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';

const buildError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw buildError('name, email and password are required', 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw buildError('User with this email already exists', 409);
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  return createdUser;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw buildError('email and password are required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw buildError('Invalid credentials', 401);
  }

  const passwordMatched = await comparePassword(password, user.password);

  if (!passwordMatched) {
    throw buildError('Invalid credentials', 401);
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const token = generateToken(tokenPayload);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  };
};
