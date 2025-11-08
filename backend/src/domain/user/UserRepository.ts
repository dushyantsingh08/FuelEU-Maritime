import { User } from './User.js';

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  create(user: Pick<User, 'email' | 'name'>): Promise<User>;
}


