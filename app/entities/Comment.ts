import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Show} from "./Show";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  showId: number;

  @Column({type: 'text'})
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Show, show => show.comments)
  show: Show;


  setId(id: number): Comment {
    this.id = id;
    return this;
  }

  setUserId(userId: number): Comment {
    this.userId = userId;
    return this;
  }

  setShowId(showId: number): Comment {
    this.showId = showId;
    return this;
  }

  setText(text: string): Comment {
    this.text = text;
    return this;
  }
}