import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { usersFavoritesPokemonProviders } from './users.favorites.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  exports: [UsersService, ...usersProviders, ...usersFavoritesPokemonProviders],
  providers: [
    UsersService,
    ...usersProviders,
    ...usersFavoritesPokemonProviders,
  ],
})
export class UsersModule {}
