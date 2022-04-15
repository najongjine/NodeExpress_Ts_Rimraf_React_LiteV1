import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("attnd_ip_addr", { schema: "teware" })
export class AttndIpAddr {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "PK(고유번호)" })
  seq: number;

  @Column("int", {
    name: "user_id",
    nullable: true,
    comment: "회원 ID(신청자)",
  })
  userId: number | null;

  @Column("varchar", {
    name: "ip_addr",
    nullable: true,
    comment: "IP 주소",
    length: 50,
  })
  ipAddr: string | null;

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    comment: "삭제여부(Y:삭제, N:정상)",
    length: 5,
  })
  delYn: string | null;

  @Column("datetime", { name: "insert_dt", nullable: true, comment: "등록일" })
  insertDt: Date | null;

  @Column("int", { name: "appr_id", nullable: true, comment: "승인 자(ID)" })
  apprId: number | null;

  @Column("varchar", {
    name: "appr_yn",
    nullable: true,
    comment: "승인여부(Y:승인, N:거부, ING:대기중)",
    length: 5,
  })
  apprYn: string | null;

  @Column("datetime", { name: "appr_dt", nullable: true, comment: "승인 일" })
  apprDt: Date | null;
}
