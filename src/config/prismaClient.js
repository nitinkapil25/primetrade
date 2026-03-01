import { PrismaClient } from '@prisma/client';

// Singleton Prisma client to avoid exhausting DB connections in hot-reload environments.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['warn', 'error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

