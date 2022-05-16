import { Line } from "./Line";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Tree,
} from "typeorm";
import { Chapter } from "./Chpater";

@Entity()
export class TmdcGti {
  @PrimaryGeneratedColumn()
  idTmdcGti: number;

  @Column()
  title: string;

  @Column()
  wo: string;

  @ManyToOne(() => Line, (line) => line.gtis, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id" })
  line: Line;
  @OneToMany(() => Chapter, (chapter) => chapter.tmdcGti)
  chapters: Chapter[];

  @Column({ nullable: true })
  start: string;


  /**
   * Is duplicated GTI
   */
  @Column({ nullable: true })
  isDuplicated: boolean;

  @Column({ nullable: true })
  groupId: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ nullable: true })
  uiId: string;

  @Column({ nullable: true })
  className: string;

  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  gtiDuration: number;


  @Column({nullable: true})
  go: boolean;

  @Column({nullable: true})
  noGo: boolean;



}
