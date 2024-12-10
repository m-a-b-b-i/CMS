const mongoose = require("mongoose");
var uuidv4 = require("uuid").v4;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  mosqueName: {
    type: String,
    required: true,
  },
  mosqueAddress: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1000,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  newUser: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  refreshToken: [String],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
