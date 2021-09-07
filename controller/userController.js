const { User } = require("../models");
const bycrypt = require("bcrypt");
const dotenv = require("dotenv");
const router = require("../routes/userRoutes");
const dotenvConfig = dotenv.config();

const routes = {}


// router.logout = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email: email } });
//     const session = req.session;
//     if(sessions.user) {

//     }
//   } catch(error) {

//   }
// }

/**
 * ! REGISTER USER
 */
routes.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existEmail = await User.findOne({ where: { email: email } })
    if(existEmail) {
        return res.status(208).json({
            message: "Email already exist on server, please login!"
        });
    }
    const createUser = await User.create({
        ...req.body,
        password: bycrypt.hashSync(password, 10)
    });

    const result = {
        statusCode: 200,
        statusText: "Success",
        message: "Register Succsess",
        data: createUser,
    };
    res.json(result);
}
  catch(error) {
    res.status(500).json({
        statusText: "Internal Server Error",
        message: error.message,
    });
  }
}

/**
 * ! Login User
 */
routes.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email} });
    if(!user) {
        return res.status(404).json({
            statusText: "Not Found",
            message: "Incorrect email, please check it and try again!",
          });
    }
    const verifyPassword = await bycrypt.compare(password, user.password);
    if(!verifyPassword) {
        return res.status(401).json({
            statusText: "Unauthorized",
            message: `Password didn't match, please check your password and try again!`,
        });
    }
    next();
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message,
    });
  }
};

routes.updateProfile = async (req, res) => {
  try {
    
  } catch (error) {

  }
}

module.exports = routes