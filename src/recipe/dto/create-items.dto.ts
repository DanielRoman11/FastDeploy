import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

export class CreateItemDto {
  @Length(5, 255)
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;
}
