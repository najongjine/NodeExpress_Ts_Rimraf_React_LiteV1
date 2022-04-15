import { Column, Entity, OneToMany } from "typeorm";
import { CommonCodeTmp } from "./CommonCodeTmp";

@Entity("common_code_type_tmp", { schema: "teware" })
export class CommonCodeTypeTmp {
  @Column("varchar", {
    primary: true,
    name: "code_value",
    comment: "코드",
    length: 10,
  })
  codeValue: string;

  @Column("varchar", {
    name: "code_name",
    nullable: true,
    comment: "코드 명",
    length: 100,
  })
  codeName: string | null;

  @Column("varchar", {
    name: "use_yn",
    nullable: true,
    comment: "사용 여부",
    length: 1,
    default: () => "'Y'",
  })
  useYn: string | null;

  @OneToMany(() => CommonCodeTmp, (commonCodeTmp) => commonCodeTmp.codeType2)
  commonCodeTmps: CommonCodeTmp[];
}
