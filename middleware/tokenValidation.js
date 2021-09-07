const jwt = require("jsonwebtoken");
const joi = require("joi");

exports.tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const schemaAuth = joi.object({
      authorization: joi.string().required(),
    }).options({ abortEarly: false });

    const validateAuth = await schemaAuth.validate({ authorization: token });
    if(validateAuth.error) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "You don't have permission",
      });
    }
    else {
      const dataUser = jwt.verify(token, process.env.SECRET_KEY);
      req.body.userId = dataUser.userId;
      next();
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error,
    });
  }
}