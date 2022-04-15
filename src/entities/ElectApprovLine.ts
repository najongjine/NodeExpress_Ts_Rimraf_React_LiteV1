import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprov } from "./ElectApprov";

@Index("FK_elect_approv_line_elect_approv", ["eaId"], {})
@Entity("elect_approv_line", { schema: "teware" })
export class ElectApprovLine {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "고유 식별 번호(PK)",
  })
  id: number;

  @Column("int", { name: "ea_id", comment: "전자결재 elect_approv 테이블 id" })
  eaId: number;

  @Column("int", { name: "user_id", nullable: true, comment: "결재자 id" })
  userId: number | null;

  @Column("int", { name: "lvl", nullable: true, comment: "결재선 순서" })
  lvl: number | null;

  @Column("varchar", {
    name: "b4yn",
    nullable: true,
    comment: "전 결재자가 승인 했는지 여부",
    length: 1,
    default: () => "'N'",
  })
  b4yn: string | null;

  @Column("varchar", {
    name: "line_yn",
    nullable: true,
    comment: "승인버튼 눌렀는지 여부",
    length: 50,
    default: () => "'W'",
  })
  lineYn: string | null;

  @Column("datetime", {
    name: "line_yn_dt",
    nullable: true,
    comment: "승인,반려 결정 날짜",
  })
  lineYnDt: Date | null;

  @ManyToOne(() => ElectApprov, (electApprov) => electApprov.electApprovLines, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
