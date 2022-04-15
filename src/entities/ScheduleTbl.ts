import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedule_tbl", { schema: "teware" })
export class ScheduleTbl {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "일정 고유 아이디 값",
  })
  id: number;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "일정 제목",
    length: 500,
  })
  title: string | null;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "일정 설명",
    length: 500,
  })
  description: string | null;

  @Column("varchar", {
    name: "write_user",
    nullable: true,
    comment: "작성자",
    length: 50,
  })
  writeUser: string | null;

  @Column("varchar", {
    name: "target_user",
    nullable: true,
    comment: "일정 대상자",
    length: 500,
  })
  targetUser: string | null;

  @Column("varchar", {
    name: "target_user_id",
    nullable: true,
    comment: "일정 대상자 아이디",
    length: 500,
  })
  targetUserId: string | null;

  @Column("tinyint", {
    name: "all_day",
    nullable: true,
    comment: "일정 종일 구분 (0:false, 1:true)",
    default: () => "'0'",
  })
  allDay: number | null;

  @Column("tinyint", {
    name: "event_type",
    nullable: true,
    comment: "일정 분류 (1.공통 / 2.내일정 / 3.공유일정)",
    default: () => "'1'",
  })
  eventType: number | null;

  @Column("varchar", {
    name: "file_path",
    nullable: true,
    comment: "파일 첨부 경로 (테스트용)",
    length: 500,
  })
  filePath: string | null;

  @Column("varchar", {
    name: "backgroundColor",
    nullable: true,
    comment: "일정 배경 색상",
    length: 500,
  })
  backgroundColor: string | null;

  @Column("datetime", {
    name: "test_start_date",
    nullable: true,
    comment: "테스트 일정 시작일",
  })
  testStartDate: Date | null;

  @Column("datetime", {
    name: "test_end_date",
    nullable: true,
    comment: "테스트 일정 종료일",
  })
  testEndDate: Date | null;
}
