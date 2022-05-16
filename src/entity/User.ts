import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isManager: boolean;

  @Column()
  @PrimaryColumn()
  gtsiUserId: string;

  @Column()
  email: string;
}
