import Category from '../models/Category.js';
import authenticateToken from '../util/AuthToken.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const group_id = req.query.group_id;
  Category.find({ group_id })
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, (req, res) => {
  const { name, name_singular, emoji, custom_criteria, group_id } = req.body;
  const newCategory = new Category({
    category_id: uuidv4(),
    name: name,
    name_singular: name_singular,
    emoji: emoji,
    custom_criteria: custom_criteria,
    group_id: group_id,
  });
  newCategory
    .save()
    .then(() =>
      res.json({
        message: 'Created category successfully',
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating category',
      })
    );
});

export default router;
