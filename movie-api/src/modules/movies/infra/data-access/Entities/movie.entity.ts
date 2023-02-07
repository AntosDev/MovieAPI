import {
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  Entity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DirectorEntity } from './director.entity';
import { GenreEntity } from './genre.entity';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @ManyToOne((type) => GenreEntity)
  @JoinColumn({ name: 'genre_id' })
  genre: GenreEntity;

  @ManyToOne((type) => DirectorEntity)
  @JoinColumn({ name: 'director_id' })
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
