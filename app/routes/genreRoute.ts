import {Repository} from "typeorm";
import {Genre} from "../entities/Genre";
import {Router} from "express";

export const genreRoute = (genreRepo: Repository<Genre>) => {
  const router = Router();

  router.get('/genres', async (_req, res) => {
    try {
      const genres = await genreRepo.find();
      res.status(200).json(genres);
    } catch (e) {
      res.status(500).json({message: 'Error fetching genres, ' + e.message});
    }
  });

  return router;
}