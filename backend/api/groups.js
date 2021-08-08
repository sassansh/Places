import Category from '../models/Category.js';
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
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', authenticateToken, (req, res) => {
  Group.find({}, '-_id group_id name description avatarURL')
    .then((groups) => res.json(groups))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, description, defaultCategories } = req.body;
  const user_id = req.user.user_id;
  const group_id = uuidv4();

  let avatarURL;
  const groupLogoSubmitted = Object.keys(req.files).length > 0;

  if (groupLogoSubmitted) {
    const groupLogoPath = Object.values(req.files)[0].path;
    const cloudinaryResponse = await cloudinary.uploader.upload(groupLogoPath);
    avatarURL = cloudinaryResponse.secure_url;
  } else {
    res.status(400).json({
      message: 'Group logo missing!'
    });
  }

  const newGroup = new Group({
    group_id: group_id,
    name: name,
    description: description,
    avatarURL: avatarURL
  });
  if (defaultCategories.includes('beaches')) {
    const beachesCategory = new Category({
      category_id: uuidv4(),
      name: 'Beaches',
      name_singular: 'Beach',
      emoji: '🏖️',
      custom_criteria: [],
      group_id: group_id
    });
    await beachesCategory.save();
  }
  if (defaultCategories.includes('restaurants')) {
    const restaurantsCategory = new Category({
      category_id: uuidv4(),
      name: 'Restaurants',
      name_singular: 'Restaurant',
      emoji: '🍔',
      custom_criteria: [],
      group_id: group_id
    });
    await restaurantsCategory.save();
  }
  if (defaultCategories.includes('nightclubs')) {
    const nightclubsCategory = new Category({
      category_id: uuidv4(),
      name: 'Nightclubs',
      name_singular: 'Nightclub',
      emoji: '🎶',
      custom_criteria: [],
      group_id: group_id
    });
    await nightclubsCategory.save();
  }
  if (defaultCategories.includes('parks')) {
    const parksCategory = new Category({
      category_id: uuidv4(),
      name: 'Parks',
      name_singular: 'Park',
      emoji: '🏞️',
      custom_criteria: [],
      group_id: group_id
    });
    await parksCategory.save();
  }
  if (defaultCategories.includes('breweries')) {
    const breweriesCategory = new Category({
      category_id: uuidv4(),
      name: 'Breweries',
      name_singular: 'Brewery',
      emoji: '🍻',
      custom_criteria: [],
      group_id: group_id
    });
    await breweriesCategory.save();
  }
  await Promise.all([
    newGroup.save().then(() => Group.find()),
    User.updateOne({ user_id: user_id }, { $push: { groups: group_id } })
  ])
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
