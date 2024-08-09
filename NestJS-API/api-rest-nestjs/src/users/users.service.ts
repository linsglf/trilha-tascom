import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userRepository.save(createUserDto);
    const { id, ...rest } = user;
    return rest;
  }

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const { id, ...rest } = user;
    return rest;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    if (await this.findOne(userId)) {
      await this.userRepository.update(userId, updateUserDto);
    }

    return updateUserDto;
  }

  async remove(userId: string): Promise<void> {
    await this.userRepository.delete(await this.findOne(userId));
  }
}
