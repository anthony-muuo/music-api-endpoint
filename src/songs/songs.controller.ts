import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';

type SongProps = {
  id: number;
  name: string;
  artist: string;
};

@Controller('songs')
export class SongsController {
  constructor(private readonly songsServices: SongsService) {}
  @Get()
  findAll() {
    return this.songsServices.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this returns the specific song with id ${id}`;
  }
  @Post()
  create(@Body() song: SongProps) {
    return this.songsServices.create(song);
  }
  @Put(':id')
  update(@Param('id') id: string) {
    return `updated sucessfully this ${id}`;
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return `successfully deleted this ${id}`;
  }
}
