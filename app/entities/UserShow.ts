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

  @Column({type: 'enum', enum: Staus, default: Staus.PLAN_TO_WATCH})
  status: Staus;

  @Column({type: 'int', default: 0})
  progress: number;

  @Column({type: 'int', default: 0})
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.userShows)
  user: User;

  @ManyToOne(() => Show, show => show.userShows)
  show: Show;

  setUserId(userId: number): UserShow {
    this.userId = userId;
    return this;
  }

  setShowId(showId: number): UserShow {
    this.showId = showId;
    return this;
  }

  setStatus(status: Staus): UserShow {
    this.status = status;
    return this;
  }

  setProgress(progress: number): UserShow {
    this.progress = progress;
    return this;
  }

  setScore(score: number): UserShow {
    this.score = score;
    return this;
  }
}