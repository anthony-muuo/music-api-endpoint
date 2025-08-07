import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { PlayList } from 'src/playlist/entities/playlist-entity';

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

  //* Many songs can belong to the playlist for each unique user
  @ManyToOne(() => PlayList, (playlist) => playlist.songs)
  playlist: PlayList;
}
