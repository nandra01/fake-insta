const { User, Post } = require("../models");
const sequelize = require("sequelize");
const { cloudinary } = require ("../config/cloudinary");

const routes = {};

routes.createPost = async (req, res) => {
  try {
    const errorCheck = req.error;
    if(errorCheck) {
      res.status(500).send({ status: 500, message: errorCheck });
    }
    else {
      let status = 200;
      let message = "OK";
      const fileStr = req.file.path;
      const uploadRes = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setup",
      });
      const data = {
        image: uploadRes.secure_url,
        cloudinaryId: uploadRes.public_id,
        description: req.body.description,
        userId: req.body.userId,
      };
      const result = await Post.create(data);
      res.status(status).send({
        status: status,
        message: message,
        data: result,
      })
    }
  } catch (error) {
    res.status(500).send({
     status: 500,
     message: "Posting Failed",
    });
  }
};

routes.getAllPost = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const userId = req.body.userId;
    const userPosts = await Post.findAll({
      where : {
        userId,
      },
    });
    
    res.status(status).send({
     status: status,
     message: message,
     data: userPosts,
    }) 
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Failed to get user post",
      erorr: error,
      });
  }
};

routes.getPostById = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const postId = req.params.id;
    const detailPost = await Post.findOne({
        where: postId,
    }); 
    res.status(status).send({
      status: status,
      message: message,
      data: detailPost,
    }) 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Failed to get user post detail",
      erorr: error,
    });
  }
};

routes.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;
    const userPost = await Post.findOne({
      where: {id: postId },
    });
    if(!userPost) {
      res.status(404).send({
        status: "Invalid Id",
        message: "Post Not Found",
      });
    }
    if(userId == userPost.userId) {
      const dataPost = await Post.destroy({
        where: { id: postId },
      });
    if(dataPost) {
      await cloudinary.uploader.destroy(userPost.cloudinaryId);
    }
    res.status(200).send({
      status: 200,
      message: "Delete Success",
    })
    }
  } catch (error) {
      console.log(error);
    res.status(500).send({
      status: 500,
      message: "Failed to delete",
      });
  }
}
module.exports = routes;