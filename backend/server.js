import "./database.js";

import configPassport from "./config/passport.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import passport from "passport";
import path from "path";
import places from "./api/places.js";
import users from "./api/users.js";

// Server structure inspired by: https://www.youtube.com/watch?v=mrHNSanmqQ4&t=0s
// MERN Authentication inspired by: https://github.com/rishipr/mern-auth

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
configPassport(passport);

app.use("/api/places", places);
app.use("/api/users", users);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
