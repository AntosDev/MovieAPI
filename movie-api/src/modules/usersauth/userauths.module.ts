import { Module } from '@nestjs/common';
import { AuthenticationProvider } from './application/authentication.provider';
import { UsersProvider } from './application/UsersProvider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/jwt.strategy';
import { AuthenticationController } from './infra/http/authentication.controller';
import { LocalStrategy } from './application/local.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    UsersProvider,
    AuthenticationProvider,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class UsersAuthentication {}
