import Group from '../models/Group.js';
import User from '../models/User.js';
import authenticateToken from '../util/AuthToken.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', authenticateToken, (req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  const user_id = req.user.user_id;
  let group_id = uuidv4();
  const path = Object.values(req.files)[0].path;

  const avatarURL = await cloudinary.uploader.upload(path);
  const newGroup = new Group({
    group_id: group_id,
    name: name,
    description: description,
    avatarURL: avatarURL.secure_url,
  });
  await Promise.all([
    newGroup.save().then(() => Group.find()),
    User.updateOne({ user_id: user_id }, { $push: { groups: group_id } }),
  ])
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
