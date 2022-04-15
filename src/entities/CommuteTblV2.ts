import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Index("user_id", ["userId"], {})
@Entity("commute_tbl_v2", { schema: "teware" })
export class CommuteTblV2 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", comment: "출퇴근 유저 ID 외래키" })
  userId: number;

  @Column("time", {
    name: "attendtime",
    nullable: true,
    comment: "출근 날짜, 시간",
  })
  attendtime: string | null;

  @Column("time", {
    name: "leavetime",
    nullable: true,
    comment: "퇴근 날짜, 시간",
  })
  leavetime: string | null;

  @Column("varchar", {
    name: "late_reason",
    nullable: true,
    comment: "지각 사유",
    length: 255,
  })
  lateReason: string | null;

  @Column("datetime", { name: "late_reason_time", nullable: true })
  lateReasonTime: Date | null;

  @Column("varchar", {
    name: "late_reason_answer",
    nullable: true,
    comment: "관리자 지각 사유 답변",
    length: 255,
  })
  lateReasonAnswer: string | null;

  @Column("datetime", { name: "late_reason_answer_time", nullable: true })
  lateReasonAnswerTime: Date | null;

  @Column("int", {
    name: "late_reason_insertId",
    nullable: true,
    comment: "지각사유 답변자의 id",
  })
  lateReasonInsertId: number | null;

  @Column("varchar", {
    name: "att_ip_in",
    nullable: true,
    comment: "출근 IP",
    length: 25,
  })
  attIpIn: string | null;

  @Column("varchar", {
    name: "att_ip_out",
    nullable: true,
    comment: "퇴근 IP",
    length: 25,
  })
  attIpOut: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.commuteTblVs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
