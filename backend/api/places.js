import Place from "../models/Place.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  Place.find()
    .then((places) => {
      res.json(places);
      console.log("Retrieved all " + places.length + " places");
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { name, type, imgURL } = req.body;
  const newPlace = new Place({
    name: name,
    type: type,
    imgURL: imgURL,
  });
  newPlace
    .save()
    .then(() => {
      res.json({
        message: "Created place successfully",
      });
      console.log("Created new place: " + newPlace);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
        message: "Error creating account",
      });
      console.log(err);
    });
});

export default router;
