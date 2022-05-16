import { TmdcMsn } from "./TmdcMsn";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class TmdcMsnComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => TmdcMsn, (tmdcMsn) => tmdcMsn.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "msn_number" })
  tmdcMsn: TmdcMsn;
}
