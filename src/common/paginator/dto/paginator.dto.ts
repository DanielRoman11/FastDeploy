import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { RecipeDateEnum } from 'src/common/enums/recipe.enum';

export class PaginatorDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  date: RecipeDateEnum;
}
