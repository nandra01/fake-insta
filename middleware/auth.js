const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();
const routes = {}

/*
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const express = require("express")

const app = express();

app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
*/

routes.getTokenLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        email: user.dataValues.email,
        password: delete user.dataValues.password,
      },
      process.env.SECRET_KEY
    );
    const result = {
      statusCode: 200,
      statusText: "Success",
      message: "Login Success",
      user: {
          token,
          userDetail: user.dataValues,
      },
    };
    res.json(result);
  } catch(error) {
    console.log(error);
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error,
    });
  }
};
module.exports = routes;