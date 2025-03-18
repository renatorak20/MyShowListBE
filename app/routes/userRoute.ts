import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Router} from "express";

export const userRoute = (userRepo: Repository<User>) => {
  const router = Router();

  router.route('/users').get(async (_req, res) => {
    try {
      const users = await userRepo.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json({message: 'Error fetching users, ' + e.message});
    }
  });

  return router;
}