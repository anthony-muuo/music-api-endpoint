import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  songIds: number[];
}
