import Category from "../models/Category.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { name, name_singular, emoji } = req.body;
  const newCategory = new Category ({
    category_id: uuidv4(),
    name: name,
    name_singular: name_singular,
    emoji: emoji,
  });
  newCategory
    .save()
    .then(() =>
      res.json({
        message: "Created category successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating category"
      })
    );
});

export default router;
