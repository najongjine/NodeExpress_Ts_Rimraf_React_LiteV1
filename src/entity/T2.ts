import { Column, Entity } from "typeorm";

@Entity("t2", { schema: "test1" })
export class T2 {
  @Column("int", { primary: true, name: "id" })
  id: number;
}
