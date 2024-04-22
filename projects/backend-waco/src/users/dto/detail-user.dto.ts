import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsMongoId, IsString } from 'class-validator';
import { Gender } from '../../common/constants/gender.enum.constant';

export class DetailUserDto {
  @ApiProperty({
    description: 'Identifier',
    example: '6172cc12a50810efa89d8859',
  })
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({ description: 'Email address', example: 'example@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Username', example: 'admin' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'First name', example: 'Elon' })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ description: 'Last name', example: 'Musk' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({
    description: 'Gender',
    enum: Gender,
    type: Gender,
    example: Gender.MAN,
  })
  readonly gender: Gender;

  @ApiProperty({ description: 'Creation date', example: 'Web' })
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({ description: 'Update date', example: 'Web' })
  @IsDate()
  readonly updated_at: Date;
}
