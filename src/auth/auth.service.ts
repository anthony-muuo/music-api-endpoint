import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LognInDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginUserDto: LognInDto) {
    const user = await this.userService.findOne(loginUserDto);
    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Password does not match ');

    return instanceToPlain(user);
  }
}
