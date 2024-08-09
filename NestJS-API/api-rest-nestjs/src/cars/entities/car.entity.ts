import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;
}
