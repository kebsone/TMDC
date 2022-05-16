import { TmdcGti } from "./TmdcGti";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { TmdcPoste } from "./TmdcPoste";

@Entity()
export class Line {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  remainder: number;

  @OneToMany(() => TmdcGti, (tmdcGti) => tmdcGti.line)
  gtis: TmdcGti[];

  @ManyToOne(() => TmdcPoste, (tmdcPoste) => tmdcPoste.lines, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_Poste" })
  tmdcPoste: TmdcPoste;

  @Column({ nullable: true })
  try: number;

}
