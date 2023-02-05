import { UsersProvider } from './UsersProvider';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

export class AuthenticationProvider {
  constructor(
    @Inject(UsersProvider)
    private usersProvider: UsersProvider,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(
      '🚀 ~ file: authentication.provider.ts:13 ~ AuthenticationProvider ~ validateUser ~ username',
      username,
    );

    const user = await this.usersProvider.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    console.log(
      '🚀 ~ file: authentication.provider.ts:31 ~ AuthenticationProvider ~ login ~ payload',
      payload,
    );
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
