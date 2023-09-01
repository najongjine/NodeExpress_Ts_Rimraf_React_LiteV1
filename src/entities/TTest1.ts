import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_test1", { schema: "test1" })
export class TTest1 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 50 })
  title: string | null;
}
