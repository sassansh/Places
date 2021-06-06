const express = require("express");
const cors = require("cors");
const logger = require("./tools/logger");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
