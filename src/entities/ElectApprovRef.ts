import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprov } from "./ElectApprov";

@Index("FK_elect_approv_ref_elect_approv", ["eaId"], {})
@Entity("elect_approv_ref", { schema: "teware" })
export class ElectApprovRef {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "전자결재 참조자 고유 식별 번호(PK)",
  })
  id: number;

  @Column("int", { name: "user_id", nullable: true, comment: "참조자 id" })
  userId: number | null;

  @Column("int", {
    name: "ea_id",
    nullable: true,
    comment: "전자결재 고유 식별 번호",
  })
  eaId: number | null;

  @ManyToOne(() => ElectApprov, (electApprov) => electApprov.electApprovRefs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
