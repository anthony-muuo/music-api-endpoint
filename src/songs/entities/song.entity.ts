import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'time' })
  duration: string;

  @Column({ type: 'text', nullable: true })
  lyrics: string | null;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'song_artists' })
  artists: Artist[];
}
