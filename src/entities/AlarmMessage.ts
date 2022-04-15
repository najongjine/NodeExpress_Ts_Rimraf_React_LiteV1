import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('message', ['message', 'userId'], { unique: true })
@Entity('alarm_message', { schema: 'teware' })
export class AlarmMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id!: number;

  @Column('int', { name: 'user_id', nullable: true, comment: '사용자  id' })
  userId!: number | null;

  @Column('varchar', {
    name: 'alarm_type',
    nullable: true,
    comment: '알림 구분(issue : 이슈알림, normal : 보통알림 )',
    length: 50,
  })
  alarmType!: string | null;

  @Column('varchar', {
    name: 'message_type',
    nullable: true,
    comment: '메세지 타입 구분',
    length: 50,
  })
  messageType!: string | null;

  @Column('varchar', {
    name: 'message',
    nullable: true,
    comment: '메시지 내용',
    length: 100,
  })
  message!: string | null;

  @Column('varchar', {
    name: 'url',
    nullable: true,
    comment: '주소',
    length: 50,
  })
  url!: string | null;

  @Column('varchar', {
    name: 'check_yn',
    nullable: true,
    comment: '확인 여부(읽기, 닫기)',
    length: 5,
    default: () => "'N'",
  })
  checkYn!: string | null;

  @Column('int', { name: 'insert_id', nullable: true, comment: '등록자' })
  insertId!: number | null;

  @Column('datetime', { name: 'insert_dt', nullable: true, comment: '등록일' })
  insertDt!: Date | null;
}
