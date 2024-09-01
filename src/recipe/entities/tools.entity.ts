import { Entity, ManyToMany, Relation } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Items } from '../../common/entities/items.entity';

@Entity()
export class Tool extends Items {
  @ManyToMany(() => Recipe, (recipe) => recipe.tools)
  recipe: Relation<Recipe>;
}
