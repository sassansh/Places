import "./database.js";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import path from "path";
import places from "./api/places.js";
import users from "./api/users.js";

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/places", places);
app.use("/api/users", users);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
