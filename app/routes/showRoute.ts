import {Repository} from "typeorm";
import {Show, ShowType} from "../entities/Show";
import {Router} from "express";

const showRoute = (showRepo: Repository<Show>) => {
  const router = Router();

  router.route('/shows').get(async (_req, res) => {
    try {
      const shows = (await showRepo.find({relations: {genres: true}}))
        .map(show => ({...show, type: ShowType[show.type]}));

      res.status(200).json(shows);
    } catch (e) {
      res.status(500).json({message: 'Error fetching shows, ' + e.message});
    }
  }).post(async (req, res) => {
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
  }).put(async (req, res) => {
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
  }).delete(async (req, res) => {
    try {
      await showRepo.remove(new Show().setId(req.body.id));
      res.status(200).json({message: 'Show deleted'});
    } catch (e) {
      res.status(400).json({message: 'Error deleting show, ' + e.message});
    }
  });

  router.route('/shows/:id').get(async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const show = await showRepo.findOne({where: {id: id}, relations: {genres: true}});

      if (!show) {
        res.status(404).json({message: 'Show not found'});
        return;
      }

      res.status(200).json(show);
    } catch (e) {
      res.status(400).json({message: 'Error fetching show, ' + e.message});
    }
  });

  return router;
}

export default showRoute;