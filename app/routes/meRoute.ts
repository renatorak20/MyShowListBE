import {Router} from "express";
import {myShowRoute} from "./myShowRoute";
import {Repository} from "typeorm";
import {UserShow} from "../entities/UserShow";
import {myCommentRoute} from "./myCommentRoute";
import {Comment} from "../entities/Comment";

export const meRoute = (userShowRepo: Repository<UserShow>, commentRepo: Repository<Comment>) => {
  const router = Router();

  router.get('/me', function (req: any, res) {
    res.status(200).json(req.decoded);
  });

  router.use('/me', myShowRoute(userShowRepo));
  router.use('/me', myCommentRoute(commentRepo));

  return router;
}