const express = require("express");
const router = express.Router();
const upload = require("../middleware/mutler");
const { photos, postPhoto } = require("../controllers/photosController");
const {
  adminLogin,
  adminSession,
  logout,
} = require("../controllers/adminController");

router.get("/photos", photos);
router.post("/post-image", upload.single("image"), postPhoto);
router.post("/admin-login", adminLogin);
router.get("/admin-session", adminSession);
router.get("/admin-logout", logout);
module.exports = router;
