import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { IUsersRepository } from '../domain/usersrepository';

export class AuthenticationProvider {
  constructor(
    @Inject(IUsersRepository)
    private usersRepo: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(
      '🚀 ~ file: authentication.provider.ts:13 ~ AuthenticationProvider ~ validateUser ~ username',
      username,
    );

    const user = await this.usersRepo.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
