import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
  private cars:Car[] = [];

  findAll() {
    return this.cars;
  }

  findOneById( id:string ) {
    const car = this.cars.find( car => car.id === id );

    if( !car ) throw new NotFoundException("El carro no fue encontrado.");

    return car;
  }

  create( createCarDto: CreateCarDto ) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push( car );

    return car;
  }

  update( id: string, updateCarDto: UpdateCarDto ) {
    let carDB = this.findOneById( id );

    this.cars = this.cars.map( car => {
      if( car.id === id ) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id
        }
        return carDB;
      }
      return car;
    })

    return carDB;
  }

  delete( id: string ) {
    const carToDelete = this.findOneById( id );
    this.cars = this.cars.filter( car => car.id !== carToDelete.id );
    return "Car deleted";
  }

  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
  }
}
