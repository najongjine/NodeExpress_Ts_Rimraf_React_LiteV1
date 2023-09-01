import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_test2", { schema: "test1" })
export class TTest2 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 50, default: () => "'0'" })
  title: string;

  @Column("int", { name: "test1_id", nullable: true })
  test1Id: number | null;
}
