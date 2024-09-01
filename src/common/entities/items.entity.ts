import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
