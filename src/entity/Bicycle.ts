import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Bicycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  msnNumber: string;
}
