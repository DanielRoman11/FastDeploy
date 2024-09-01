import { Entity, ManyToMany, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Items } from '../../common/entities/items.entity';

@Entity()
export class Step extends Items {
  @ManyToMany(() => Recipe, (recipe) => recipe.steps)
  recipe: Relation<Recipe>;
}
