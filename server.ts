import express from 'express';
import {DataSource, Repository} from "typeorm";
import {config} from "./config";
import {User} from "./app/entities/User";
import {Show} from "./app/entities/Show";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {UserShow} from "./app/entities/UserShow";
import {Genre, GenreType} from "./app/entities/Genre";
import {Comment} from "./app/entities/Comment";
import showRoute from "./app/routes/showRoute";
import {userRoute} from "./app/routes/userRoute";
import {authRoute} from "./app/routes/authRoute";
import {meRoute} from "./app/routes/meRoute";
import {genreRoute} from "./app/routes/genreRoute";
import jsonwebtoken from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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

    const swaggerSpec = swaggerJsdoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "My API Documentation",
          version: "1.0.0",
          description: "API documentation for authentication endpoints"
        }
      },
      apis: ["./app/routes/*.ts", "./app/entities/*.ts"]
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(express.static(__dirname + '/public'));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //todo: remove this
    app.use(function (_req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

      if (_req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    const router = express.Router();

    router.use(authRoute(dataSource.getRepository(User)));
    router.use(userRoute(dataSource.getRepository(User)));
    router.use(authMiddleware);
    router.use(meRoute(dataSource.getRepository(UserShow), dataSource.getRepository(Comment)));
    router.use(genreRoute(dataSource.getRepository(Genre)));
    router.use(showRoute(dataSource.getRepository(Show)));


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

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(403).send({
      message: 'No token'
    });
    return;
  }

  jsonwebtoken.verify(token, config.secret, (e: any, decoded: any) => {
    if (e) {
      res.status(403).send({
        message: 'Wrong token'
      });
      return;
    }

    req.decoded = decoded;
    next();
  });
}

main();