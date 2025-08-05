import { Injectable } from '@nestjs/common';

type SongProps = {
  id: number;
  name: string;
  artist: string;
};

@Injectable()
export class SongsService {
  private readonly songs = [
    {
      id: 1,
      name: 'GoodBye',
      artist: 'Post Malone ft Young Thug',
    },
  ];

  findAll() {
    return this.songs;
  }

  create(song: SongProps) {
    this.songs.push(song);
    return song;
  }
}
