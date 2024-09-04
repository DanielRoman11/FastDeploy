import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDecimal,
  IsUrl,
  Length,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { CreateItemDto } from './create-items.dto';
import { IsTime } from '../../common/validators/is-time.decorator';
import { IsPositiveDecimal } from '../../common/validators/is-positive-decimal.decorator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  @Transform(({ value }: { value: string }) => value.trim().toLocaleLowerCase())
  name: string;

  @IsOptional()
  @IsString()
  @Length(5, 500)
  @Transform(({ value }: { value: string }) => value.trim().toLocaleLowerCase())
  description: string;

  @IsTime()
  cooking_time: string;

  @IsTime()
  preparation_time: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  @Transform(({ value }: { value: string }) => value.trim().toLocaleLowerCase())
  type: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  ingredients: CreateItemDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  tools: CreateItemDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  steps: CreateItemDto[];

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsDecimal()
  @IsPositiveDecimal()
  calories: string;

  @IsNotEmpty()
  @IsString()
  @IsDecimal()
  @IsPositiveDecimal()
  stimated_price: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ValidateIf((value: number) => value <= 5, {
    message: 'Rating must be less than 5',
    always: true,
  })
  rating: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Length(5, 500)
  image: string;
}
