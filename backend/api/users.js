import Group from "../models/Group.js";
import User from "../models/User.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  // Search the MongoDB
  User.find({}, "-_id user_id email name avatarURL groups requestGroups")
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "") {
    return res.status(400).send("Email field must be filled");
  }

  if (password === "") {
    return res.status(400).send("Password field must be filled");
  }

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(400).send("Email not found");
    }
    // Check password
    const isMatch = user.password === password;

    if (isMatch) {
      res.json({
        success: true,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          avatarURL: user.avatarURL,
          groups: user.groups,
        },
      });
    } else {
      return res.status(400).send("Password incorrect");
    }
  });
});

router.post("/register", (req, res) => {
  const { name, email, password, password2, avatarURL } = req.body;

  if (name === "") {
    return res.status(400).send("Name field must be filled");
  }

  if (email === "") {
    return res.status(400).send("Email field must be filled");
  }

  if (password === "") {
    return res.status(400).send("Password field must be filled");
  }

  if (password2 === "") {
    return res.status(400).send("Please confirm password");
  }

  if (avatarURL === "") {
    return res.status(400).send("Avatar URL field must be filled");
  }

  if (password !== password2) {
    return res.status(400).send("Password fields do not match");
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).send("Email already exists");
    } else {
      const newUser = new User({
        user_id: uuidv4(),
        name: name,
        email: email,
        password: password,
        avatarURL: avatarURL,
        groups: [],
        requestGroups: [],
      });

      newUser
        .save()
        .then(() => res.send("User created successfully"))
        .catch((err) =>
          res.status(400).json({
            error: err,
            message: "Error creating user",
          })
        );
    }
  });
});

router.post("/group/request", (req, res) => {
  const { user_id, group_id } = req.body;
  // Find group to join
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send("Group requested to join not found");
    }

    // Check if user is not already in the group or request to join before
    User.findOne({ user_id }).then((user) => {
      if (user.groups.includes(group_id)) {
        return res.status(400).send("Already a member of this group");
      }

      if (user.requestGroups.includes(group_id)) {
        return res.status(400).send("Already requested to join this group");
      }
    });

    // Add group ID to user's requestGroups
    User.updateOne({ user_id }, { $push: { requestGroups: group_id } })
      .then((user) => res.json({ success: true }))
      .catch((err) => console.log(err));
  });
});

router.post("/group/accept", (req, res) => {
  const { my_user_id, other_user_id, group_id } = req.body;

  // Find group
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send("Group does not exist");
    }
  });

  // Check if current user is part of group
  User.findOne({ user_id: my_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send("Cannot verify current user");
    }

    if (!user.groups.includes(group_id)) {
      return res
        .status(400)
        .send(
          "Not authorized to accept users into a group you are not a member of"
        );
    }
  });

  // Check if other user exists and has requested to join group
  User.findOne({ user_id: other_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send("Cannot find other user");
    }

    // Check if other user is already a member of this group
    if (user.groups.includes(group_id)) {
      return res.status(400).send("Other user is already part of this group");
    }

    if (user.requestGroups.includes(group_id)) {
      // Remove group ID from other user's requestGroup
      User.updateOne(
        { user_id: other_user_id },
        { $pullAll: { requestGroups: [group_id] } }
      )
        .then(() => {
          //Add group ID to user's groups
          User.updateOne(
            { user_id: other_user_id },
            { $push: { groups: group_id } }
          )
            .then((user) => res.json({ success: true }))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      return res
        .status(400)
        .send("Other user has not requested to join this group");
    }
  });
});

router.post("/group/decline", (req, res) => {
  const { my_user_id, other_user_id, group_id } = req.body;

  // Find group
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send("Group does not exist");
    }
  });

  // Check if current user is part of group
  User.findOne({ user_id: my_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send("Cannot verify current user");
    }

    if (!user.groups.includes(group_id)) {
      return res
        .status(400)
        .send(
          "Not authorized to accept users into a group you are not a member of"
        );
    }
  });

  // Check if other user exists and has requested to join group
  User.findOne({ user_id: other_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send("Cannot find other user");
    }

    // Check if other user is already a member of this group
    if (user.groups.includes(group_id)) {
      return res.status(400).send("Other user is already part of this group");
    }

    if (user.requestGroups.includes(group_id)) {
      // Remove group ID from other user's requestGroup
      User.updateOne(
        { user_id: other_user_id },
        { $pullAll: { requestGroups: [group_id] } }
      )
        .then(() => res.json({ success: true }))
        .catch((err) => console.log(err));
    } else {
      return res
        .status(400)
        .send("Other user has not requested to join this group");
    }
  });
});

export default router;
