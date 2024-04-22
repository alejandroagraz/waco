import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PageDto } from '../common/dto/page.dto';
import { ApiPaginatedResponse } from '../common/dto/api-pagination-response';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PokemonDto } from './dto/pokemon.dto';

@ApiTags('Pokemon')
@ApiBearerAuth('token')
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly _pokemonService: PokemonService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all pokemons' })
  @ApiExtraModels(PageDto, PokemonDto)
  @ApiPaginatedResponse(PokemonDto)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all pokemons' })
  async pokemon(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PokemonDto>> {
    return await this._pokemonService.pokemonAll(pageOptionsDto);
  }
}
