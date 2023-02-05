import { Injectable } from '@nestjs/common';
import { AuthenticationRole } from '../domain/authentication-role';
import { AuthenticationUser } from '../domain/authentication-user';

@Injectable()
export class AuthUsersProvider {
  constructor() {}
  private readonly users = [
    new AuthenticationUser('john', 'changeme', AuthenticationRole.Premium),
    new AuthenticationUser('maria', 'guess', AuthenticationRole.Basic),
  ];

  async findOne(username: string): Promise<AuthenticationUser | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
