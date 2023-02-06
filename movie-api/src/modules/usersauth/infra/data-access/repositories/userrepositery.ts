import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationRole } from 'src/modules/usersauth/domain/authentication-role';
import { AuthenticationUser } from 'src/modules/usersauth/domain/authentication-user';
import { IUsersRepository } from 'src/modules/usersauth/domain/usersrepository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entities';
@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}
  findById(userId: string): Promise<AuthenticationUser> {
    return this.repo
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(
        (dbUser): AuthenticationUser => ({
          userId: dbUser.id,
          username: dbUser.username,
          role: dbUser.role as AuthenticationRole,
          password: dbUser.password,
        }),
      );
  }
  findByUserName(username: string): Promise<AuthenticationUser> {
    return this.repo
      .findOne({
        where: {
          username: username,
        },
      })
      .then(
        (dbUser): AuthenticationUser => ({
          userId: dbUser.id,
          username: dbUser.username,
          role: dbUser.role as AuthenticationRole,
          password: dbUser.password,
        }),
      );
  }
}
