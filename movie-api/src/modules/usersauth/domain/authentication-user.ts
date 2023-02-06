import { AuthenticationRole } from './authentication-role';

export class AuthenticationUser {
  constructor(
    public username: string,
    public password: string,
    public role: AuthenticationRole,
    public userId: string,
  ) {}
}
