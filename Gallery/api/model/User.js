import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  profession: {
    type: String,
  },
  following: [],
  followers: [],
  no_of_report: {
    type: Number,
    default: 0,
  },
  account_status: {
    type: String,
    enum: ["active", "inactive"],
  },
  favorite_categories: [],
  interesets: [],
  otp: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  rating: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
