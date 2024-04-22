import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, AuthsModule, UsersModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
