import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SkillInventoryCareerSkill } from "./SkillInventoryCareerSkill";

@Entity("project_manage_projectinfo", { schema: "teware" })
export class ProjectManageProjectinfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "projectname",
    nullable: true,
    comment: "프로젝트명",
    length: 255,
  })
  projectname: string | null;

  @Column("varchar", {
    name: "order_from",
    nullable: true,
    comment: "발주처 코드(common_code 테이블의 발주처 code_value)",
    length: 50,
  })
  orderFrom: string | null;

  @Column("date", {
    name: "start_dt",
    nullable: true,
    comment: "프로젝트 시작일",
  })
  startDt: string | null;

  @Column("date", {
    name: "end_dt",
    nullable: true,
    comment: "프로젝트 종료일",
  })
  endDt: string | null;

  @Column("varchar", {
    name: "memo",
    nullable: true,
    comment: "메모",
    length: 255,
  })
  memo: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "프로젝트 신규 등록 날짜",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    comment: "프로젝트 변경 날짜",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("int", {
    name: "progress",
    nullable: true,
    comment: "프로젝트 진행여부 ( 0: 종료, 1: 진행 )",
  })
  progress: number | null;

  @Column("varchar", {
    name: "Use_yn",
    nullable: true,
    comment: "프로젝트 삭제여부 기본값 (N:표시)",
    length: 5,
    default: () => "'N'",
  })
  useYn: string | null;

  @OneToMany(
    () => SkillInventoryCareerSkill,
    (skillInventoryCareerSkill) => skillInventoryCareerSkill.workcode2
  )
  skillInventoryCareerSkills: SkillInventoryCareerSkill[];
}
