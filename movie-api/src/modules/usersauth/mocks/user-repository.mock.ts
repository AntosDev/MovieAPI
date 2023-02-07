import { AuthenticationRole } from '../domain/authentication-role';
import { AuthenticationUser } from '../domain/authentication-user';
import { IUsersRepository } from '../domain/users.repository.interface';

export class UsersRepositoryMock implements IUsersRepository {

    private readonly users = [
        new AuthenticationUser('john', 'changeme', AuthenticationRole.Premium, "userid1"),
        new AuthenticationUser('maria', 'guess', AuthenticationRole.Basic, "userid2"),
      ];
      findById(userId: string): Promise<AuthenticationUser> {
        const result = this.users.find(u => u.userId === userId);
        return Promise.resolve(result);
    }
    findByUserName(username: string): Promise<AuthenticationUser> {
        const result = this.users.find(u => u.username === username);
        return Promise.resolve(result);
    }
}
