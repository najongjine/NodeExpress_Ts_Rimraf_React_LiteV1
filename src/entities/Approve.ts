import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("approve", { schema: "teware" })
export class Approve {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "approve_id",
    comment: "고유 id",
  })
  approveId: number;

  @Column("int", { name: "level", nullable: true, comment: "레벨" })
  level: number | null;

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment: "상태[P: 대기, A: 승인, R: 반려]",
    length: 10,
    default: () => "'P'",
  })
  status: string | null;

  @Column("int", { name: "approver", nullable: true, comment: "결재자" })
  approver: number | null;

  @Column("mediumtext", { name: "comment", nullable: true, comment: "코멘트" })
  comment: string | null;

  @Column("datetime", {
    name: "create_date",
    nullable: true,
    comment: "생성일",
    default: () => "'cast(current_timestamp() as date)'",
  })
  createDate: Date | null;

  @Column("datetime", {
    name: "finish_date",
    nullable: true,
    comment: "완료일",
  })
  finishDate: Date | null;

  @Column("int", { name: "create_user", nullable: true })
  createUser: number | null;
}
