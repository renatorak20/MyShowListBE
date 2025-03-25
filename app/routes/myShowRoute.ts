import {Repository} from "typeorm";
import {UserShow} from "../entities/UserShow";
import {Router} from "express";
import {ShowType} from "../entities/Show";

/**
 * @swagger
 * /user-shows:
 *   get:
 *     summary: Retrieves a list of shows for the authenticated user
 *     tags: [User Shows]
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
 *                 userId: 123
 *                 showId: 456
 *                 text: "Great show!"
 *                 createdAt: "2024-03-20T12:00:00Z"
 *                 updatedAt: "2024-03-20T12:00:00Z"
 *       500:
 *         description: Error fetching comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching comments, <error details>"
 *   post:
 *     summary: Creates a new comment for the authenticated user
 *     tags: [User Shows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../entities/Comment.ts#/components/schemas/Comment'
 *           example:
 *             showId: 456
 *             text: "Amazing episode!"
 *     responses:
 *       201:
 *         description: Successfully created the comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Comment.ts#/components/schemas/Comment'
 *             example:
 *               id: 2
 *               userId: 123
 *               showId: 456
 *               text: "Amazing episode!"
 *               createdAt: "2024-03-20T12:00:00Z"
 *               updatedAt: "2024-03-20T12:00:00Z"
 *       400:
 *         description: Invalid request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding comment, <error details>"
 * /user-shows/{id}:
 *   put:
 *     summary: Updates an existing comment by ID
 *     tags: [User Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../entities/Comment.ts#/components/schemas/Comment'
 *           example:
 *             text: "Updated comment text!"
 *     responses:
 *       200:
 *         description: Successfully updated the comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Comment.ts#/components/schemas/Comment'
 *             example:
 *               id: 2
 *               userId: 123
 *               showId: 456
 *               text: "Updated comment text!"
 *               createdAt: "2024-03-20T12:00:00Z"
 *               updatedAt: "2024-03-20T12:00:00Z"
 *       400:
 *         description: Comment ID not provided or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment id not provided"
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment not found"
 *       500:
 *         description: Server error while updating the comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating comment, <error details>"
 *   delete:
 *     summary: Deletes a comment by ID
 *     tags: [User Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment deleted"
 *       400:
 *         description: Error deleting comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting comment, <error details>"
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment not found"
 */

export const myShowRoute = (userShowRepo: Repository<UserShow>) => {
  const router = Router();

  router.route('/shows')
  
  .get(async (req: any, res) => {
    try {
      const userShow = (await userShowRepo.find({where: {userId: req.decoded.user.id}, relations: {show: true}}))
        .map(userShow => ({...userShow, show: {...userShow.show, type: ShowType[userShow.show.type]}}));
      res.status(200).json(userShow);
    } catch (e) {
      res.status(500).json({message: 'Error fetching shows, ' + e.message});
    }
  })
  
  .post(async (req: any, res) => {
    try {
      if (!req.body.showId) {
        res.status(400).json({message: 'Show id not provided'});
        return;
      }

      if (await userShowRepo.findOne({where: {userId: req.decoded.user.id, showId: req.body.showId}})) {
        res.status(400).json({message: 'Show already added to your list'});
        return;
      }

      const userShow = new UserShow()
        .setUserId(req.decoded.user.id)
        .setShowId(req.body.showId)
        .setScore(req.body.score)
        .setProgress(req.body.progress)
        .setStatus(req.body.status)


      await userShowRepo.save(userShow);
      res.status(201).json(userShow);
    } catch (e) {
      res.status(400).json({message: 'Error adding show to your list, ' + e.message});
    }
  })
  
  .put(async (req: any, res) => {
    try {
      if(!req.body.showId) {
        res.status(400).json({message: 'Show id not provided'});
        return;
      }

      const userShow = await userShowRepo.findOne({where: {userId: req.decoded.user.id, showId: req.body.showId}});

      if (!userShow) {
        res.status(404).json({message: 'Show not found'});
        return;
      }

      userShow
        .setScore(req.body.score)
        .setProgress(req.body.progress)
        .setStatus(req.body.status);

      await userShowRepo.save(userShow);
      res.status(200).json(userShow);
    } catch (e) {
      res.status(400).json({message: 'Error updating show on your list, ' + e.message});
    }
  });

  router.delete('/shows/:id', async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userShow = await userShowRepo.findOne({where: {id, userId: req.decoded.user.id}});

      if (!userShow) {
        res.status(404).json({message: 'Show not found'});
        return;
      }

      await userShowRepo.remove(userShow);
      res.status(200).json({message: 'Show removed from list'});
    } catch (e) {
      res.status(400).json({message: 'Error removing show from your list, ' + e.message});
    }
  });

  return router;
}