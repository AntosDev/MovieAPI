import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'genre' })
export class Genre {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300 })
  lastChangedBy: string;
}
