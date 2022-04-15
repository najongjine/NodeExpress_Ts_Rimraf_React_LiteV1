import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("skill_inventory_basic", { schema: "teware" })
export class SkillInventoryBasic {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", {
    name: "final_education",
    nullable: true,
    comment: "최종학력",
    length: 20,
  })
  finalEducation: string | null;

  @Column("varchar", {
    name: "final_school",
    nullable: true,
    comment: "최종졸업학교",
    length: 50,
  })
  finalSchool: string | null;

  @Column("varchar", {
    name: "grad_dt",
    nullable: true,
    comment: "졸업년도",
    length: 50,
  })
  gradDt: string | null;

  @Column("varchar", {
    name: "major",
    nullable: true,
    comment: "전공",
    length: 70,
  })
  major: string | null;

  @Column("varchar", {
    name: "certificate_kind",
    nullable: true,
    comment: "대표 자격증 종류",
    length: 70,
  })
  certificateKind: string | null;

  @Column("varchar", {
    name: "certificate_dt",
    nullable: true,
    comment: "지격증 취득연도",
    length: 50,
  })
  certificateDt: string | null;

  @Column("varchar", {
    name: "etc",
    nullable: true,
    comment: "기타",
    length: 100,
  })
  etc: string | null;

  @Column("varchar", {
    name: "techlvl",
    nullable: true,
    comment: "기술등급",
    length: 100,
  })
  techlvl: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("varchar", {
    name: "position",
    nullable: true,
    comment: "직위(사원, 대리, 차장 등)- 220330 추가",
    length: 50,
  })
  position: string | null;

  @Column("varchar", {
    name: "company",
    nullable: true,
    comment: "소속(회사)-220330 추가",
    length: 100,
  })
  company: string | null;
}
