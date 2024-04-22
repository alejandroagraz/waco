import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '../../common/schemas/abstract.schema';
import { User } from './users.schema';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type UsersFavoritesPokemonDocument =
  HydratedDocument<UsersFavoritesPokemon>;

@Schema()
export class UsersFavoritesPokemon extends AbstractSchema {
  @Prop({ required: true, trim: true, type: String })
  @IsString()
  name: string;

  @Prop({ required: true, trim: true, type: String })
  @IsString()
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: User;
}
export const UsersFavoritesPokemonSchema = SchemaFactory.createForClass(
  UsersFavoritesPokemon,
);
