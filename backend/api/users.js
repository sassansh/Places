import User from "../models/User.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  // Search the MongoDB
  User.find({}, "-_id user_id email name avatarURL groups")
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

export default router;
