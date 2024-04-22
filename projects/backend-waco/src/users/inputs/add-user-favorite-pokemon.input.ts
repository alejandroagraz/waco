import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddUserFavoritePokemonInput {
  @ApiProperty({ description: 'name', example: 'charmander' })
  @IsNotEmpty({ message: 'The name is required' })
  @IsString()
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  name: string;

  @ApiProperty({
    description: 'url',
    example: 'https://pokeapi.co/api/v2/pokemon/4/',
  })
  @IsNotEmpty({ message: 'The url is required' })
  @IsString()
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  url: string;
}
