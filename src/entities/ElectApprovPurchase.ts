import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprovPurchaseItems } from "./ElectApprovPurchaseItems";
import { UserInfo } from "./UserInfo";
import { ElectApprov } from "./ElectApprov";

@Index("elect_approv_purchase_ibfk_1", ["userId"], {})
@Index("elect_approv_purchase_ibfk_2", ["eaId"], {})
@Entity("elect_approv_purchase", { schema: "teware" })
export class ElectApprovPurchase {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "공통 문서 고유 ID",
  })
  id: number;

  @Column("int", { name: "ea_id", comment: "전자결재 고유 ID" })
  eaId: number;

  @Column("int", { name: "user_id", nullable: true, comment: "고유 id" })
  userId: number | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "공통 문서 제목",
    length: 255,
    default: () => "''",
  })
  title: string | null;

  @Column("text", {
    name: "content",
    nullable: true,
    comment: "공통 문서 내용/사유",
    default: () => "''",
  })
  content: string | null;

  @Column("varchar", {
    name: "total_price",
    nullable: true,
    comment: "합계금액",
    length: 50,
    default: () => "''",
  })
  totalPrice: string | null;

  @OneToMany(
    () => ElectApprovPurchaseItems,
    (electApprovPurchaseItems) => electApprovPurchaseItems.eap
  )
  electApprovPurchaseItems: ElectApprovPurchaseItems[];

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.electApprovPurchases, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;

  @ManyToOne(
    () => ElectApprov,
    (electApprov) => electApprov.electApprovPurchases,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
