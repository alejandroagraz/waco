import { IsDate } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export abstract class AbstractSchema {
  @Prop({ required: false, trim: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;

  @Prop({ required: false, trim: true, type: Date })
  @IsDate()
  updatedAt: Date;
}
