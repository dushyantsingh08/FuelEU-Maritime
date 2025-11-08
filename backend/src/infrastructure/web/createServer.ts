import Fastify, { FastifyInstance } from 'fastify';
import { GetUserById } from '../../application/user/GetUserById.js';
import { AppConfig } from '../../config/env.js';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository.js';
import { disconnectPrisma, getPrismaClient } from '../db/prismaClient.js';
import { registerHealthRoutes } from './routes/health.js';
import { registerUserRoutes } from './routes/users.js';

export async function createServer(config: AppConfig): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: 'info'
    }
  });

  const prisma = getPrismaClient(config.databaseUrl);
  const userRepository = new PrismaUserRepository(prisma);
  const getUserById = new GetUserById(userRepository);

  // Register routes
  registerHealthRoutes(server);
  registerUserRoutes(server, { getUserById });

  server.get('/', async () => ({ ok: true }));

  // Graceful shutdown hook
  server.addHook('onClose', async () => {
    await disconnectPrisma();
  });

  return server;
}


