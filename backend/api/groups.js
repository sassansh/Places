import Group from "../models/Group.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { name, description, avatarURL } = req.body;
  const newGroup = new Group({
    group_id: uuidv4(),
    name: name,
    description: description,
    avatarURL: avatarURL,
  });
  newGroup
    .save()
    .then(() =>
      res.json({
        message: "Added group successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error adding group",
      })
    );
});

export default router;
