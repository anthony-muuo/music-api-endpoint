import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LognInDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
