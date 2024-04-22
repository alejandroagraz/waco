import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../common/constants/gender.enum.constant';

export class UpdateUserInput {
  @ApiProperty({ description: 'Email address', example: 'example@email.com' })
  @IsOptional()
  @IsEmail()
  @MinLength(6, {
    message: 'Length error for email min 6',
  })
  @MaxLength(100, {
    message: 'Length email for email max 100',
  })
  email?: string;

  @ApiProperty({ description: 'Username', example: 'admin' })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Length error for username min 3',
  })
  username?: string;

  @ApiProperty({ description: 'First name', example: 'Elon' })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  firstname?: string;

  @ApiProperty({ description: 'Last name', example: 'Musk' })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Length error for lastname min 3',
  })
  lastname?: string;

  @ApiProperty({
    description: 'Gender',
    enum: Gender,
    type: Gender,
    example: Gender.MAN,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'Password',
    example:
      'At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character.',
  })
  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Length error for password min 8',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character.',
  })
  password: string;
}
