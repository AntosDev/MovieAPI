import { Module } from '@nestjs/common';
import { AuthenticationProvider } from './application/authentication.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { AuthenticationController } from './infra/http/authentication.controller';
import { LocalStrategy } from './application/strategies/local.strategy';
import { IUsersRepository } from './domain/usersrepository';
import { UsersRepository } from './infra/data-access/repositories/userrepositery';
import { UserEntity } from './infra/data-access/entities/user.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '300s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationProvider,
    JwtStrategy,
    LocalStrategy,
    {
      provide: IUsersRepository,
      useClass: UsersRepository, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class UsersAuthenticationModule {}
