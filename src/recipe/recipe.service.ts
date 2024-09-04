import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { constants } from '../common/constants';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(constants.RECIPE)
    private recipeRepo: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    return await this.recipeRepo.save(createRecipeDto);
  }

  async findAll() {
    return await this.recipeRepo.find();
  }

  async findOne(id: number) {
    const recipe = await this.recipeRepo.findOneBy({ id });
    if (!recipe)
      throw new NotFoundException('Can not found the specific recipe');
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const initial_recipe = await this.findOne(id);
    return await this.recipeRepo.save({
      ...initial_recipe,
      ...updateRecipeDto,
    });
  }

  async remove(id: number) {
    return await this.recipeRepo.delete(id);
  }
}
