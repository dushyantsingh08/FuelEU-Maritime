import { User } from '../../domain/user/User.js';
import { UserRepository } from '../../domain/user/UserRepository.js';

export class GetUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}


