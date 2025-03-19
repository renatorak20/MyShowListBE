import {Repository} from "typeorm";
import {UserShow} from "../entities/UserShow";
import {Router} from "express";

export const myShowRoute = (userShowRepo: Repository<UserShow>) => {
  const router = Router();

  router.route('/shows').get(async (req: any, res) => {
    try {
      const userShow = await userShowRepo.find({where: {userId: req.decoded.user.id}, relations: {show: true}});
      res.status(200).json(userShow);
    } catch (e) {
      res.status(500).json({message: 'Error fetching shows, ' + e.message});
    }
  }).post(async (req: any, res) => {
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
  }).put(async (req: any, res) => {
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
  }).delete(async (req: any, res) => {
    try {
      if (!req.body.showId) {
        res.status(400).json({message: 'Show id not provided'});
        return;
      }

      const userShow = await userShowRepo.findOne({where: {userId: req.decoded.user.id, showId: req.body.showId}});

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