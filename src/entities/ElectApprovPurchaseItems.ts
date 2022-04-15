import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprovPurchase } from "./ElectApprovPurchase";

@Index("eap_id", ["eapId"], {})
@Entity("elect_approv_purchase_items", { schema: "teware" })
export class ElectApprovPurchaseItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "eap_id", nullable: true })
  eapId: number | null;

  @Column("varchar", { name: "item_name", nullable: true, length: 255 })
  itemName: string | null;

  @Column("int", { name: "qty", nullable: true })
  qty: number | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @ManyToOne(
    () => ElectApprovPurchase,
    (electApprovPurchase) => electApprovPurchase.electApprovPurchaseItems,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "eap_id", referencedColumnName: "id" }])
  eap: ElectApprovPurchase;
}
