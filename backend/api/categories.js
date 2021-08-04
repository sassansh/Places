import Category from '../models/Category.js';
import User from '../models/User.js';
import authenticateToken from '../util/AuthToken.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const groupID = req.query.group_id;
  const userID = req.user.user_id;

  if (groupID && groupID.length >= 1) {
    Category.find(
      { group_id: groupID },
      '-_id category_id name name_singular emoji group_id custom_criteria'
    )
      .then((categories) => res.json(categories))
      .catch((err) => console.log(err));
  } else {
    User.findOne({ user_id: userID }).then((user) => {
      const searchQuery = [];
      for (const group of user.groups) {
        searchQuery.push({ groupID: group });
      }
      Category.find(
        { $or: searchQuery },
        '-_id category_id name name_singular emoji group_id custom_criteria'
      )
        .then((categories) => res.json(categories))
        .catch((err) => console.log(err));
    });
  }
});

router.post('/', authenticateToken, (req, res) => {
  const name = req.body.name;
  const nameSingular = req.body.name_singular;
  const emoji = req.body.emoji;
  const customCriteria = req.body.custom_criteria;
  const groupID = req.body.group_id;

  const newCategory = new Category({
    category_id: uuidv4(),
    name: name,
    name_singular: nameSingular,
    emoji: emoji,
    custom_criteria: customCriteria,
    group_id: groupID
  });
  newCategory
    .save()
    .then(() =>
      res.json({
        message: 'Created category successfully'
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating category'
      })
    );
});

export default router;
