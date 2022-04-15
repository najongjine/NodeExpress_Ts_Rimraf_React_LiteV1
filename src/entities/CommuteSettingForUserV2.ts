import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Index("user_id", ["userId", "stdate"], { unique: true })
@Entity("commute_setting_for_user_v2", { schema: "teware" })
export class CommuteSettingForUserV2 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("date", { name: "stdate", nullable: true })
  stdate: string | null;

  @Column("date", { name: "enddate", nullable: true })
  enddate: string | null;

  @Column("time", {
    name: "attendtime",
    nullable: true,
    comment: "23:23:00 근태관리대상 아님",
  })
  attendtime: string | null;

  @Column("time", {
    name: "leavetime",
    nullable: true,
    comment: "23:23:00 근태관리 대상 아님",
  })
  leavetime: string | null;

  @Column("varchar", {
    name: "place_work",
    nullable: true,
    comment: "근무위치",
    length: 30,
  })
  placeWork: string | null;

  @Column("varchar", {
    name: "comment",
    nullable: true,
    comment: "근태설정 사유",
    length: 500,
  })
  comment: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.commuteSettingForUserVs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
