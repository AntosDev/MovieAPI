import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { Director } from './director.entity';
import { Genre } from './genre.entity';

@Entity({ name: 'movie' })
export class Movie {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  genre: Genre;

  @Column({ type: 'varchar', length: 300 })
  director: Director;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  releaseddate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300 })
  lastChangedBy: string;
}
