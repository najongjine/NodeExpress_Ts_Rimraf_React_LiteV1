import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comm_attach_file", { schema: "teware" })
export class CommAttachFile {
  @PrimaryGeneratedColumn({ type: "int", name: "file_id" })
  fileId: number;

  @Column("varchar", {
    name: "enc_nm",
    nullable: true,
    comment: "저장 파일명",
    length: 50,
  })
  encNm: string | null;

  @Column("varchar", {
    name: "org_nm",
    nullable: true,
    comment: "실제 파일명",
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

  @Column("int", { name: "ref_id", nullable: true, comment: "참조 유저 id" })
  refId: number | null;

  @Column("varchar", {
    name: "ref_type",
    nullable: true,
    comment: "참조 유저 권한",
    length: 100,
  })
  refType: string | null;

  @Column("varchar", {
    name: "category",
    nullable: true,
    comment: "파일 카테고리 구분",
    length: 40,
  })
  category: string | null;

  @Column("varchar", {
    name: "del_yn",
    nullable: true,
    comment: "삭제여부",
    length: 5,
    default: () => "'N'",
  })
  delYn: string | null;

  @Column("int", { name: "insert_id", nullable: true, comment: "등록자" })
  insertId: number | null;

  @Column("datetime", {
    name: "insert_dt",
    nullable: true,
    comment: "등록일",
    default: () => "CURRENT_TIMESTAMP",
  })
  insertDt: Date | null;

  @Column("varchar", {
    name: "mimetype",
    nullable: true,
    comment:
      "파일의mime type(파일 확장자 체크 아닌, 진짜 파일의 유형을 체크. 이미지 다운로드 기능에 필요)",
    length: 100,
  })
  mimetype: string | null;
}
