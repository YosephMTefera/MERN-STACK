import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  like: [],
  dislike: [],
  views: [],
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
