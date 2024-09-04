import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

export class CreateItemDto {
  @Length(3, 255)
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;
}
