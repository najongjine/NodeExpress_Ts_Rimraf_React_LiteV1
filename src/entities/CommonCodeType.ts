import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("common_code_type", { schema: "teware" })
export class CommonCodeType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "code_type_id",
    comment: "공통 코드 유형 ID",
  })
  codeTypeId: number;

  @Column("varchar", {
    name: "code_value",
    nullable: true,
    comment: "공통 코드 유형 값",
    length: 100,
  })
  codeValue: string | null;

  @Column("varchar", {
    name: "code_name",
    nullable: true,
    comment: "공통 코드 유형 명",
    length: 100,
  })
  codeName: string | null;

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    comment: "삭제여부",
    length: 5,
  })
  delYn: string | null;
}
