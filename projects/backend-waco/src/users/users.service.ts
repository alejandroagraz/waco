import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { PageDto } from '../common/dto/page.dto';
import { Order } from '../common/constants/order.constant';
import { CreateUserInput } from './inputs/create-user.input';
import { hash } from 'bcrypt';
import { UpdateUserInput } from './inputs/update-user.input';
import { IUserFavoritesPokemon } from './interfaces/user-favorites-pokemon.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<IUser>,
    @Inject('USER_FAVORITES_POKEMON_MODEL')
    private readonly userFavoritesPokemonModel: Model<IUserFavoritesPokemon>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<IUser>> {
    const findQuery = this.userModel.find().select('-password');

    if (pageOptionsDto.order == Order.ASC) {
      findQuery.sort({ createdAt: 1 });
    } else if (pageOptionsDto.order == Order.DESC) {
      findQuery.sort({ createdAt: -1 });
    }

    findQuery.skip(pageOptionsDto.skip);

    if (pageOptionsDto.take) findQuery.limit(pageOptionsDto.take);

    const itemCount = await this.userModel.countDocuments();
    const documents = await findQuery;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(documents, pageMetaDto);
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).select('-password').exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOne(query: FilterQuery<IUser>): Promise<IUser> {
    const oneQuery = this.userModel.findOne(query);
    return oneQuery.select({ password: 1 });
  }

  async create(createUser: CreateUserInput): Promise<IUser> {
    try {
      createUser.password = await hash(createUser.password, 10);
      const createdUser = new this.userModel(createUser);
      return await createdUser.save();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(id: string, updateUser: UpdateUserInput): Promise<IUser> {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const date: Date = new Date();
      if (updateUser.password) {
        updateUser.password = await hash(updateUser.password, 10);
      }
      const update: IUser = <IUser>updateUser;
      update.updatedAt = date;
      return await this.userModel
        .findOneAndUpdate({ _id: id }, update, {
          new: true,
        })
        .select('-password');
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  async addFavorite(
    userFavoritePokemon: any,
    user: IUser,
  ): Promise<IUserFavoritesPokemon> {
    const isUser: IUser = await this.userModel.findById(user.id);
    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    userFavoritePokemon.user_id = isUser._id;
    try {
      const resp = new this.userFavoritesPokemonModel(userFavoritePokemon);
      return await resp.save();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async getFavorites(
    id: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IUserFavoritesPokemon>> {
    const findQuery = this.userFavoritesPokemonModel.find({
      user_id: new Types.ObjectId(id),
    });

    if (pageOptionsDto.order == Order.ASC) {
      findQuery.sort({ createdAt: 1 });
    } else if (pageOptionsDto.order == Order.DESC) {
      findQuery.sort({ createdAt: -1 });
    }

    findQuery.skip(pageOptionsDto.skip);

    if (pageOptionsDto.take) findQuery.limit(pageOptionsDto.take);

    const itemCount = await this.userFavoritesPokemonModel.countDocuments();
    const documents = await findQuery;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(documents, pageMetaDto);
  }

  async removeFavoritePokemon(id: string) {
    return await this.userFavoritesPokemonModel.deleteOne({ _id: id }).exec();
  }
}
