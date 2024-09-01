import { DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { constants } from '../common/constants';
import { Ingredient } from './entities/ingredient.entity';
import { Tool } from './entities/tools.entity';
import { Step } from './entities/steps.entity';

export const recipeProviders = [
  {
    provide: constants.RECIPE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipe),
    inject: [constants.DATA_SOURCE],
  },
  {
    provide: constants.INGREDIENTS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Ingredient),
    inject: [constants.DATA_SOURCE],
  },
  {
    provide: constants.TOOLS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tool),
    inject: [constants.DATA_SOURCE],
  },
  {
    provide: constants.STEPS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Step),
    inject: [constants.DATA_SOURCE],
  },
];
