import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsString, MinLength } from 'class-validator';

export class UserFavoritePokemonDto {
  @ApiProperty({
    description: 'Identifier',
    example: '6172cc12a50810efa89d8859',
  })
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'name', example: 'charmander' })
  @IsString()
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  name: string;

  @ApiProperty({
    description: 'url',
    example: 'https://pokeapi.co/api/v2/pokemon/4/',
  })
  @IsString()
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  url: string;

  @ApiProperty({
    description: 'Identifier',
    example: '6172cc12a50810efa89d8859',
  })
  @IsMongoId()
  readonly user_id: string;

  @ApiProperty({ description: 'Creation date', example: 'Web' })
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({ description: 'Update date', example: 'Web' })
  @IsDate()
  readonly updated_at: Date;
}
