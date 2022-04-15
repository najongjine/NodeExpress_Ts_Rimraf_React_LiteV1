import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprov } from "./ElectApprov";

@Index("ea_id", ["eaId"], {})
@Entity("elect_approv_busin", { schema: "teware" })
export class ElectApprovBusin {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "공통 문서 고유 ID",
  })
  id: number;

  @Column("int", {
    name: "ea_id",
    comment: "전자결재 고유 ID",
    default: () => "'0'",
  })
  eaId: number;

  @Column("int", { name: "user_id", nullable: true, comment: "고유 id" })
  userId: number | null;

  @Column("varchar", {
    name: "today_busin",
    comment: "출장 신청일자",
    length: 50,
  })
  todayBusin: string;

  @Column("varchar", {
    name: "busin_region",
    nullable: true,
    comment: "출장지역",
    length: 50,
  })
  businRegion: string | null;

  @Column("varchar", {
    name: "busin_stt",
    nullable: true,
    comment: "출장 시작일",
    length: 50,
  })
  businStt: string | null;

  @Column("varchar", {
    name: "busin_end",
    nullable: true,
    comment: "출장 종료일",
    length: 50,
  })
  businEnd: string | null;

  @Column("int", {
    name: "busin_use_cnt",
    nullable: true,
    comment: "출장 일수",
  })
  businUseCnt: number | null;

  @Column("varchar", {
    name: "busin_reason",
    nullable: true,
    comment: "출장이유(지급계좌 및 비용 적기)",
    length: 50,
  })
  businReason: string | null;

  @ManyToOne(
    () => ElectApprov,
    (electApprov) => electApprov.electApprovBusins,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
