import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PaginationQueryDto } from './dto/pagination-query-dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsServices: SongsService) {}
  @Get()
  findAll(@Query() { page, limit }: PaginationQueryDto) {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.songsServices.paginateSongs(options);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.songsServices.findOne(id);
  }
  @Post()
  create(@Body() songDto: CreateSongDto) {
    return this.songsServices.create(songDto);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsServices.update(id, updateSongDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.songsServices.delete(id);
  }
}
