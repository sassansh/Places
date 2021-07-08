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

router.post("/", (req, res) => {
  const { name, description, avatarURL, user_id, userGroups } = req.body;
  let group_id = uuidv4();
  const newGroup = new Group({
    group_id: group_id,
    name: name,
    description: description,
    avatarURL: avatarURL,
  });
  newGroup
    .save()
    .then(() =>
      res.json({
        group_id: group_id,
        message: "Added group successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error adding group",
      })
    );
  userGroups.push(group_id);
  User.updateOne({user_id: user_id}, {groups: userGroups})
    .then((user) => res.json(user))
    .catch((err) => console.log(err));

  
});

export default router;
