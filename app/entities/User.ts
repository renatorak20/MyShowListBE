import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserShow} from "./UserShow";
import {Comment} from "./Comment";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the user
 *         username:
 *           type: string
 *           description: Unique username of the user
 *         email:
 *           type: string
 *           description: Unique email of the user
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           description: Indicates if the user has admin privileges
 *         password:
 *           type: string
 *           description: Hashed password of the user
 *         salt:
 *           type: string
 *           description: Salt used for password hashing
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 */

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column({default: false})
  isAdmin: boolean;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => UserShow, userShow => userShow.user)
  userShows: UserShow[];


  setUsername(username: string): User {
    this.username = username;
    return this;
  }

  setEmail(email: string): User {
    this.email = email;
    return this;
  }

  setIsAdmin(isAdmin: boolean): User {
    this.isAdmin = isAdmin;
    return this;
  }

  setPassword(password: string): User {
    this.password = password;
    return this;
  }

  setSalt(salt: string): User {
    this.salt = salt;
    return this;
  }
}