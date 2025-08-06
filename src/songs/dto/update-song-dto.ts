/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CreateSongDto } from './create-song-dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSongDto extends PartialType(CreateSongDto) {}
