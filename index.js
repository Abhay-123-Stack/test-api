require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use("/api", require("./api"));

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Server listning on port ${process.env.PORT}`)
);
