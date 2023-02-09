const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryAdminUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("adminUser", galleryAdminUserSchema);
