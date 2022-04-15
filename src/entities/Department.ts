import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("department", { schema: "teware" })
export class Department {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "department_id",
    comment: "아이디",
  })
  departmentId: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "부서명",
    length: 100,
  })
  name: string | null;

  @Column("varchar", {
    name: "post_num",
    nullable: true,
    comment: "우편번호",
    length: 20,
  })
  postNum: string | null;

  @Column("varchar", {
    name: "addr1",
    nullable: true,
    comment: "주소",
    length: 200,
  })
  addr1: string | null;

  @Column("varchar", {
    name: "addr2",
    nullable: true,
    comment: "상세주소",
    length: 200,
  })
  addr2: string | null;

  @Column("varchar", {
    name: "phone_number",
    nullable: true,
    comment: "연락처",
    length: 20,
  })
  phoneNumber: string | null;

  @Column("varchar", {
    name: "fax_number",
    nullable: true,
    comment: "팩스 번호",
    length: 20,
  })
  faxNumber: string | null;
}
