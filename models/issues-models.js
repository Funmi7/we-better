const mongoose = require("mongoose");
const issueSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Issues", issueSchema);