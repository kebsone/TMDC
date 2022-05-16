import { Line } from "./Line";
import { TmdcMsn } from "./TmdcMsn";
import { GeneralInformation } from './GeneralInformation';
import { DailyCommunication } from './DailyCommunication';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class TmdcPoste {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Line, (line) => line.tmdcPoste)
  lines: Line[];

  @OneToMany(() => GeneralInformation, (information) => information.tmdcPoste)
  generalInformations: GeneralInformation[];

  
  @OneToMany(() => DailyCommunication, (dailyCommunication) => dailyCommunication.tmdcPoste)
  dailyCommunications: DailyCommunication[];

  @ManyToOne(() => TmdcMsn, (tmdcMsn) => tmdcMsn.postes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  tmdcMsn: TmdcMsn;
}
