import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { DirectorEntity } from './director.entity';
import { GenreEntity } from './genre.entity';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  genre: GenreEntity;

  @Column({ type: 'varchar', length: 300, nullable: true })
  director: DirectorEntity;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  releaseddate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastChangedBy: string;
}
