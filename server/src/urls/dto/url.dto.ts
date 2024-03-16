import { IsNotEmpty, IsString } from 'class-validator';

export class LongUrl {
  @IsNotEmpty()
  @IsString()
  LongUrl: string;
}
