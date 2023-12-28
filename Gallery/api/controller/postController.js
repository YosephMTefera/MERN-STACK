import Posts from "../model/Posts.js";
import mongoose from "mongoose";
import User from "../model/User.js";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase.config.js";

initializeApp(firebaseConfig.firebaseConfig);
const storage = getStorage();

const getAllPosts = async (req, res) => {
  try {
    const getAllPosts = await Posts.find();
    if (!getAllPosts)
      return res
        .status(404)
        .json({ status: "failed", message: "No available posts" });

    return res.status(200).json({ status: "success", posts: getAllPosts });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const addPost = async (req, res) => {
  const { userID, title, caption, category } = req.body;
  const postPicture = req?.file?.filename || req?.file?.originalname;

  try {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + "-" + postPicture;
    const storageRef = ref(storage, `postImages/${filename}`);
    const metadata = {
      contentType: req?.file?.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req?.file?.buffer,
      metadata
    );
    const postImagedownloadURL = await getDownloadURL(snapshot.ref);

    await Posts.create({
      userID: userID,
      title: title,
      filename: postImagedownloadURL,
      caption: caption,
      category: category,
    });
    return res.status(200).json({ status: "success", message: "Post created" });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { userID, caption } = req.body;
  const postPicture = req?.file?.filename || req?.file?.originalname;

  try {
    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ status: "failed", message: "ID is required" });
    const findPost = await Posts.findOne({ _id: id });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });

    const updatePost = await Posts.findByIdAndUpdate(
      { _id: findPost?._id },
      {
        caption: caption ? caption : findPost?.firstname,
        filename: postPicture ? postPicture : findPost?.filename,
      }
    );
    const updatedPost = await Posts.findOne({ _id: id });
    if (updatePost)
      return res.status(200).json({
        status: "success",
        msg: `${updatedPost?._id} has been updated successfully`,
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const removePost = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id)
      return res.status(400).json({ status: "failed", message: "Invalid ID" });
    const findPost = await Posts.findOne({ _id: id });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const deletePost = await Posts.deleteOne({ _id: findPost._id });
    if (!deletePost)
      return res.status(400).json({
        status: "failed",
        message: "post could not be deleted. Please try again later",
      });
    return res.status(200).json({
      status: "success",
      message: `Post with ${findPost._id} ID has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const likePost = async (req, res) => {
  const postID = req.params.id;
  const { userID } = req.body;

  try {
    if (!mongoose.isValidObjectId(userID))
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Post ID" });
    const findPost = await Posts.findOne({ _id: postID });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });

    const checkUser = findPost.like.filter(
      (post) => post.user_id.toString() === userID
    );

    if (checkUser.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: `${findUser?.username} already liked this post`,
      });
    }

    await Posts.findByIdAndUpdate(
      { _id: findPost._id },
      {
        $addToSet: {
          like: {
            user_id: findUser._id,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} has liked this post`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const removelikePost = async (req, res) => {
  const postID = req.params.id;
  const { userID } = req.body;

  try {
    if (!mongoose.isValidObjectId(userID))
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Post ID" });
    const findPost = await Posts.findOne({ _id: postID });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });

    const checkUser = findPost.like.filter(
      (post) => post.user_id.toString() === userID
    );

    if (checkUser.length > 0) {
      await Posts.findByIdAndUpdate(
        { _id: findPost._id },
        {
          $pull: {
            like: {
              user_id: findUser._id,
            },
          },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} has remove liked this post`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const dislikePost = async (req, res) => {
  const postID = req.params.id;
  const { userID } = req.body;

  try {
    if (!mongoose.isValidObjectId(userID))
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Post ID" });
    const findPost = await Posts.findOne({ _id: postID });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });

    await Posts.findByIdAndUpdate(
      { _id: findPost._id },
      {
        $pull: { like: { user_id: findUser._id } },
      }
    );

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} has disliked this post`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllpost = async (req, res) => {
  try {
    const getPosts = await Posts.find();
    if (!getPosts)
      return res
        .status(400)
        .json({ status: "failed", message: "No Post Available" });

    return res.status(200).json({ status: "success", message: getPosts });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const getPostByID = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });
    const findPost = await Posts.findOne({ _id: id });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    return res.status(200).json({ status: "success", message: findPost });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const viewPost = async (req, res) => {
  const postID = req.params.id;
  const { userID } = req.body;

  try {
    if (!mongoose.isValidObjectId(userID))
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Post ID" });
    const findPost = await Posts.findOne({ _id: postID });
    if (!findPost)
      return res
        .status(400)
        .json({ status: "failed", message: "Post not found" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User not found" });

    const checkUser = findPost.views.filter(
      (post) => post.user_id.toString() === userID
    );

    if (checkUser.length > 0) {
      return res.status(200).json({
        status: "failed",
        message: `${findUser?.username} already viewed this post`,
      });
    }

    await Posts.findByIdAndUpdate(
      { _id: findPost._id },
      {
        $addToSet: {
          views: {
            user_id: findUser._id,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} has viewed this post`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

export {
  getAllPosts,
  addPost,
  updatePost,
  removePost,
  likePost,
  dislikePost,
  removelikePost,
  getAllpost,
  getPostByID,
  viewPost,
};
