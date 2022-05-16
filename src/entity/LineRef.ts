import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class LineRef {
  @PrimaryColumn()
  programCode: string;

  @PrimaryColumn()
  title: string;
}
