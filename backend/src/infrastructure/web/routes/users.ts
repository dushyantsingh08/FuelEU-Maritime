import { FastifyInstance } from 'fastify';
import { GetUserById } from '../../../application/user/GetUserById.js';

type UserRouteDependencies = {
  getUserById: GetUserById;
};

export function registerUserRoutes(app: FastifyInstance, deps: UserRouteDependencies): void {
  app.get('/users/:id', async (req, reply) => {
    const id = (req.params as { id: string }).id;
    const user = await deps.getUserById.execute(id);
    if (!user) return reply.code(404).send({ error: 'User not found' });
    return user;
  });
}


