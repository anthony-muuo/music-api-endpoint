import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/createArtist.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createArtist(createArtistDto: CreateArtistDto) {
    const { userId, ...otherDetails } = createArtistDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const artist = this.artistRepository.create({
      ...otherDetails,
      user,
    });
    return await this.artistRepository.save(artist);
  }
}
