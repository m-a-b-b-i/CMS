const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MosqueSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  mosqueName: {
    type: String,
    required: true,
  },
  fajr: String,
  zuhr: String,
  asr: String,
  magrib: String,
  isha: String,
  juma: String,
  lastModified: Date,
});

module.exports = mongoose.model("Mosque", MosqueSchema);
