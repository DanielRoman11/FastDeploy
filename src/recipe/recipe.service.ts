import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { constants } from '../common/constants';
import { PaginatorDto } from '../common/paginator/dto/paginator.dto';
import { paginate } from '../common/paginator/paginate';
import { RecipeDateEnum } from 'src/common/enums/recipe.enum';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(constants.RECIPE)
    private recipeRepo: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    return await this.recipeRepo.save(createRecipeDto);
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
    return await this.recipeRepo.softDelete(id);
  }

  private baseQuery() {
    return this.recipeRepo
      .createQueryBuilder('r')
      .orderBy('r.createdAt', 'DESC');
  }

  private findAllFilteredByDate(recipeDate: RecipeDateEnum) {
    const query = this.baseQuery();
    const date = new Date().toISOString().slice(0, 10);
    switch (recipeDate) {
      case RecipeDateEnum.TODAY:
        return query.where('r.createdAt >= :date', {
          date,
        });
      case RecipeDateEnum.WEEK:
        return query.where("r.createdAt >= Date(:date) - INTERVAL '7 DAY'", {
          date,
        });
      case RecipeDateEnum.MONTH:
        return query.where("r.createdAt >= Date(:date) - INTERVAL '1 MONTH'", {
          date,
        });
      case RecipeDateEnum.YEAR:
        return query.where("r.createdAt >= Date(:date) - INTERVAL '1 YEAR'", {
          date,
        });
      default:
        return query;
    }
  }

	private

  public async findAllPaginated(paginatorDto: PaginatorDto) {
    const query = this.findAllFilteredByDate(<RecipeDateEnum>paginatorDto.date);
    const page = isNaN(paginatorDto.page) ? null : paginatorDto.page;
    const limit = isNaN(paginatorDto.limit) ? null : paginatorDto.limit;
    return await paginate(query, page, limit);
  }
}
