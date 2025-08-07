import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
//using the instancetoplain and exclude in the
// entity to prevent password being set in response after success post
import { instanceToPlain } from 'class-transformer';
import { LognInDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...otherDetails } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      ...otherDetails,
      password: hashedPassword,
    });
    const saveUser = this.userRepository.save(user);
    return instanceToPlain(saveUser);
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(loginDto: LognInDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
    if (!user) throw new NotFoundException('user not found with this email');
    return user;
  }
}
