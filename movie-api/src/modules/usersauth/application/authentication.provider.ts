import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { IUsersRepository } from '../domain/users.repository.interface';
import * as bcrypt from 'bcryptjs';

export class AuthenticationProvider {
  constructor(
    @Inject(IUsersRepository)
    private usersRepo: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const salt = await bcrypt.genSalt(Number(process.env.PASS_SALT));

    const hashedPass = await bcrypt.hash(pass, salt);
    const user = await this.usersRepo.findByUserName(username);
    if (user && bcrypt.compare(pass, hashedPass)) {
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
