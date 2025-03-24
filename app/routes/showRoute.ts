import {Repository} from "typeorm";
import {Show, ShowType} from "../entities/Show";
import {Router} from "express";

/**
 * @swagger
 * /shows:
 *   get:
 *     summary: Retrieves a list of all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../entities/Show.ts#/components/schemas/Show'
 *             example:
 *               - id: 1
 *                 title: "Breaking Bad"
 *                 description: "A high school chemistry teacher turned methamphetamine producer."
 *                 type: "TV_SERIES"
 *                 episodes: 62
 *                 startDate: "2008-01-20"
 *                 endDate: "2013-09-29"
 *                 createdAt: "2024-03-20T12:00:00Z"
 *                 updatedAt: "2024-03-20T12:00:00Z"
 *               - id: 2
 *                 title: "The Dark Knight"
 *                 description: "Batman must face the Joker in a one-on-one fight."
 *                 type: "MOVIE"
 *                 episodes: 1
 *                 startDate: "2008-07-18"
 *                 endDate: null
 *                 createdAt: "2024-03-20T12:00:00Z"
 *                 updatedAt: "2024-03-20T12:00:00Z"
 *       500:
 *         description: Server error while fetching shows
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching shows, <error details>"
 * /shows/{id}:
 *   get:
 *     summary: Retrieves a specific show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the show to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Show.ts#/components/schemas/Show'
 *             example:
 *               id: 1
 *               title: "Breaking Bad"
 *               description: "A high school chemistry teacher turned methamphetamine producer."
 *               type: "TV_SERIES"
 *               episodes: 62
 *               startDate: "2008-01-20"
 *               endDate: "2013-09-29"
 *               createdAt: "2024-03-20T12:00:00Z"
 *               updatedAt: "2024-03-20T12:00:00Z"
 *       400:
 *         description: Server error while fetching show
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching show, <error details>"
 *       404:
 *         description: Show not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Show not found"
 *       500:
 *        description: Server error while creating show
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Internal server error"
 *   post:
 *     summary: Creates a new show
 *     tags: [Shows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../entities/Show.ts#/components/schemas/Show'
 *           example:
 *             title: "Stranger Things"
 *             description: "A group of kids uncover a dark secret in their small town."
 *             type: "TV_SERIES"
 *             episodes: 25
 *             startDate: "2016-07-15"
 *             endDate: null
 *             genres: [ACTION, ADVENTURE]	
 *     responses:
 *       201:
 *         description: Successfully created the show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Show.ts#/components/schemas/Show'
 *             example:
 *               id: 3
 *               title: "Stranger Things"
 *               description: "A group of kids uncover a dark secret in their small town."
 *               type: "TV_SERIES"
 *               episodes: 25
 *               startDate: "2016-07-15"
 *               endDate: null
 *               createdAt: "2024-03-20T12:00:00Z"
 *               updatedAt: "2024-03-20T12:00:00Z"
 *               genres: [ACTION, ADVENTURE]	
 *       400:
 *         description: Invalid request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating show, <error details>"
 *       403:
 *         description: Permission denied, not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not an admin"
 *       500:
 *        description: Server error while creating show
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Internal server error"
 *   put:
 *     summary: Updates an existing show
 *     tags: [Shows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../entities/Show.ts#/components/schemas/Show'
 *           example:
 *             id: 3
 *             title: "Stranger Things Season 2"
 *             description: "The kids continue to uncover mysteries in Hawkins."
 *             type: "TV_SERIES"
 *             episodes: 9
 *             startDate: "2017-10-27"
 *             endDate: null
 *             genres: [ACTION, ADVENTURE]	
 *     responses:
 *       200:
 *         description: Successfully updated the show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Show.ts#/components/schemas/Show'
 *             example:
 *               id: 3
 *               title: "Stranger Things Season 2"
 *               description: "The kids continue to uncover mysteries in Hawkins."
 *               type: "TV_SERIES"
 *               episodes: 9
 *               startDate: "2017-10-27"
 *               endDate: null
 *               createdAt: "2024-03-20T12:00:00Z"
 *               updatedAt: "2024-03-20T12:00:00Z"
 *               genres: [ACTION, ADVENTURE]	
 *       400:
 *         description: Error updating show
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating show, <error details>"
 *       403:
 *         description: Permission denied, not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not an admin"
 *       404:
 *         description: Show not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Show not found"
 *       500:
 *        description: Server error while creating show
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Internal server error"
 *   delete:
 *     summary: Deletes a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the show to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the show
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Show deleted"
 *       400:
 *         description: Error deleting show
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting show, <error details>"
 *       403:
 *         description: Permission denied, not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not an admin"
 *       404:
 *         description: Show not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Show not found"
 */
const showRoute = (showRepo: Repository<Show>) => {
  const router = Router();

  router.get('/shows', async (_req, res) => {
    try {
      const shows = (await showRepo.find({relations: {genres: true}}))
        .map(show => ({...show, type: ShowType[show.type]}));

      res.status(200).json(shows);
    } catch (e) {
      res.status(500).json({message: 'Error fetching shows, ' + e.message});
    }
  });

  router.get('/shows/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const show = await showRepo.findOne({where: {id: id}, relations: {genres: true, comments: true}});

      if (!show) {
        res.status(404).json({message: 'Show not found'});
        return;
      }

      res.status(200).json({...show, type: ShowType[show.type]});
    } catch (e) {
      res.status(400).json({message: 'Error fetching show, ' + e.message});
    }
  });

  router.use((req: any, res, next) => {
      if (!req.decoded.user.isAdmin) {
        res.status(403).send({
          message: 'Not an admin'
        });
        return;
      }

      next();
    });

  router.route('/shows').post(async (req, res) => {
    try {
      const show = new Show()
        .setTitle(req.body.title)
        .setDescription(req.body.description)
        .setType(req.body.type)
        .setEpisodes(req.body.episodes)
        .setStartDate(req.body.startDate)
        .setEndDate(req.body.endDate)
        .setGenres(req.body.genres);

      await showRepo.save(show);
      res.status(201).json(show);
    } catch (e) {
      res.status(400).json({message: 'Error creating show, ' + e.message});
    }
  })
  
  .put(async (req, res) => {
    try {
      const show = await showRepo.findOne({where: {id: req.body.id}, relations: {genres: true}});

      if (!show) {
        res.status(404).json({message: 'Show not found'});
        return;
      }

      show.setTitle(req.body.title)
        .setDescription(req.body.description)
        .setType(req.body.type)
        .setEpisodes(req.body.episodes)
        .setStartDate(req.body.startDate)
        .setEndDate(req.body.endDate)
        .setGenres(req.body.genres);

      await showRepo.save(show);
      res.status(200).json(show);
    } catch (e) {
      res.status(400).json({message: 'Error updating show, ' + e.message});
    }
  })

  router.delete('/shows/:id', async (req, res) => {
    try {
      await showRepo.remove(new Show().setId(parseInt(req.params.id)));
      res.status(200).json({message: 'Show deleted'});
    } catch (e) {
      res.status(400).json({message: 'Error deleting show, ' + e.message});
    }
  });

  return router;
}

export default showRoute;