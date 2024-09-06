import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Tool } from './tools.entity';
import { Step } from './steps.entity';
import { RecipeTypeEnum } from '../../common/enums/recipe.enum';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'time' })
  cooking_time: string;

  @Column({ type: 'time' })
  preparation_time: string;

  @Column({ type: 'enum', enum: RecipeTypeEnum })
  type: RecipeTypeEnum;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  ingredients: Relation<Ingredient[]>;

  @ManyToMany(() => Tool, (tool) => tool.recipe, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  tools: Relation<Tool[]>;

  @ManyToMany(() => Step, (tool) => tool.recipe, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  steps: Relation<Step[]>;

  @Column('decimal', { nullable: true })
  calories?: string;

  @Column('decimal')
  stimated_price: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
