import express from "express"
import cors from "cors"
import places from "./api/places.js"

// inspired by: https://www.youtube.com/watch?v=mrHNSanmqQ4&t=0s

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/places", places)
app.use("*", (req, res) => res.status(404).json({ error: "API endpoint not found"}))

export default app