import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../../common/constants/gender.enum.constant';
import { AbstractSchema } from '../../common/schemas/abstract.schema';
import { IsEnum, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends AbstractSchema {
  @Prop({ required: true, trim: true, unique: true, type: String })
  @IsString()
  email: string;

  @Prop({ required: true, trim: true, unique: true, type: String })
  @IsString()
  username: string;

  @Prop({ required: true, trim: true, type: String })
  @IsString()
  firstname: string;

  @Prop({ required: true, trim: true, type: String })
  @IsString()
  lastname: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
    enum: Gender,
    default: Gender.MAN,
  })
  @IsEnum(Gender)
  gender: Gender;

  @Prop({ required: true, trim: true, type: String })
  @IsString()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
