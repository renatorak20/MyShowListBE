import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Show} from "./Show";

/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: string
 *       enum: [WATCHING, COMPLETED, ON_HOLD, DROPPED, PLAN_TO_WATCH]
 *       description: The status of the user with the show
 */
export enum Staus {
  WATCHING,
  COMPLETED,
  ON_HOLD,
  DROPPED,
  PLAN_TO_WATCH
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserShow:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the UserShow record
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the show
 *         showId:
 *           type: integer
 *           description: The ID of the show being tracked
 *         status:
 *           type: string
 *           enum: [WATCHING, COMPLETED, ON_HOLD, DROPPED, PLAN_TO_WATCH]
 *           default: PLAN_TO_WATCH
 *           description: The current status of the user with the show
 *         progress:
 *           type: integer
 *           default: 0
 *           description: The progress made by the user in the show (e.g., episode number)
 *         score:
 *           type: integer
 *           default: 0
 *           description: The score given by the user to the show
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the UserShow record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the UserShow record was last updated
 */
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