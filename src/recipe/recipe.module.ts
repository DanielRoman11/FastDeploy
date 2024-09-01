import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { DatabaseModule } from '../database/database.module';
import { recipeProviders } from './recipe.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipeController],
  providers: [RecipeService, ...recipeProviders],
})
export class RecipeModule {}
