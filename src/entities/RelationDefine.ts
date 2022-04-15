import { Column, Entity } from "typeorm";

@Entity("relation_define", { schema: "teware" })
export class RelationDefine {
  @Column("varchar", {
    primary: true,
    name: "code",
    comment: "코드",
    length: 10,
  })
  code: string;

  @Column("varchar", {
    name: "from_table",
    nullable: true,
    comment: "상위 테이블",
    length: 100,
  })
  fromTable: string | null;

  @Column("varchar", {
    name: "from_table_name",
    nullable: true,
    comment: "상위 테이블 명",
    length: 100,
  })
  fromTableName: string | null;

  @Column("varchar", {
    name: "to_table",
    nullable: true,
    comment: "하위 테이블",
    length: 100,
  })
  toTable: string | null;

  @Column("varchar", {
    name: "to_table_name",
    nullable: true,
    comment: "하위 테이블 명",
    length: 100,
  })
  toTableName: string | null;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "설명",
    length: 100,
  })
  description: string | null;
}
