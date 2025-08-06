import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'time' })
  duration: string;

  @Column({ type: 'text', nullable: true })
  lyrics: string | null;
}
