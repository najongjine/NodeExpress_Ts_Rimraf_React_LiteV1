import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("config", { schema: "teware" })
export class Config {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("varchar", {
    name: "key_type",
    comment: "설정 구분",
    length: 100,
    default: () => "''",
  })
  keyType: string;

  @Column("varchar", {
    name: "value",
    comment: "설정 값",
    length: 100,
    default: () => "''",
  })
  value: string;

  @Column("varchar", { name: "content", comment: "설정 내용", length: 200 })
  content: string;
}
