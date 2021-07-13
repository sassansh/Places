import Group from "../models/Group.js";
import User from "../models/User.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
  const { name, description, avatarURL, user_id } = req.body;
  let group_id = uuidv4();
  const newGroup = new Group({
    group_id: group_id,
    name: name,
    description: description,
    avatarURL: avatarURL,
  });
  await Promise.all([
    newGroup.save().then(() => Group.find()),
    User.updateOne({ user_id: user_id }, { $push: { groups: group_id } }, ),
  ])
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
