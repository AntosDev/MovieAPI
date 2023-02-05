import { Module } from '@nestjs/common';
import { AuthenticationProvider } from './application/authentication.provider';
import { AuthUsersProvider } from './application/authusers.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { AuthenticationController } from './infra/http/authentication.controller';
import { LocalStrategy } from './application/strategies/local.strategy';
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
    AuthUsersProvider,
    AuthenticationProvider,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class UsersAuthentication {}
