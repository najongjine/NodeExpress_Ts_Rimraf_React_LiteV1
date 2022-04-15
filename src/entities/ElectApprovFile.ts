import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectApprov } from "./ElectApprov";

@Index("elect_approv_file_ibfk_1", ["eaId"], {})
@Entity("elect_approv_file", { schema: "teware" })
export class ElectApprovFile {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "file_id",
    comment: "첨부파일 고유 식별 번호(PK)",
  })
  fileId: number;

  @Column("int", { name: "ea_id", nullable: true })
  eaId: number | null;

  @Column("varchar", {
    name: "enc_nm",
    nullable: true,
    comment: "저장 파일명",
    length: 100,
  })
  encNm: string | null;

  @Column("varchar", {
    name: "org_nm",
    nullable: true,
    comment: "실제파일명",
    length: 100,
  })
  orgNm: string | null;

  @Column("varchar", {
    name: "path",
    nullable: true,
    comment: "파일 경로",
    length: 100,
  })
  path: string | null;

  @Column("varchar", {
    name: "size",
    nullable: true,
    comment: "파일 사이즈",
    length: 50,
  })
  size: string | null;

  @Column("varchar", {
    name: "ext",
    nullable: true,
    comment: "파일 확장명 구분",
    length: 50,
  })
  ext: string | null;

  @Column("datetime", {
    name: "insert_dt",
    nullable: true,
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  insertDt: Date | null;

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    comment: "삭제여부",
    length: 10,
    default: () => "'N'",
  })
  delYn: string | null;

  @Column("varchar", {
    name: "mimetype",
    nullable: true,
    comment:
      "파일의mime type(파일 확장자 체크 아닌, 진짜 파일의 유형을 체크. 이미지 다운로드 기능에 필요)",
    length: 50,
  })
  mimetype: string | null;

  @ManyToOne(() => ElectApprov, (electApprov) => electApprov.electApprovFiles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ea_id", referencedColumnName: "id" }])
  ea: ElectApprov;
}
