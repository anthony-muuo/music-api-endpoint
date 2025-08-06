import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: number[];
  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: string;
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string;
  @IsString()
  @IsOptional()
  lyrics?: string;
}
