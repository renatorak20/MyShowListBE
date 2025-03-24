import {Repository} from "typeorm";
import {Genre} from "../entities/Genre";
import {Router} from "express";

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Retrieves a list of genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: ACTION
 *               example:
 *                 - id: 1
 *                   name: ACTION
 *       500:
 *         description: Server error while fetching genres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching genres, <error details>"
 */

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