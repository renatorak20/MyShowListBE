import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Router} from "express";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config";

export const authRoute = (userRepo: Repository<User>) => {
  const router = Router();

  router.post('/auth', async (req, res) => {
    try {
      const user = await userRepo.findOne({where: {username: req.body.username}});

      if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
      }

      const validPass = bcryptjs.compareSync(req.body.password, user.password);

      if (!validPass) {
        res.status(401).send({
          message: 'Wrong credentials'
        });
        return;
      }

      const token = jsonwebtoken.sign({
        user: user
      }, config.secret, {
        expiresIn: 1440
      });

      res.json({
        token: token, user: user
      });
    } catch (e) {
      res.status(500).json({message: 'Error authenticating user, ' + e.message});
    }
  });

  return router;
}