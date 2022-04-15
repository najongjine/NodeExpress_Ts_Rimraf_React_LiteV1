import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { ElectApprov } from "./ElectApprov";

@Index("FK_day_off_mng_teware.user_info", ["userId"], {})
@Index("elect_approv_vacation_ibfk_1", ["eaId"], {})
@Entity("elect_approv_vacation", { schema: "teware" })
export class ElectApprovVacation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "휴가 고유 식별 번호(PK)",
  })
  id: number;

  @Column("int", { name: "ea_id", comment: "전자 결재 고유 ID" })
  eaId: number;

  @Column("int", {
    name: "user_id",
    nullable: true,
    comment: "고유 id(userinfo)",
  })
  userId: number | null;

  @Column("varchar", {
    name: "day_off_reason",
    nullable: true,
    comment: "내용/사유",
    length: 50,
  })
  dayOffReason: string | null;

  @Column("varchar", {
    name: "day_off_date",
    nullable: true,
    comment: "휴가 신청일",
    length: 50,
  })
  dayOffDate: string | null;

  @Column("varchar", {
    name: "day_off_type",
    nullable: true,
    comment:
      "휴가구분\r\n{\r\nnormaloff:휴가(년차)\r\n,sickoff:병가\r\n,etcoff:특별휴가,기타휴가\r\n}",
    length: 50,
  })
  dayOffType: string | null;

  @Column("varchar", {
    name: "all_half_day_type",
    nullable: true,
    comment:
      "휴가구분{\r\nallday:전일\r\n,morningday:오전반차\r\n,afternoonday:오후반차\r\n,hfhfday:반반차\r\n}",
    length: 50,
  })
  allHalfDayType: string | null;

  @Column("varchar", {
    name: "off_st",
    nullable: true,
    comment: "연차 시작시간",
    length: 20,
  })
  offSt: string | null;

  @Column("varchar", {
    name: "off_et",
    nullable: true,
    comment: "연차 종료시간",
    length: 20,
  })
  offEt: string | null;

  @Column("varchar", {
    name: "day_off_stt",
    nullable: true,
    comment: "시작일",
    length: 10,
  })
  dayOffStt: string | null;

  @Column("varchar", {
    name: "day_off_end",
    nullable: true,
    comment: "종료일",
    length: 10,
  })
  dayOffEnd: string | null;

  @Column("varchar", {
    name: "attend_day_cnt",
    nullable: true,
    comment: "근태일수",
    length: 10,
  })
  attendDayCnt: string | null;

  @Column("varchar", {
    name: "day_off_use_cnt",
    nullable: true,
    comment: "사용일수",
    length: 10,
  })
  dayOffUseCnt: string | null;

  @Column("varchar", {
    name: "day_off_cancel",
    nullable: true,
    comment: "취소여부",
    length: 10,
    default: () => "'N'",
  })
  dayOffCancel: string | null;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.electApprovVacations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;

  @ManyToOne(
    () => ElectApprov,
    (electApprov) => electApprov.electApprovVacations,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
