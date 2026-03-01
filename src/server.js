import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prismaClient.js';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected via Prisma');

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

