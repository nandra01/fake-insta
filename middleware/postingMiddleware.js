const joi = require("joi");
const uploadImg = require("../helper/multer");

exports.imgValidate = async (req, res, next) => {
  try {
    const img = req.file;
    if(!img) {
      res.status(500).send({
        status: 500,
        message: "Image Cannot be Empty",
      });
    }
    else {
        next();
    }
  } catch (error) {
    res.send({
      status: 500,
      message: "validation failed",
      data: error,
    });
  }
};

exports.uploadImg = async (req, res, next) => {
    let upload = uploadImg.single("image");
    upload(req, res, function (err) {
      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          res.status(500).send({
            statusText: "Internal Server Error",
            error: err.message,
            suggestion: "Max file size is 5Mb",
          });
        } else {
          res.status(415).send({
            error: err.message,
            suggestion: "please provide image with .jpg, .jpeg or .png extension",
          });
        }
      }
      next();
    });
  };