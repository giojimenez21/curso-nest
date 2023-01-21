import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    const newCar = this.carsService.create(createCarDto);
    return newCar;
  }

  @Patch(':id')
  updateCar( @Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update( id, updateCarDto );
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete( id );
  }
}
