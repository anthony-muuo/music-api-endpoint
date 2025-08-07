import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlayList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  // Each Playlist will have multiple songs
  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];

  // multiple playlist will belong to one user
  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
