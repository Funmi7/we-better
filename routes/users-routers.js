const express = require("express");
const router = express.Router();
const Users = require("../models/users-models");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: `${err.message}`,
    });
  }
});

router.post("/", async (req, res) => {
  const user = new Users(req.body);
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({
      error: `Cannot create a new user ${err.message}`,
    });
  }
});

module.exports = router;
