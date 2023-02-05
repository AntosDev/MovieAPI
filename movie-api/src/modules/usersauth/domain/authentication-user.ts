import { v4 as uuidv4 } from 'uuid';
import { AuthenticationRole } from './authentication-role';

export class AuthenticationUser {
  public userId: string;
  constructor(
    public username: string,
    public password: string,
    public role: AuthenticationRole,
  ) {
    this.userId = uuidv4();
  }
}
