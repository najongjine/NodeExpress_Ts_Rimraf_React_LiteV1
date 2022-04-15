import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Index("user_id", ["userId", "createdAt"], { unique: true })
@Index("FK1_user_id", ["userId"], {})
@Entity("commute_user_info_v2", { schema: "teware" })
export class CommuteUserInfoV2 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", comment: "사용자 고유 아이디(외래키)" })
  userId: number;

  @Column("varchar", {
    name: "isweekend",
    nullable: true,
    comment: "주말여부",
    length: 1,
  })
  isweekend: string | null;

  @Column("varchar", {
    name: "isholiday",
    nullable: true,
    comment: "공휴일여부",
    length: 1,
  })
  isholiday: string | null;

  @Column("time", {
    name: "attendtime",
    nullable: true,
    comment: "출근버튼 누른시간",
  })
  attendtime: string | null;

  @Column("time", {
    name: "leavetime",
    nullable: true,
    comment: "퇴근버튼 누른시간",
  })
  leavetime: string | null;

  @Column("varchar", {
    name: "late_reason",
    nullable: true,
    comment: "지각사유",
    length: 255,
  })
  lateReason: string | null;

  @Column("datetime", {
    name: "late_reason_time",
    nullable: true,
    comment: "지각사유서 쓴 시간",
  })
  lateReasonTime: Date | null;

  @Column("varchar", {
    name: "late_reason_answer",
    nullable: true,
    comment: "지각사유 답변",
    length: 255,
  })
  lateReasonAnswer: string | null;

  @Column("datetime", {
    name: "late_reason_answer_time",
    nullable: true,
    comment: "지각사유서 답변 시간",
  })
  lateReasonAnswerTime: Date | null;

  @Column("int", { name: "late_reason_insertId", nullable: true })
  lateReasonInsertId: number | null;

  @Column("varchar", { name: "att_ip_in", nullable: true, length: 30 })
  attIpIn: string | null;

  @Column("varchar", { name: "att_ip_out", nullable: true, length: 30 })
  attIpOut: string | null;

  @Column("date", {
    name: "stdate",
    nullable: true,
    comment: "특별설정된 근태 시작날자",
  })
  stdate: string | null;

  @Column("date", {
    name: "enddate",
    nullable: true,
    comment: "특별설정된 근태 종료날자",
  })
  enddate: string | null;

  @Column("time", {
    name: "target_attend_time",
    nullable: true,
    comment: "해당일에 출근해야되는 시간",
  })
  targetAttendTime: string | null;

  @Column("time", {
    name: "target_leave_time",
    nullable: true,
    comment: "해당일에 퇴근해야되는시간",
  })
  targetLeaveTime: string | null;

  @Column("varchar", {
    name: "no_attend_check_yn",
    nullable: true,
    comment: "근태관리대상 아님 여부",
    length: 1,
  })
  noAttendCheckYn: string | null;

  @Column("varchar", {
    name: "place_work",
    nullable: true,
    comment: "common_code 근무위치",
    length: 100,
  })
  placeWork: string | null;

  @Column("varchar", {
    name: "place_work_name",
    nullable: true,
    comment: "common_code 근무위치 이름",
    length: 100,
  })
  placeWorkName: string | null;

  @Column("varchar", {
    name: "no_late_reason_cnt",
    nullable: true,
    comment: "1이상= 지각사유서 써야됨",
    length: 11,
  })
  noLateReasonCnt: string | null;

  @Column("varchar", {
    name: "late_yn",
    nullable: true,
    comment: "지각여부",
    length: 1,
  })
  lateYn: string | null;

  @Column("varchar", {
    name: "leave_early_yn",
    nullable: true,
    comment: "조기퇴근 여부",
    length: 1,
  })
  leaveEarlyYn: string | null;

  @Column("varchar", {
    name: "off_st",
    nullable: true,
    comment: "휴가(연차)일시 시작시간(00:00 은 전일 휴일)",
    length: 20,
  })
  offSt: string | null;

  @Column("varchar", {
    name: "off_et",
    nullable: true,
    comment: "휴가(연차)일시 종료시간(00:00 은 전일 휴일)",
    length: 20,
  })
  offEt: string | null;

  @Column("varchar", {
    name: "all_half_day_type",
    nullable: true,
    comment: "연차,반차,반반차 타입",
    length: 50,
  })
  allHalfDayType: string | null;

  @Column("varchar", {
    name: "day_off_type",
    nullable: true,
    comment: "common_code 의 휴가코드",
    length: 100,
  })
  dayOffType: string | null;

  @Column("varchar", {
    name: "day_off_type_name",
    nullable: true,
    comment: "common_code 의 휴가코드 이름",
    length: 100,
  })
  dayOffTypeName: string | null;

  @Column("varchar", {
    name: "sent_kakao_work_for_write_late_reason_yn",
    nullable: true,
    comment: "지각사유서 쓰라고 카카오워크 보냄 여부",
    length: 1,
  })
  sentKakaoWorkForWriteLateReasonYn: string | null;

  @Column("date", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.commuteUserInfoVs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
