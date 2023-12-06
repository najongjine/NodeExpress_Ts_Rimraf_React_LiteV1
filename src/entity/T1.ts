import { Column, Entity } from "typeorm";

@Entity("t1", { schema: "test1" })
export class T1 {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("float", { name: "t1", nullable: true, precision: 11, scale: 4 })
  t1: number | null;
}
