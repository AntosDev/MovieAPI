import { v4 as uuidv4 } from 'uuid';
import { AuthenticationRole } from '../src/modules/usersauth/domain/authentication-role';
import { UserEntity } from '../src/modules/usersauth/infra/data-access/entities/user.entities';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

export class Mig0000000000001 implements MigrationInterface {
  name = 'Mig000000000000011775803926255';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt(Number(process.env.PASS_SALT));
    await queryRunner.manager.save(
      queryRunner.manager.create<UserEntity>(UserEntity, {
        id: uuidv4(),
        username: 'basic-test',
        password: await bcrypt.hash('xdgwpeomr6_uNFpg17rr', salt),
        role: AuthenticationRole.Premium,
        createdBy: 'seed',
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<UserEntity>(UserEntity, {
        id: uuidv4(),
        username: 'premium-test',
        password: await bcrypt.hash('GBLspofkqpfe_qwf34pomf', salt),
        role: AuthenticationRole.Basic,
        createdBy: 'seed',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM user`);
  }
}
