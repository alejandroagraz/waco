import { Document } from 'mongoose';

export interface IUserFavoritesPokemon extends Document {
  readonly _id?: string;
  readonly name: string;
  readonly url: string;
  user_id: string;
}
