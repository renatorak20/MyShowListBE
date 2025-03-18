import express from 'express';
import {DataSource} from "typeorm";
import {config} from "./config";

const app = express();
const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: 'root',
  password: 'root',
  database: 'my_show_list',
  entities: [],
  synchronize: true,
  logging: true
});
const main = async () => {
  try {
    await AppDataSource.initialize();

    console.log('Connected to database');

    app.use(express.urlencoded({extended: true}));
    app.use(express.json);
    app.use(express.static(__dirname + '/public'));

    //todo: remove this
    app.use(function (_req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
      next();
    });

    app.listen(config.port);

    console.log('Running on port ' + config.port);
  } catch (e) {
    throw new Error('Unable to start');
  }
}

main();