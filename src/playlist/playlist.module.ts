import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';
import { PlayList } from './entities/playlist-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, User, PlayList])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
