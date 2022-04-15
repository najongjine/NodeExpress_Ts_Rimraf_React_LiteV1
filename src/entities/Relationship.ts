import { Column, Entity, Index } from "typeorm";

@Index("relationship_end_date_rel_type_index", ["endDate", "relType"], {})
@Entity("relationship", { schema: "teware" })
export class Relationship {
  @Column("int", { name: "from_id", comment: "상위 오브젝트" })
  fromId: number;

  @Column("int", { name: "to_id", comment: "하위 오브젝트" })
  toId: number;

  @Column("varchar", { name: "rel_type", comment: "관계 구분", length: 100 })
  relType: string;

  @Column("timestamp", {
    name: "start_date",
    comment: "시작 시간",
    default: () => "CURRENT_TIMESTAMP",
  })
  startDate: Date;

  @Column("datetime", {
    name: "end_date",
    comment: "종료 시간",
    default: () => "'9999-12-31 23:59:59'",
  })
  endDate: Date;
}
