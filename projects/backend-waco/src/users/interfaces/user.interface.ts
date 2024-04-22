import { Document } from 'mongoose';
import { Gender } from '../../common/constants/gender.enum.constant';
import { IUserFavoritesPokemon } from './user-favorites-pokemon.interface';

export interface IUser extends Document {
  readonly _id?: string;
  readonly email: string;
  readonly username: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly dni: number;
  readonly gender: Gender;
  password?: string;
  usersFavoritesPokemon: [IUserFavoritesPokemon];
  readonly createdAt: Date;
  updatedAt: Date;
}
