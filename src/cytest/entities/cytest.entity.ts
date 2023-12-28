import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cytest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  uuid: string;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('text', { nullable: true })
  codeBlock: string | null;

  @Column({ length: 100, nullable: true })
  creatorEmail: string | null;

  @Column({ length: 100, nullable: true })
  creatorName: string | null;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'modify_time' })
  modifyTime: Date;
}
