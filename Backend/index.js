const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const http = require("http");
const { routeConfig } = require("./routes");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection Successfully ✌");
  })
  .catch((e) => {
    console.log(e);
    console.log("No connection 🥵");
  });
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

routeConfig(app);

server.listen(port, () => console.log(`Server listening on port ${port}.`));
