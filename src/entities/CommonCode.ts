import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ElectApprov } from "./ElectApprov";

@Entity("common_code", { schema: "teware" })
export class CommonCode {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "code_id",
    comment: "공통 코드 ID",
  })
  codeId: number;

  @Column("int", {
    name: "code_type_id",
    nullable: true,
    comment: "공통 코드 유형 ID (참조키)",
  })
  codeTypeId: number | null;

  @Column("varchar", {
    name: "code_value",
    nullable: true,
    comment: "공통 코드 값",
    length: 100,
  })
  codeValue: string | null;

  @Column("varchar", {
    name: "code_name",
    nullable: true,
    comment: "공통 코드명",
    length: 100,
  })
  codeName: string | null;

  @Column("int", { name: "seq", nullable: true, comment: "시퀀스" })
  seq: number | null;

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    comment: "삭제여부",
    length: 5,
    default: () => "'N'",
  })
  delYn: string | null;

  @OneToMany(() => ElectApprov, (electApprov) => electApprov.category)
  electApprovs: ElectApprov[];
}
