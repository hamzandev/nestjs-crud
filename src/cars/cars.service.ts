import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) { }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto)
    return await this.carRepository.save(newCar)
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find()
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } })
    if (!car) throw new NotFoundException(`Car with id : ${id} is not found.`)
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const find = await this.findOne(id)
    Object.assign(find, updateCarDto)
    return await this.carRepository.save(find)
  }

  async remove(id: number) {
    const result = await this.carRepository.delete(id)
    if (result.affected === 0)
      throw new NotFoundException(`Car with id : ${id} was not found`) 
    return {message: 'Car successfully deleted', id}
  }
}
