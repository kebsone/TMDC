import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TmdcPoste } from './TmdcPoste';

@Entity()
export class GeneralInformation {

@PrimaryGeneratedColumn()
id:number;

@Column()
value: string;

@Column()
date: string;

@Column()
dayTime: string;

@Column({nullable:true})
userName: string;

@Column({nullable:true})
login?: string;


@ManyToOne(() => TmdcPoste, (tmdcPoste) => tmdcPoste.generalInformations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
@JoinColumn({ name: "id_Poste" })
  tmdcPoste: TmdcPoste;

}