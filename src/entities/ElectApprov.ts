import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprovLine } from "./ElectApprovLine";
import { ElectApprovFile } from "./ElectApprovFile";
import { ElectApprovBusin } from "./ElectApprovBusin";
import { CommonCode } from "./CommonCode";
import { UserInfo } from "./UserInfo";
import { ElectApprovRef } from "./ElectApprovRef";
import { ElectApprovVacation } from "./ElectApprovVacation";
import { ElectApprovPurchase } from "./ElectApprovPurchase";
import { ElectApprovBasic } from "./ElectApprovBasic";

@Index("FK_elect_approv_user_info", ["userId"], {})
@Index("FK_elect_approv_common_code", ["categoryId"], {})
@Entity("elect_approv", { schema: "teware" })
export class ElectApprov {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "전자결재 고유 식별 번호(PK)",
  })
  id: number;

  @Column("int", {
    name: "category_id",
    nullable: true,
    comment: "카테고리 ID",
  })
  categoryId: number | null;

  @Column("int", { name: "user_id", nullable: true, comment: "기안자" })
  userId: number | null;

  @Column("datetime", {
    name: "created_dt",
    nullable: true,
    comment: "기안일자",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDt: Date | null;

  @Column("varchar", {
    name: "ea_yn",
    nullable: true,
    comment: "전자결재 상태. W=대기, Y=승인, N=반려",
    length: 50,
    default: () => "'W'",
  })
  eaYn: string | null;

  @Column("varchar", {
    name: "reject_reason",
    nullable: true,
    comment: "반려시 사유",
    length: 255,
  })
  rejectReason: string | null;

  @Column("varchar", {
    name: "reject_user_id",
    nullable: true,
    comment:
      "반려자 유저 id. null exception 안걸리게 하려고 fk도 안걸고 문자열로 저장함",
    length: 11,
  })
  rejectUserId: string | null;

  @OneToMany(() => ElectApprovLine, (electApprovLine) => electApprovLine.ea)
  electApprovLines: ElectApprovLine[];

  @OneToMany(() => ElectApprovFile, (electApprovFile) => electApprovFile.ea)
  electApprovFiles: ElectApprovFile[];

  @OneToMany(() => ElectApprovBusin, (electApprovBusin) => electApprovBusin.ea)
  electApprovBusins: ElectApprovBusin[];

  @ManyToOne(() => CommonCode, (commonCode) => commonCode.electApprovs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "codeId" }])
  category: CommonCode;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.electApprovs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;

  @OneToMany(() => ElectApprovRef, (electApprovRef) => electApprovRef.ea)
  electApprovRefs: ElectApprovRef[];

  @OneToMany(
    () => ElectApprovVacation,
    (electApprovVacation) => electApprovVacation.ea
  )
  electApprovVacations: ElectApprovVacation[];

  @OneToMany(
    () => ElectApprovPurchase,
    (electApprovPurchase) => electApprovPurchase.ea
  )
  electApprovPurchases: ElectApprovPurchase[];

  @OneToMany(() => ElectApprovBasic, (electApprovBasic) => electApprovBasic.ea)
  electApprovBasics: ElectApprovBasic[];
}
