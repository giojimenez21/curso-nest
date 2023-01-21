import { isValidObjectId, Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto

    const pokemons = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 });

    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon) throw new NotFoundException('Pokemon not exists.');

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);

      await pokemon.updateOne(updatePokemonDto, { new: true });

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    
    if( deletedCount === 0) {
      throw new BadRequestException('Pokemon not found.')
    }

    return;
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon exists in db.');
    }

    throw new InternalServerErrorException();
  }
}
