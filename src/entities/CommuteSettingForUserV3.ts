import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommuteSettingForUserWeekdayV3 } from "./CommuteSettingForUserWeekdayV3";
import { UserInfo } from "./UserInfo";

@Index("user_id", ["userId"], {})
@Entity("commute_setting_for_user_v3", { schema: "teware" })
export class CommuteSettingForUserV3 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("date", { name: "stdate", nullable: true })
  stdate: string | null;

  @Column("date", { name: "enddate", nullable: true })
  enddate: string | null;

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

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  delYn: string | null;

  @OneToMany(
    () => CommuteSettingForUserWeekdayV3,
    (commuteSettingForUserWeekdayV3) => commuteSettingForUserWeekdayV3.csfu
  )
  commuteSettingForUserWeekdayVs: CommuteSettingForUserWeekdayV3[];

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.commuteSettingForUserVs2, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
