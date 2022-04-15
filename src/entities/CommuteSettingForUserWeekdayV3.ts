import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommuteSettingForUserV3 } from "./CommuteSettingForUserV3";

@Index("csfu_id", ["csfuId"], {})
@Entity("commute_setting_for_user_weekday_v3", { schema: "teware" })
export class CommuteSettingForUserWeekdayV3 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "csfu_id", nullable: true })
  csfuId: number | null;

  @Column("time", {
    name: "attendtime",
    nullable: true,
    comment: "23:24:00 = 휴일",
  })
  attendtime: string | null;

  @Column("time", {
    name: "leavetime",
    nullable: true,
    comment: "23:24:00 = 휴일",
  })
  leavetime: string | null;

  @Column("varchar", {
    name: "weekday",
    nullable: true,
    comment:
      "'0' = '월요일'\r\n     '1' = '화요일'\r\n     '2' = '수요일'\r\n     '3' = '목요일'\r\n     '4' = '금요일'\r\n     '5' = '토요일'\r\n     '6' = '일요일'",
    length: 1,
  })
  weekday: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(
    () => CommuteSettingForUserV3,
    (commuteSettingForUserV3) =>
      commuteSettingForUserV3.commuteSettingForUserWeekdayVs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "csfu_id", referencedColumnName: "id" }])
  csfu: CommuteSettingForUserV3;
}
