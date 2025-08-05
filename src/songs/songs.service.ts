import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  private readonly songs: CreateSongDto[] = [];

  findAll() {
    return this.songs;
  }

  create(song: CreateSongDto) {
    this.songs.push(song);
    return song;
  }
}
