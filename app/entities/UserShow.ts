import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Show} from "./Show";

export enum Staus {
  WATCHING,
  COMPLETED,
  ON_HOLD,
  DROPPED,
  PLAN_TO_WATCH
}

@Entity()
export class UserShow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  showId: number;

  @Column({type: 'enum', enum: Staus})
  status: Staus;

  @Column({type: 'int', default: 0})
  progress: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.userShows)
  user: User;

  @ManyToOne(() => Show, show => show.userShows)
  show: Show;
}