import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("commute_default_attend_leave_time", { schema: "teware" })
export class CommuteDefaultAttendLeaveTime {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "company", nullable: true, length: 255 })
  company: string | null;

  @Column("varchar", { name: "dept", nullable: true, length: 60 })
  dept: string | null;

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

  @Column("date", { name: "start_active_dt", nullable: true })
  startActiveDt: string | null;
}
