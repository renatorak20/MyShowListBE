import {Repository} from "typeorm";
import {Comment} from "../entities/Comment";
import {Router} from "express";


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieves a list of comments for the authenticated user
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../entities/Comment.ts#/components/schemas/Comment'
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
 *     tags: [Comments]
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
 * /comments/{id}:
 *   put:
 *     summary: Updates an existing comment by ID
 *     tags: [Comments]
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
 *     tags: [Comments]
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

export const myCommentRoute = (commentRepo: Repository<Comment>) => {
  const router = Router();

  router.route('/comments').get(async (req: any, res) => {
    try {
      const comment = await commentRepo.find({where: {userId: req.decoded.user.id}, relations: {show: true}});
      res.status(200).json(comment);
    } catch (e) {
      res.status(500).json({message: 'Error fetching comments, ' + e.message});
    }
  }).post(async (req: any, res) => {
    try {
      const comment = new Comment()
        .setUserId(req.decoded.user.id)
        .setShowId(req.body.showId)
        .setText(req.body.text);

      await commentRepo.save(comment);
      res.status(201).json(comment);
    } catch (e) {
      res.status(400).json({message: 'Error adding comment, ' + e.message});
    }
  }).put(async (req: any, res) => {
    try {
      if(!req.body.id) {
        res.status(400).json({message: 'Comment id not provided'});
        return;
      }

      const comment = await commentRepo.findOne({where: {id: req.body.id, userId: req.decoded.user.id}});

      if (!comment) {
        res.status(404).json({message: 'Comment not found'});
        return;
      }

      comment.setText(req.body.text);

      await commentRepo.save(comment);
      res.status(200).json(comment);
    } catch (e) {
      res.status(400).json({message: 'Error updating comment, ' + e.message});
    }
  });

  router.delete('/comments/:id', async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const comment = await commentRepo.findOne({where: {id: id, userId: req.decoded.user.id}});

      if (!comment) {
        res.status(404).json({message: 'Comment not found'});
        return;
      }

      await commentRepo.remove(comment);
      res.status(200).json({message: 'Comment deleted'});
    } catch (e) {
      res.status(400).json({message: 'Error deleting comment, ' + e.message});
    }
  });

  return router;
}