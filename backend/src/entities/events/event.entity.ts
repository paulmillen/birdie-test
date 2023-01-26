import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  payload: string;

  @Column()
  timestamp: string;

  @Column()
  care_recipient_id: string;
}
