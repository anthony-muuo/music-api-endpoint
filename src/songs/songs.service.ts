import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const song = this.songRepository.create(createSongDto);
    return await this.songRepository.save(song);
  }

  //no need for this while using pagination
  // async findAll() {
  //   const allSongs = await this.songRepository.find();
  //   return allSongs;
  // }

  async findOne(id: number) {
    const singleSong = await this.songRepository.findOneBy({ id });
    if (!singleSong) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return singleSong;
  }
  async delete(id: number) {
    const result = await this.songRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return { message: `Song with ID ${id} deleted successfully` };
  }
  async update(id: number, updateSong: UpdateSongDto) {
    const song = await this.findOne(id);
    const recordToUpdate = this.songRepository.merge(song, updateSong);
    return await this.songRepository.save(recordToUpdate);
  }

  paginateSongs(options: IPaginationOptions) {
    const queryBuilder = this.songRepository.createQueryBuilder('songs');
    queryBuilder.orderBy('songs.releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
