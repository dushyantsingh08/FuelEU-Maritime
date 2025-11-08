import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/user/User.js';
import { UserRepository } from '../../domain/user/UserRepository.js';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(userId: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where: { id: userId } });
    return result ? toDomain(result) : null;
  }

  async create(input: Pick<User, 'email' | 'name'>): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name ?? null
      }
    });
    return toDomain(result);
  }
}

function toDomain(user: PrismaUser): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };
}

