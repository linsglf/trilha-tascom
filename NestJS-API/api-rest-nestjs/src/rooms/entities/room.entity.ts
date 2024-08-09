import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  disponible: boolean;

  @Column()
  price: number;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  checkIn: Date;

  @Column({ nullable: true })
  checkOut: Date;

  isDisponible(): boolean {
    return (this.disponible = this.checkOut < new Date());
  }
}
