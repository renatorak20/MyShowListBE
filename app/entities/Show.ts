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
  
  export enum ShowType {
    TV_SERIES,
    MOVIE,
  }
  
  @Entity()
  export class Show {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    title: string;
  
    @Column({type: 'text', nullable: true})
    description: string;
  
    @Column({type: 'enum', enum: ShowType, nullable: true})
    type: ShowType;
  
    @Column({type: 'int', nullable: true})
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