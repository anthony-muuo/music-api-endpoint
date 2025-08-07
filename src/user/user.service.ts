import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
//using the instancetoplain and exclude in the
// entity to prevent password being set in response after success post
import { instanceToPlain } from 'class-transformer';

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
}
