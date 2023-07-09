const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const { code } = req.body;
    const _filename = `product-${Date.now()}-${code.toUpperCase()}${path.extname(
      file.originalname
    )}`;
    cb(null, _filename);
  },
});

const upload = (validationSchema) =>
  multer({
    storage,
    fileFilter: async (req, file, callback) => {
      try {
        req = await validationSchema.unknown(true).validateAsync(req, {
          abortEarly: true,
        });
      } catch (err) {
        return callback(err);
      }
      let typeArray = file.mimetype.split("/");
      let fileType = typeArray.pop();
      let acceptFileType = ["jpeg", "jpg", "png"];
      let isAccept = acceptFileType.includes(fileType);
      callback(null, isAccept);
    },
    limits: {
      fileSize: 52428800,
    },
  });

module.exports = { upload };
