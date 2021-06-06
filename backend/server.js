import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import places from "./api/places.js"
import logger from "./tools/logger.js"
import path from "path"
import "./database.js"

// inspired by: https://www.youtube.com/watch?v=mrHNSanmqQ4&t=0s

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/places", places)
app.use("*", (req, res) => res.status(404).json({ error: "API endpoint not found"}))

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Server is running on port ${port}`));

