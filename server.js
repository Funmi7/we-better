const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const server = express();

const authRouter = require('./auth/auth-router');

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());

server.use('/auth', authRouter);

server.get("/", (req, res) => {
  res.status(200).json("Api is working");
});

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

module.exports = server;
