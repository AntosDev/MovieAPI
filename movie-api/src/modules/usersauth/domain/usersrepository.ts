import { AuthenticationUser } from './authentication-user';

export interface IUsersRepository {
  findById(userId: string): Promise<AuthenticationUser>;
  findByUserName(username: string): Promise<AuthenticationUser>;
}
export const IUsersRepository = Symbol('IUsersRepository');
