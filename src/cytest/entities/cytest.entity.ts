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

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('text', { nullable: true })
  code_block: string | null;

  @CreateDateColumn({ name: 'create_time' })
  create_time: Date;

  @UpdateDateColumn({ name: 'modify_time' })
  modify_time: Date;
}
