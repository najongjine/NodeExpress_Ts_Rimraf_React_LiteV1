import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("kakaowork_bot_key", { schema: "teware" })
export class KakaoworkBotKey {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "appkey",
    comment: "카카오워크 봇 key",
    length: 255,
  })
  appkey: string;

  @Column("varchar", {
    name: "type",
    comment: "test=테스트용, production=실무용",
    length: 20,
  })
  type: string;

  @Column("int", { name: "user_id", comment: "관리 유저 id" })
  userId: number;

  @Column("varchar", {
    name: "user_name",
    nullable: true,
    comment: "관리 유저 이름",
    length: 50,
  })
  userName: string | null;
}
