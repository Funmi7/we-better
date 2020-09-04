const express = require("express");
const router = express.Router();
const Issues = require("../models/issues-models");
const restriction = require("../auth/auth-middleware");

router.get("/", restriction, async (req, res) => {
  try {
    const issues = await Issues.find();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({
      error: `${err.message}`,
    });
  }
});

router.post("/", restriction, async (req, res) => {
  const issue = new Issues(req.body);
  try {
    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(500).json({
      error: `Cannot create a new user ${err.message}`,
    });
  }
});

router.get("/:id", restriction, async (req, res) => {
  try {
    const issue = await Issues.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "No issue found" });
    }
    return res.status(200).json(issue);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", restriction, async (req, res) => {
  try {
    const issue = await Issues.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(201).json(issue);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", restriction, async (req, res) => {
  try {
    const issue = await Issues.findByIdAndRemove(req.params.id)
    return res.status(200).json({message: 'Issue has been deleted'})
  }
  catch(err) {
    res.status(500).json({ message: err.message})
  }
})
module.exports = router;
