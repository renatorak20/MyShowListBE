import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {UserShow} from "./UserShow";
import {Genre} from "./Genre";
import {Comment} from "./Comment";

/**
 * @swagger
 * components:
 *   schemas:
 *     ShowType:
 *       type: string
 *       enum: [TV_SERIES, MOVIE]
 *       description: Type of the show (TV series or movie)
 */
export enum ShowType {
  TV_SERIES,
  MOVIE,
}

  /**
   * @swagger
   * components:
   *   schemas:
   *     Show:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: Auto-generated ID of the show
   *         title:
   *           type: string
   *           description: Title of the show
   *         description:
   *           type: string
   *           description: Detailed description
   *         type:
   *           type: string
   *           enum: [TV_SERIES, MOVIE]
   *           description: Type of the show
   *         episodes:
   *           type: integer
   *           default: 1
   *           description: Number of episodes
   *         startDate:
   *           type: string
   *           format: date
   *           nullable: true
   *         endDate:
   *           type: string
   *           format: date
   *           nullable: true
   *         createdAt:
   *           type: string
   *           format: date
   *         updatedAt:
   *           type: string
   *           format: date
   *         genres:
   *           type: array
   *           items:
   *             $ref: '../entities/Genre.ts#/components/schemas/Genre'
   */
@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'enum', enum: ShowType})
  type: ShowType;

  @Column({type: 'int', default: 1})
  episodes: number;

  @Column({type: 'date', nullable: true})
  startDate: Date;

  @Column({type: 'date', nullable: true})
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Genre, genre => genre.shows)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, comment => comment.show)
  comments: Comment[];

  @OneToMany(() => UserShow, userShow => userShow.show)
  userShows: UserShow[];


  setId(id: number): Show {
    this.id = id;
    return this;
  }

  setTitle(title: string): Show {
    this.title = title;
    return this;
  }

  setDescription(description: string): Show {
    this.description = description;
    return this;
  }

  setType(type: ShowType): Show {
    this.type = type;
    return this;
  }

  setEpisodes(episodes: number): Show {
    this.episodes = episodes;
    return this;
  }

  setStartDate(startDate: Date): Show {
    this.startDate = startDate;
    return this;
  }

  setEndDate(endDate: Date): Show {
    this.endDate = endDate;
    return this;
  }

  setGenres(genres: Genre[]): Show {
    this.genres = genres;
    return this;
  }
}