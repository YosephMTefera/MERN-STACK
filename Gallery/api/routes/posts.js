import express from "express";
import {
  addPost,
  dislikePost,
  getAllPosts,
  likePost,
  removePost,
  removelikePost,
  updatePost,
  viewPost,
} from "../controller/postController.js";
import firebaseUpload from "../middleware/firebaseUpload.js";
const router = express.Router();

router.get("/get_posts", getAllPosts);
router.post("/add_post", firebaseUpload, addPost);
router.put("/update_post/:id", updatePost);
router.put("/like_Post/:id", likePost);
router.put("/dislike_post/:id", dislikePost);
router.put("/remove_like_post/:id", removelikePost);
router.put("/view_post/:id", viewPost);
router.delete("/remove_post/:id", removePost);

export default router;
