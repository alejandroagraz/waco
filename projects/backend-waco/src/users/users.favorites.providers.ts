import { Connection } from 'mongoose';
import { UsersFavoritesPokemonSchema } from './schemas/users-favorites-pokemon.schema';

export const usersFavoritesPokemonProviders = [
  {
    provide: 'USER_FAVORITES_POKEMON_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('users_favorites_pokemon', UsersFavoritesPokemonSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
