const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artGalleryPhotosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    artType: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    img: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("gallery", artGalleryPhotosSchema);
