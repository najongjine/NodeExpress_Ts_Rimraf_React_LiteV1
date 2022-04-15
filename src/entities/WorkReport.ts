import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("work_report", { schema: "teware" })
export class WorkReport {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "고유 ID" })
  id: number;

  @Column("varchar", {
    name: "report_type",
    comment: "보고 구분(WEEK:주간, DAY:일일)",
    length: 10,
  })
  reportType: string;

  @Column("date", {
    name: "report_dt",
    comment: "보고 일자",
    default: () => "CURRENT_TIMESTAMP",
  })
  reportDt: string;

  @Column("varchar", { name: "title", comment: "주제", length: 255 })
  title: string;

  @Column("text", { name: "content", comment: "내용" })
  content: string;

  @Column("varchar", {
    name: "del_yn",
    comment: "삭제 여부(Y:삭제, N:정상)",
    length: 5,
    default: () => "'N'",
  })
  delYn: string;

  @Column("int", { name: "insert_id", comment: "등록자" })
  insertId: number;

  @Column("date", {
    name: "insert_dt",
    nullable: true,
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  insertDt: string | null;

  @Column("int", { name: "update_id", nullable: true, comment: "변경자" })
  updateId: number | null;

  @Column("datetime", { name: "update_dt", nullable: true, comment: "변경일" })
  updateDt: Date | null;

  @Column("int", { name: "delete_id", nullable: true, comment: "삭제자" })
  deleteId: number | null;

  @Column("date", { name: "delete_dt", nullable: true, comment: "삭제일" })
  deleteDt: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "데이터 생성일",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true, comment: "수정일" })
  updatedAt: Date | null;
}
