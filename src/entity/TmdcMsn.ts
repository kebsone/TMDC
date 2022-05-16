import { TmdcPoste } from "./TmdcPoste";
import { TmdcMsnComment } from "./TmdcMsnComment";
import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class TmdcMsn {
  @PrimaryColumn()
  msnNumber: string;

  @PrimaryColumn()
  programCode: string;

  @PrimaryColumn()
  siteId: string;

  @Column({ nullable: true })
  responsable: string;

  @Column({ nullable: true })
  start: string;

  @Column({ nullable: true })
  end: string;

  @OneToMany(() => TmdcPoste, (tmdcPoste) => tmdcPoste.tmdcMsn)
  postes: TmdcPoste[];

  @OneToMany(() => TmdcMsnComment, (tmdcMsnComment) => tmdcMsnComment.tmdcMsn)
  comments: TmdcMsnComment[];

  @Column({ nullable: true })
  principalPoste: string;
}
