import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import {Show} from "./Show";

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