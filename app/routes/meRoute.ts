import {Router} from "express";
import {myShowRoute} from "./myShowRoute";
import {Repository} from "typeorm";
import {UserShow} from "../entities/UserShow";

export const meRoute = (userShowRepo: Repository<UserShow>) => {
  const router = Router();

  router.get('/me', function (req: any, res) {
    res.status(200).json(req.decoded);
  });

  router.use('/me', myShowRoute(userShowRepo));

  return router;
}