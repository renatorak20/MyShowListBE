import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Router} from "express";
import bcryptjs from "bcryptjs";

export const userRoute = (userRepo: Repository<User>) => {
  const router = Router();

  router.route('/users').post(async (req, res) => {
    try {
      const {username, email, password} = req.body;
      if (!username || !email || !password) {
        res.status(400).json({message: 'Invalid request'});
        return;
      }

      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = new User()
        .setUsername(username)
        .setEmail(email)
        .setPassword(hash)
        .setSalt(salt);

      await userRepo.save(user);
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({message: 'Error creating user, ' + e.message});
    }
  }).get(async (_req, res) => {
    try {
      const users = await userRepo.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json({message: 'Error fetching users, ' + e.message});
    }
  });

  return router;
}