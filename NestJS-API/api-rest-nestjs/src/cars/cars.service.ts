import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarDto } from './dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<CreateCarDto> {
    return await this.carRepository.save(createCarDto);
  }

  async findAll(): Promise<CarDto[]> {
    return this.carRepository.find();
  }

  async findOne(id: string): Promise<CarDto> {
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<CarDto> {
    let carDTO: CarDto;
    if (await this.findOne(id)) {
      carDTO = { ...updateCarDto };
      await this.carRepository.update(id, carDTO);
    }
    return carDTO;
  }

  async remove(id: string): Promise<void> {
    const car = await this.findOne(id);
    await this.carRepository.delete(car);
  }
}
