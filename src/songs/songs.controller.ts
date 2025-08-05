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
import { CreateSongDto } from './dto/create-song-dto';

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
  create(@Body() songDto: CreateSongDto) {
    return this.songsServices.create(songDto);
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
