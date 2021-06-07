import express from "express";
import logger from "../tools/logger.js";
import Place from "../models/Place.js";

const router = express.Router();

router.get("/", (req, res) => {
  Place.find()
    .then((places) => {
      res.json(places);
      logger.info("Retrieved all " + places.length + " places");
    })
    .catch((err) => logger.error(err));
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
      logger.info("Created new place: " + newPlace);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
        message: "Error creating account",
      });
      logger.error(err);
    });
});

export default router;
