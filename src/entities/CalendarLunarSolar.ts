import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("lunar_date", ["lunardate"], {})
@Index("solar_date", ["solardate"], {})
@Entity("calendar_lunar_solar", { schema: "teware" })
export class CalendarLunarSolar {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", {
    name: "lunardate",
    nullable: true,
    length: 10,
    default: () => "'0000-00-00'",
  })
  lunardate: string | null;

  @Column("date", {
    name: "solardate",
    nullable: true,
    comment: "이거기준",
    default: () => "'0000-00-00'",
  })
  solardate: string | null;

  @Column("tinyint", {
    name: "yun",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  yun: boolean | null;

  @Column("varchar", {
    name: "ganji",
    nullable: true,
    length: 5,
    default: () => "''",
  })
  ganji: string | null;

  @Column("varchar", {
    name: "memo",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  memo: string | null;

  @Column("varchar", {
    name: "isholiday",
    nullable: true,
    comment: "Y=공휴일",
    length: 1,
  })
  isholiday: string | null;

  @Column("varchar", {
    name: "isweekend",
    nullable: true,
    comment: "Y=주말",
    length: 1,
  })
  isweekend: string | null;

  @Column("varchar", {
    name: "iscustom",
    nullable: true,
    comment: "Y=관리자가 설정한 공휴일",
    length: 1,
    default: () => "'N'",
  })
  iscustom: string | null;

  @Column("varchar", { name: "custom_memo", nullable: true, length: 255 })
  customMemo: string | null;
}
