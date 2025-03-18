import express, {Router} from 'express';
import {DataSource, Repository} from "typeorm";
import {config} from "./config";
import {User} from "./app/entities/User";
import {Show} from "./app/entities/Show";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {UserShow} from "./app/entities/UserShow";
import {Genre, GenreType} from "./app/entities/Genre";
import {Comment} from "./app/entities/Comment";
import showRoute from "./app/routes/showRoute";

const app = express();
const dataSource = new DataSource({
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: 'root',
  password: 'root',
  database: 'my_show_list',
  entities: [User, Show, UserShow, Genre, Comment],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  logging: false,
});

const main = async () => {
  try {
    await dataSource.initialize();

    console.log('Connected to database');

    await initDb(dataSource.getRepository(Genre));

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(express.static(__dirname + '/public'));

    //todo: remove this
    app.use(function (_req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
      next();
    });

    const router = express.Router();

    router.use(showRoute(dataSource.getRepository(Show)))

    app.use('/api', router);

    app.get('*', function (req, res) {
      console.log('Request received');
      res.status(404).json({message: 'Not found'});
    });

    app.listen(config.port);

    console.log('Running on port ' + config.port);
  } catch (e) {
    throw new Error('Unable to start, ' + e.message);
  }
}

const initDb = async (genresRepo: Repository<Genre>) => {
  console.log('Initializing database...');

  const dbGenres = await genresRepo.find();
  const genres = (Object.values(GenreType)
    .filter(Number.isInteger) as number[])
    .map(id => new Genre().setId(id).setName(GenreType[id]));

  const areAllGenresPresent = genres.every(genre =>
    dbGenres.some(dbGenre => dbGenre.id === genre.id && dbGenre.name === genre.name)
  );

  if (!areAllGenresPresent) {
    console.log('Genres are not present, inserting...');
    await genresRepo.clear();
    await genresRepo.save(genres);
  }

  console.log('Database initialized');
};

main();