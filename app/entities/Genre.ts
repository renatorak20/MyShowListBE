import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import {Show} from "./Show";

/**
 * @swagger
 * components:
 *   schemas:
 *     GenreType:
 *       type: string
 *       enum:
 *         - ACTION
 *         - ADVENTURE
 *         - AVANT_GARDE
 *         - AWARD_WINNING
 *         - COMEDY
 *         - DRAMA
 *         - FANTASY
 *         - GOURMET
 *         - HORROR
 *         - MYSTERY
 *         - ROMANCE
 *         - SCI_FI
 *         - SLICE_OF_LIFE
 *         - SPORTS
 *         - SUPERNATURAL
 *         - SUSPENSE
 *       description: Predefined genre types for shows.
 */
export enum GenreType {
  ACTION,
  ADVENTURE,
  AVANT_GARDE,
  AWARD_WINNING,
  COMEDY,
  DRAMA,
  FANTASY,
  GOURMET,
  HORROR,
  MYSTERY,
  ROMANCE,
  SCI_FI,
  SLICE_OF_LIFE,
  SPORTS,
  SUPERNATURAL,
  SUSPENSE
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the genre.
 *         name:
 *           type: string
 *           description: Name of the genre.
 *       required:
 *         - id
 *         - name
 */
@Entity()
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @ManyToMany(() => Show, show => show.genres)
  shows: Show[];

  setId(id: number): Genre {
    this.id = id;
    return this;
  }

  setName(name: string): Genre {
    this.name = name;
    return this;
  }
}