import User from "../models/User.js";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
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
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  });
});

router.post("/register", (req, res) => {
  const { name, email, password, avatarURL } = req.body;
  const newUser = new User({
    user_id: uuidv4(),
    name: name,
    email: email,
    password: password,
    avatarURL: avatarURL,
    groups: ["1", "2"],
  });
  newUser
    .save()
    .then(() =>
      res.json({
        message: "Created user successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating user",
      })
    );
});

export default router;
