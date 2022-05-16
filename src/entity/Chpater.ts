import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TmdcGti } from "./TmdcGti";


@Entity()
export class Chapter {
@PrimaryGeneratedColumn()
id: number
  @Column({nullable : true})
  status: string;

  @Column()
  title: string;

  @Column({nullable: true})
  chapterDuration: number;

  @Column()
  alreadyPlace: boolean;

  @Column()
  numbering: string;

  @ManyToOne(() => TmdcGti, (tmdcGti) => tmdcGti.chapters, {
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({ name: "id_Gti" })
  tmdcGti: TmdcGti;

}

 