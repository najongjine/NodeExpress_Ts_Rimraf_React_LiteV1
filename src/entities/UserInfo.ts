import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommuteSettingForUserV2 } from './CommuteSettingForUserV2';
import { ElectApprov } from './ElectApprov';
import { ElectApprovVacation } from './ElectApprovVacation';
import { ElectApprovPurchase } from './ElectApprovPurchase';
import { CommuteUserInfoV2 } from './CommuteUserInfoV2';
import { CommuteTblV2 } from './CommuteTblV2';
import { CommuteSettingForUserV3 } from './CommuteSettingForUserV3';
import { CommuteKakaoworkV2 } from './CommuteKakaoworkV2';
import { ElectApprovBasic } from './ElectApprovBasic';

@Entity('user_info', { schema: 'teware' })
export class UserInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id', comment: '고유 id' })
  userId!: number;

  @Column('varchar', {
    name: 'login_id',
    nullable: true,
    comment: '로그인 id',
    length: 100,
  })
  loginId!: string | null;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '비밀번호',
    length: 100,
  })
  password!: string | null;

  @Column('varchar', {
    name: 'kr_name',
    nullable: true,
    comment: '한국 이름',
    length: 50,
  })
  krName!: string | null;

  @Column('varchar', {
    name: 'en_name',
    nullable: true,
    comment: '영문 이름',
    length: 50,
  })
  enName!: string | null;

  @Column('date', { name: 'birth_dt', nullable: true, comment: '생년월일' })
  birthDt!: string | null;

  @Column('varchar', {
    name: 'phone_num',
    nullable: true,
    comment: '연락처',
    length: 15,
  })
  phoneNum!: string | null;

  @Column('varchar', {
    name: 'post_num',
    nullable: true,
    comment: '우편번호',
    length: 20,
  })
  postNum!: string | null;

  @Column('varchar', {
    name: 'addr1',
    nullable: true,
    comment: '일반주소',
    length: 200,
  })
  addr1!: string | null;

  @Column('varchar', {
    name: 'addr2',
    nullable: true,
    comment: '상세주소',
    length: 200,
  })
  addr2!: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '개인 이메일 주소',
    length: 100,
  })
  email!: string | null;

  @Column('varchar', {
    name: 'kakaowork_email',
    nullable: true,
    comment: '카카오 워크 이메일 주소',
    length: 100,
  })
  kakaoworkEmail!: string | null;

  @Column('varchar', {
    name: 'place_work',
    nullable: true,
    comment: '업무위치(공통코드)',
    length: 50,
  })
  placeWork!: string | null;

  @Column('varchar', {
    name: 'department',
    nullable: true,
    comment: '소속부서(공통코드)',
    length: 50,
  })
  department!: string | null;

  @Column('varchar', {
    name: 'position',
    nullable: true,
    comment: '직급(공통코드)',
    length: 50,
  })
  position!: string | null;

  @Column('varchar', {
    name: 'duty',
    nullable: true,
    comment: '직책(공통코드)',
    length: 50,
  })
  duty!: string | null;

  @Column('varchar', {
    name: 'work_type',
    nullable: true,
    comment: '근로형태(공통 코드)',
    length: 50,
  })
  workType!: string | null;

  @Column('varchar', {
    name: 'state',
    nullable: true,
    comment: '상태(공통코드)',
    length: 50,
  })
  state!: string | null;

  @Column('varchar', {
    name: 'auth',
    nullable: true,
    comment: '등급[권한](공통코드)',
    length: 50,
  })
  auth!: string | null;

  @Column('varchar', {
    name: 'commute_yn',
    nullable: true,
    comment: '출퇴근 관리 여부',
    length: 5,
  })
  commuteYn!: string | null;

  @Column('datetime', {
    name: 'apply_date',
    nullable: true,
    comment: '변경된 출퇴근 시간 적용 일자',
  })
  applyDate!: Date | null;

  @Column('time', {
    name: 'attend_time',
    nullable: true,
    comment: '사용자별 출근 기준 시간',
    default: () => "'09:00:00'",
  })
  attendTime!: string | null;

  @Column('time', {
    name: 'leave_time',
    nullable: true,
    comment: '사용자별 퇴근 기준 시간',
    default: () => "'18:00:00'",
  })
  leaveTime!: string | null;

  @Column('varchar', {
    name: 'del_yn',
    nullable: true,
    comment: '삭제여부',
    length: 5,
  })
  delYn!: string | null;

  @Column('varchar', {
    name: 'papers_yn',
    nullable: true,
    comment: '서류 요청 여부',
    length: 5,
  })
  papersYn!: string | null;

  @Column('datetime', {
    name: 'parers_req_dt',
    nullable: true,
    comment: '서류 요청 일',
  })
  parersReqDt!: Date | null;

  @Column('varchar', {
    name: 'skill_yn',
    nullable: true,
    comment: '스킬 요청 여부',
    length: 5,
  })
  skillYn!: string | null;

  @Column('datetime', {
    name: 'skill_req_dt',
    nullable: true,
    comment: '스킬 요청 일',
  })
  skillReqDt!: Date | null;

  @Column('date', { name: 'emply_dt', nullable: true, comment: '입사 일' })
  emplyDt!: string | null;

  @Column('date', { name: 'resign_dt', nullable: true, comment: '퇴사 일' })
  resignDt!: string | null;

  @Column('int', { name: 'insert_id', nullable: true, comment: '등록 자' })
  insertId!: number | null;

  @Column('date', { name: 'insert_dt', nullable: true, comment: '등록 일 ' })
  insertDt!: string | null;

  @Column('int', { name: 'update_id', nullable: true, comment: '변경 자' })
  updateId!: number | null;

  @Column('date', { name: 'update_dt', nullable: true, comment: '변경 일' })
  updateDt!: string | null;

  @Column('int', { name: 'delete_id', nullable: true, comment: '삭제 자' })
  deleteId!: number | null;

  @Column('date', { name: 'delete_dt', nullable: true, comment: '삭제일' })
  deleteDt!: string | null;

  @Column('int', {
    name: 'user_num',
    nullable: true,
    comment: '무작위 생성 번호',
    default: () => "'0'",
  })
  userNum!: number | null;

  @Column('char', {
    name: 'user_num_yn',
    nullable: true,
    comment: '무작위 번호 사용유무',
    length: 1,
    default: () => "'N'",
  })
  userNumYn!: string | null;

  @Column('varchar', {
    name: 'company',
    nullable: true,
    comment: '회사',
    length: 255,
    default: () => "'tera'",
  })
  company!: string | null;

  @OneToMany(
    () => CommuteSettingForUserV2,
    (commuteSettingForUserV2) => commuteSettingForUserV2.user,
  )
  commuteSettingForUserVs!: CommuteSettingForUserV2[];

  @OneToMany(() => ElectApprov, (electApprov) => electApprov.user)
  electApprovs!: ElectApprov[];

  @OneToMany(
    () => ElectApprovVacation,
    (electApprovVacation) => electApprovVacation.user,
  )
  electApprovVacations!: ElectApprovVacation[];

  @OneToMany(
    () => ElectApprovPurchase,
    (electApprovPurchase) => electApprovPurchase.user,
  )
  electApprovPurchases!: ElectApprovPurchase[];

  @OneToMany(
    () => CommuteUserInfoV2,
    (commuteUserInfoV2) => commuteUserInfoV2.user,
  )
  commuteUserInfoVs!: CommuteUserInfoV2[];

  @OneToMany(() => CommuteTblV2, (commuteTblV2) => commuteTblV2.user)
  commuteTblVs!: CommuteTblV2[];

  @OneToMany(
    () => CommuteSettingForUserV3,
    (commuteSettingForUserV3) => commuteSettingForUserV3.user,
  )
  commuteSettingForUserVs2!: CommuteSettingForUserV3[];

  @OneToMany(
    () => CommuteKakaoworkV2,
    (commuteKakaoworkV2) => commuteKakaoworkV2.user,
  )
  commuteKakaoworkVs!: CommuteKakaoworkV2[];

  @OneToMany(
    () => ElectApprovBasic,
    (electApprovBasic) => electApprovBasic.user,
  )
  electApprovBasics!: ElectApprovBasic[];
}
