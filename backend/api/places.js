import Place from '../models/Place.js';
import authenticateToken from '../util/AuthToken.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', authenticateToken, (req, res) => {
  Place.find({}, '-_id place_id name address group_id category_id ImageURL')
    .then((places) => res.json(places))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, address, group_id, category_id } = req.body;
  const profilePicPath = Object.values(req.files)[0].path;
  const cloudinaryResponse = await cloudinary.uploader.upload(profilePicPath);
  const imageURL = cloudinaryResponse.secure_url;

  const newPlace = new Place({
    place_id: uuidv4(),
    name: name,
    address: address,
    group_id: group_id,
    category_id: category_id,
    ImageURL: imageURL
  });

  newPlace
    .save()
    .then((place) => res.json(place))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating place'
      })
    );
});

export default router;
