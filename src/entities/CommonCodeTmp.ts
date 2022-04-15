import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { CommonCodeTypeTmp } from "./CommonCodeTypeTmp";

@Index("common_code_common_code_type_code_type_id_fk", ["codeType"], {})
@Entity("common_code_tmp", { schema: "teware" })
export class CommonCodeTmp {
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
    comment: "공통 코드 명",
    length: 100,
  })
  codeName: string | null;

  @Column("varchar", {
    name: "code_type",
    nullable: true,
    comment: "코드 그룹",
    length: 10,
  })
  codeType: string | null;

  @Column("int", { name: "seq", nullable: true, comment: "정렬 순서" })
  seq: number | null;

  @Column("varchar", {
    name: "use_yn",
    nullable: true,
    comment: "사용 여부",
    length: 1,
    default: () => "'Y'",
  })
  useYn: string | null;

  @OneToMany(() => Company, (company) => company.type2)
  companies: Company[];

  @ManyToOne(
    () => CommonCodeTypeTmp,
    (commonCodeTypeTmp) => commonCodeTypeTmp.commonCodeTmps,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "code_type", referencedColumnName: "codeValue" }])
  codeType2: CommonCodeTypeTmp;
}
