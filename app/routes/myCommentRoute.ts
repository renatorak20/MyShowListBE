import {Repository} from "typeorm";
import {Comment} from "../entities/Comment";
import {Router} from "express";

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