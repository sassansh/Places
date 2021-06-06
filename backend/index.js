import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./tools/logger.js"
// import place from "./models/place.js";

dotenv.config();

const port = process.env.PORT || 8000;

logger.info(`Trying to connect to MongoDB Atlas (cloud)`)
mongoose
  .connect(process.env.PLACES_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info("Database Connected Successfully");
    app.listen(port, () => logger.info(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
