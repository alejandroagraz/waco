import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const _configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(_configService.get('MONO_DB_CONNECTION_STRING')),
  },
];
