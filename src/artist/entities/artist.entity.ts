import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/songs/entities/song.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  stageName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  country: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
