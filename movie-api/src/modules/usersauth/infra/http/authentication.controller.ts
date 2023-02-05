import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationProvider } from '../../application/authentication.provider';

@Controller()
export class AuthenticationController {
  constructor(private readonly authProvider: AuthenticationProvider) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authProvider.login(req.user);
  }
}
