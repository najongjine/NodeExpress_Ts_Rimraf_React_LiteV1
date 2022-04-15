import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonCodeTmp } from "./CommonCodeTmp";

@Index("company_and_common_code", ["type"], {})
@Entity("company", { schema: "teware" })
export class Company {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "company_id",
    comment: "아이디",
  })
  companyId: number;

  @Column("varchar", {
    name: "type",
    nullable: true,
    comment: "회사 구분",
    length: 10,
  })
  type: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "회사명",
    length: 100,
  })
  name: string | null;

  @Column("varchar", {
    name: "english_name",
    nullable: true,
    comment: "회사 영문 명",
    length: 100,
  })
  englishName: string | null;

  @Column("varchar", {
    name: "business_number",
    nullable: true,
    comment: "사업자 번호",
    length: 100,
  })
  businessNumber: string | null;

  @Column("varchar", {
    name: "leader_name",
    nullable: true,
    comment: "대표자 이름",
    length: 100,
  })
  leaderName: string | null;

  @Column("varchar", {
    name: "post_num",
    nullable: true,
    comment: "우편번호",
    length: 20,
  })
  postNum: string | null;

  @Column("varchar", {
    name: "addr1",
    nullable: true,
    comment: "주소",
    length: 200,
  })
  addr1: string | null;

  @Column("varchar", {
    name: "addr2",
    nullable: true,
    comment: "상세주소",
    length: 200,
  })
  addr2: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    comment: "이메일",
    length: 100,
  })
  email: string | null;

  @Column("varchar", {
    name: "phone_number",
    nullable: true,
    comment: "연락처",
    length: 20,
  })
  phoneNumber: string | null;

  @Column("datetime", {
    name: "start_date",
    nullable: true,
    comment: "시작일자",
    default: () => "CURRENT_TIMESTAMP",
  })
  startDate: Date | null;

  @Column("datetime", {
    name: "end_date",
    nullable: true,
    default: () => "'9999-12-31 23:59:59'",
  })
  endDate: Date | null;

  @ManyToOne(() => CommonCodeTmp, (commonCodeTmp) => commonCodeTmp.companies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "type", referencedColumnName: "codeValue" }])
  type2: CommonCodeTmp;
}
