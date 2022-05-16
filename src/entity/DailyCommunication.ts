import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TmdcPoste } from './TmdcPoste';
@Entity()
export class DailyCommunication {
    
@PrimaryGeneratedColumn()
id:number;

@Column()
inforamtion: string;

@Column()
date: string;

@Column()
dayTime: string;

@Column({nullable:true})
userName: string;

@Column({nullable:true})
login: string;

@Column()
type: string;

@Column({nullable:true})
competenceLine: string;

@Column({nullable:true})
ataNumber: string;

@Column({nullable:true})
gtiRti: string;

@Column({nullable:true})
cdo: string;

@Column({nullable:true})
status: string;

@Column({nullable:true})
information: string;

@Column({nullable:true})
repairStatus: string;

// @Column({nullable:true})
// attachedFiles: string[];
@ManyToOne(() => TmdcPoste, (tmdcPoste) => tmdcPoste.dailyCommunications, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
@JoinColumn({ name: "id_Poste" })
  tmdcPoste: TmdcPoste;

}