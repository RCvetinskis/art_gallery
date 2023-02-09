const adminDb = require("../schemas/galleryAdminUser");
const bcrypt = require("bcrypt");
module.exports = {
  adminLogin: async (req, res) => {
    const { username, password } = req.body;
    const admin = await adminDb.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "User not found",
        error: true,
      });
    }

    const compare = await bcrypt.compare(password, admin.password);
    if (compare) {
      req.session.admin = admin;

      return res.json({
        message: "Successfully logged in",
        error: false,
        username,
      });
    } else {
      return res.status(401).json({
        message: "Wrong password",
        error: true,
      });
    }
  },

  adminSession: async (req, res) => {
    if (req.session.admin) {
      const { username } = req.session.admin;
      const adminUser = await adminDb.findOne({ username });
      return res.status(200).json({
        message: "User session is on",
        username: adminUser.username,
        error: false,
      });
    }
    return res.status(401).json({
      message: "No user in session",
      error: true,
    });
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Error logging out",
          error:true
        });
      }

      return res.status(200).json({
        message: "Successfully logged out",
        error:false
      });
    });
  },
};
