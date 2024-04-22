import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as fs from 'fs';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthsService } from './auths.service';
import { AuthController } from './auths.controller';
import {UsersModule} from "../users/users.module";
import {usersProviders} from "../users/users.providers";
import {UsersService} from "../users/users.service";
import {AppController} from "../app.controller";

config();
const _configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync('src/auths/certs/jwt-private.key', 'utf8'),
      publicKey: fs.readFileSync('src/auths/certs/jwt-public.key', 'utf8'),
      signOptions: {
        algorithm: _configService.get('ALGORITHM'),
        expiresIn: _configService.get('TIME_TOKEN'),
      },
    }),
    DatabaseModule,
    PassportModule,
    UsersModule,
  ],
  providers: [AuthsService, JwtStrategy, ConfigService],
  exports: [AuthsService],
  controllers: [AuthController],
})
export class AuthsModule {}
