import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  role: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastChangedBy: string;
}
