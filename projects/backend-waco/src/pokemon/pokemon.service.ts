import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { PageDto } from '../common/dto/page.dto';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async pokemonAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PokemonDto>> {
    const data = await this.httpService
      .get(
        `${process.env.API_EXT}?offset=${pageOptionsDto.page}&limit=${pageOptionsDto.take}`,
      )
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);

    const itemCount = data.count;
    const documents = data.results;
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(documents, pageMetaDto);
  }
}
