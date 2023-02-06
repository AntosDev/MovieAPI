import { v4 as uuidv4 } from 'uuid';
import { AuthenticationRole } from '../modules/usersauth/domain/authentication-role';
import { UserEntity } from '../modules/usersauth/infra/data-access/entities/user.entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed0000000000001 implements MigrationInterface {
  name = 'Seed0000000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('migrating');
    await queryRunner.manager.save(
      queryRunner.manager.create<UserEntity>(UserEntity, {
        id: uuidv4(),
        username: 'john',
        password: 'changeme',
        role: AuthenticationRole.Premium,
        createdBy: 'seed',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<UserEntity>(UserEntity, {
        id: uuidv4(),
        username: 'maria',
        password: 'guess',
        role: AuthenticationRole.Basic,
        createdBy: 'seed',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM user`);
  }
}
