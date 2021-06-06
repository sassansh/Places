import mongoose from "mongoose";
import logger from "./tools/logger.js";
import dotenv from "dotenv";

dotenv.config();

const connection = process.env.PLACES_DB_URI;

logger.info(`Trying to connect to MongoDB Atlas (cloud)`);
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => logger.info("Database Connected Successfully"))
  .catch((err) => console.log(err));
