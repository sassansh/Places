import Place from '../models/Place.js';
import authenticateToken from '../util/AuthToken.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  Place.find()
    .then((places) => res.json(places))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, (req, res) => {
  const { name, address, group_id, category_id, ImageURL } = req.body;
  const newPlace = new Place({
    place_id: uuidv4(),
    name: name,
    address: address,
    group_id: group_id,
    category_id: category_id,
    ImageURL: ImageURL,
  });
  newPlace
    .save()
    .then((place) => res.json(place))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating place',
      })
    );
});

export default router;
