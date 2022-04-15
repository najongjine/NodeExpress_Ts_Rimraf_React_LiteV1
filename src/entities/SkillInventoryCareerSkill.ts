import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProjectManageProjectinfo } from "./ProjectManageProjectinfo";

@Index("workcode", ["workcode"], {})
@Entity("skill_inventory_career_skill", { schema: "teware" })
export class SkillInventoryCareerSkill {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "work_name",
    nullable: true,
    comment: "외부(입사전) 프로젝트명",
    length: 255,
  })
  workName: string | null;

  @Column("int", { name: "workcode", nullable: true })
  workcode: number | null;

  @Column("varchar", {
    name: "work_start_dt",
    nullable: true,
    comment: "참여 시작기간",
    length: 50,
  })
  workStartDt: string | null;

  @Column("varchar", {
    name: "work_end_dt",
    nullable: true,
    comment: "참여 종료기간",
    length: 50,
  })
  workEndDt: string | null;

  @Column("varchar", {
    name: "client_name",
    nullable: true,
    comment: "고객사(발주처) ",
    length: 100,
  })
  clientName: string | null;

  @Column("varchar", {
    name: "place_work",
    nullable: true,
    comment: "근무처 (자사)",
    length: 100,
  })
  placeWork: string | null;

  @Column("varchar", {
    name: "place_work_name",
    nullable: true,
    comment: "근무처 명 (타사,자사)",
    length: 100,
  })
  placeWorkName: string | null;

  @Column("varchar", {
    name: "role",
    nullable: true,
    comment: "담당업무",
    length: 50,
  })
  role: string | null;

  @Column("varchar", {
    name: "working_company",
    nullable: true,
    comment: "소속회사",
    length: 255,
  })
  workingCompany: string | null;

  @Column("varchar", {
    name: "position",
    nullable: true,
    comment: "직위",
    length: 20,
  })
  position: string | null;

  @Column("varchar", {
    name: "code_language",
    nullable: true,
    comment: "개발 언어",
    length: 255,
  })
  codeLanguage: string | null;

  @Column("varchar", {
    name: "code_language_name",
    nullable: true,
    comment: "개발 언어 명",
    length: 255,
  })
  codeLanguageName: string | null;

  @Column("varchar", {
    name: "rdbms",
    nullable: true,
    comment: "관계형DB",
    length: 255,
  })
  rdbms: string | null;

  @Column("varchar", {
    name: "rdbms_name",
    nullable: true,
    comment: "관계형DB 명",
    length: 255,
  })
  rdbmsName: string | null;

  @Column("varchar", {
    name: "framework",
    nullable: true,
    comment: "프레임워크",
    length: 255,
  })
  framework: string | null;

  @Column("varchar", {
    name: "framework_name",
    nullable: true,
    comment: "프레임워크 명",
    length: 255,
  })
  frameworkName: string | null;

  @Column("varchar", {
    name: "internal_skill",
    nullable: true,
    comment: "내부기술",
    length: 250,
  })
  internalSkill: string | null;

  @Column("varchar", {
    name: "internal_skill_name",
    nullable: true,
    comment: "프레임워크 명",
    length: 250,
  })
  internalSkillName: string | null;

  @Column("varchar", {
    name: "os",
    nullable: true,
    comment: "운영체제",
    length: 250,
  })
  os: string | null;

  @Column("varchar", {
    name: "os_name",
    nullable: true,
    comment: "운영체제 명",
    length: 250,
  })
  osName: string | null;

  @Column("varchar", {
    name: "dev_tool",
    nullable: true,
    comment: "개발tool",
    length: 250,
  })
  devTool: string | null;

  @Column("varchar", {
    name: "dev_tool_name",
    nullable: true,
    comment: "개발tool 명",
    length: 250,
  })
  devToolName: string | null;

  @Column("varchar", {
    name: "dev_specific",
    nullable: true,
    comment: "개발 상세내역(OS,DBMS,개발언어 등)",
    length: 1000,
  })
  devSpecific: string | null;

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

  @Column("int", {
    name: "internal",
    nullable: true,
    comment: "1=외부 스킬인벤토리, 2=내부 스킬 인벤토리",
  })
  internal: number | null;

  @Column("varchar", {
    name: "commoncode_place",
    nullable: true,
    comment: "업무위치(common_code 테이블의 업무위치 code_value 값)",
    length: 30,
  })
  commoncodePlace: string | null;

  @ManyToOne(
    () => ProjectManageProjectinfo,
    (projectManageProjectinfo) =>
      projectManageProjectinfo.skillInventoryCareerSkills,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "workcode", referencedColumnName: "id" }])
  workcode2: ProjectManageProjectinfo;
}
