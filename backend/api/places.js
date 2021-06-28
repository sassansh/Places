import Place from "../models/Place.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  Place.find()
    .then((places) => res.json(places))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
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
    .then(() =>
      res.json({
        message: "Created place successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating place",
      })
    );
});

export default router;
