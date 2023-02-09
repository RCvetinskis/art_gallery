const photosDb = require("../schemas/artGalleryPhotosSchema");
const fs = require("fs");

module.exports = {
  photos: async (req, res) => {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await photosDb.countDocuments({});
    const photos = await photosDb
      .find()
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    if (photos) {
      return res.status(200).json({
        message: "All photos are sent",
        photos,
        error: false,
        totalPages: Math.ceil(total / PAGE_SIZE),
      });
    } else {
      return res.status(401).json({
        message: "Can't receive photos",
        error: true,
      });
    }
  },
  postPhoto: async (req, res) => {
    const { title, category, description, artType } = req.body;

    const categoryArray = category.split(",");
    const artTypeArray = artType.split(",");
    const image = new photosDb({
      img: {
        data: fs.readFileSync("./public/uploads/" + req.file.filename),
        contentType: "image/png",
      },
      title,
      category: categoryArray,
      artType: artTypeArray,
      description,
    });
    image.save();
    if (image) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        image,
        error: false,
      });
    } else {
      return res.status(500).json({
        message: "Image is not uploaded",
        error: true,
      });
    }
  },
};
