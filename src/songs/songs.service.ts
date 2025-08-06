import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { In, Repository } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const { artists, ...otherSongData } = createSongDto;
    const artistEntitites = await this.artistsRepository.findBy({
      id: In(artists),
    });

    if (artistEntitites.length !== artists.length) {
      throw new NotFoundException(`Some artist IDs were not found`);
    }

    const song = this.songRepository.create({
      ...otherSongData,
      artists: artistEntitites,
    });
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
    const { artists, ...otherUpdateData } = updateSong;

    let artistEntities: Artist[] | undefined;

    if (artists) {
      artistEntities = await this.artistsRepository.findBy({
        id: In(artists),
      });

      if (artistEntities.length !== artists.length) {
        throw new NotFoundException(`Some artist IDs were not found`);
      }
    }

    const recordToUpdate = this.songRepository.merge(song, {
      ...otherUpdateData,
      ...(artistEntities && { artists: artistEntities }),
    });
    return await this.songRepository.save(recordToUpdate);
  }

  paginateSongs(options: IPaginationOptions) {
    const queryBuilder = this.songRepository.createQueryBuilder('songs');
    queryBuilder.orderBy('songs.releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
