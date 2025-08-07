import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { PlayList } from './entities/playlist-entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PlayList)
    private readonly playListRepository: Repository<PlayList>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const { name, songIds, userId } = createPlaylistDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const songs = await this.songRepository.findBy({ id: In(songIds) });
    if (songs.length !== songIds.length) {
      throw new Error('Some songs were not found');
    }

    const playlist = this.playListRepository.create({
      user,
      name,
      songs,
    });

    return await this.playListRepository.save(playlist);
  }
  async findAll() {
    return await this.playListRepository.find();
  }
}
