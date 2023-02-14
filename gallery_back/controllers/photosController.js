const photosDb = require("../schemas/artGalleryPhotosSchema");
const fs = require("fs");

module.exports = {
  photos: async (req, res) => {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const search = req.query.search || "";
    const categoriesOptions = await photosDb.distinct("category");
    const artTypesOptions = await photosDb.distinct("artType");

    let category = req.query.category || "All";
    let artType = req.query.artType || "All";

    category === "All"
      ? (category = [...categoriesOptions])
      : (category = req.query.category.split(","));

    artType === "All"
      ? (artType = [...artTypesOptions])
      : (artType = req.query.artType.split(","));

    const total = await photosDb.countDocuments({});

    const photos = await photosDb
      .find({
        title: { $regex: search, $options: "i" },
      })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .where("category")
      .in([...category])
      .where("artType")
      .in([...artType]);

    if (photos) {
      return res.status(200).json({
        message: "Photos are sent",
        photos,
        error: false,
        totalPages: Math.ceil(total / PAGE_SIZE),
        categoriesOptions,
        artTypesOptions,
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
        filename: req.file.filename,
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
  editPhoto: async (req, res) => {
    const { id } = req.params;
    let updates = req.body;

    for (let key in updates) {
      if (!updates[key]) {
        delete updates[key];
      }
    }

    const updatedPhoto = await photosDb.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (updatedPhoto) {
      return res.status(200).json({
        message: "Photo updated",
        error: false,
        updatedPhoto,
      });
    } else {
      return res.status(400).json({
        message: "Error updating photo",
        error: true,
      });
    }
  },

  deleteImage: async (req, res) => {
    const { id } = req.params;
    const deletedPhoto = await photosDb.findByIdAndRemove(id);

    if (deletedPhoto) {
      const imagePath = `./public/uploads/${deletedPhoto.img.filename}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
      return res.status(200).json({
        message: `Photo ${deletedPhoto.title} was succsessfuly deleted`,
        error: false,
      });
    } else {
      return res.status(500).json({
        message: "Coudn't find photo to delete",
        error: true,
      });
    }
  },
};
