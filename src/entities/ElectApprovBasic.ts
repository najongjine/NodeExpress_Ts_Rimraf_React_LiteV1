import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprov } from "./ElectApprov";
import { UserInfo } from "./UserInfo";

@Index("ea_id", ["eaId"], {})
@Index("user_id", ["userId"], {})
@Entity("elect_approv_basic", { schema: "teware" })
export class ElectApprovBasic {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ea_id", nullable: true })
  eaId: number | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @ManyToOne(
    () => ElectApprov,
    (electApprov) => electApprov.electApprovBasics,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.electApprovBasics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
