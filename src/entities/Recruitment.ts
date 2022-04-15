import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("recruitment", { schema: "teware" })
export class Recruitment {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "recruitment_id",
    comment: "고유 id",
  })
  recruitmentId: number;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "제목",
    length: 255,
  })
  title: string | null;

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment:
      "상태[스케줄 조정, 면접 대기, 면접 완료, 면접 취소, 취소(생성자 만 가능)]",
    length: 10,
  })
  status: string | null;

  @Column("int", { name: "create_user", comment: "생성자" })
  createUser: number;

  @Column("date", {
    name: "create_date",
    nullable: true,
    comment: "생성일",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: string | null;

  @Column("varchar", {
    name: "comment",
    nullable: true,
    comment: "코멘트",
    length: 255,
  })
  comment: string | null;

  @Column("timestamp", {
    name: "meeting_time",
    nullable: true,
    comment: "면접 시간",
  })
  meetingTime: Date | null;
}
