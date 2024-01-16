import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import mongoose from "mongoose";
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

const register = async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    username,
    email,
    phone,
    password,
    country,
    city,
    profession,
    status,
  } = req.body;
  try {
    if (!firstname)
      return res
        .status(400)
        .json({ status: "failed", message: "first name is required" });
    if (!middlename)
      return res
        .status(400)
        .json({ status: "failed", message: "middle name is required" });
    if (!lastname)
      return res
        .status(400)
        .json({ status: "failed", message: "last name is required" });
    if (!username)
      return res
        .status(400)
        .json({ status: "failed", message: "username is required" });
    if (!email)
      return res
        .status(400)
        .json({ status: "failed", message: "email is required" });
    if (!phone)
      return res
        .status(400)
        .json({ status: "failed", message: "phone is required" });
    if (!password)
      return res
        .status(400)
        .json({ status: "failed", message: "password is required" });

    const findUserByUsername = await User.findOne({ username: username });
    const findUserByEmail = await User.findOne({ email: email });

    if (findUserByUsername)
      return res.status(400).json({
        status: "failed",
        message: `User with ${username} username exists`,
      });
    if (findUserByEmail)
      return res
        .status(400)
        .json({ status: "failed", message: `User with ${email} email exists` });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await User.create({
      firstname,
      middlename,
      lastname,
      username,
      email,
      phone,
      password: hashedPassword,
      country,
      city,
      profession,
      status,
    });
    if (createUser)
      return res.status(200).json({
        status: "success",
        message: `${email} have been registered successfully.`,
      });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username)
      return res.status(404).json({
        status: "error",
        message: "Username is required",
      });
    if (!password)
      return res.status(404).json({
        status: "error",
        message: "Password is required",
      });
    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "error", message: "user doesn't exist" });
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ status: "error", msg: "Incorrect Password" });

    const accessToken = jwt.sign(
      {
        user: {
          username: findUser.username,
          email: findUser.email,
        },
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "5min" }
    );
    const finalUser = await User.findOne({ username: username }).select(
      "-password "
    );
    return res
      .cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({
        message: "Successfully logged in.",
        token: accessToken,
        user: finalUser,
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    firstname,
    middlename,
    lastname,
    username,
    email,
    phone,
    country,
    city,
    profession,
    status,
    fileName
  } = req.body;
  const picture = req?.file?.filename || req?.file?.originalname || fileName;

  try {
    if (!id)
      return res.status(400).json({
        status: "error",
        msg: "ID is required",
      });

    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      return res.status(400).json({
        status: "error",
        msg: "User doesn't exist",
      });
    }
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + "-" + picture;

    const storageRef = ref(storage, `userImages/${filename}`);

    const metadata = {
      contentType: req?.file?.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req?.file?.buffer,
      metadata
    );
    const userImagedownloadURL = await getDownloadURL(snapshot.ref);

    const updateUser = await User.findByIdAndUpdate(
      { _id: findUser?._id },
      {
        firstname: firstname ? firstname : findUser?.firstname,
        middlename: middlename ? middlename : findUser?.middlename,
        lastname: lastname ? lastname : findUser?.lastname,
        username: username ? username : findUser?.username,
        email: email ? email : findUser?.email,
        phone: phone ? phone : findUser?.phone,
        profileImg: filename
          ? userImagedownloadURL
          : findUser?.profileImg,
        country: country ? country : findUser?.country,
        city: city ? city : findUser?.city,
        profession: profession ? profession : findUser?.profession,
        status: status ? status : findUser?.status,
      }
    );
    const updatedUser = await User.findOne({ _id: id });
    if (updateUser)
      return res.status(200).json({
        status: "success",
        msg: `${updatedUser?.username} has been updated successfully`,
      });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id)
      return res.status(404).json({ status: "failed", msg: "ID is required" });
    const findUser = await User.findOne({ _id: id });
    if (!findUser)
      return res.status(404).json({ status: "failed", msg: "User not found" });

    const deleteUser = await User.deleteOne({ _id: id });
    if (!deleteUser)
      return res.status(400).json({
        status: "failed",
        msg: "User could not deleted. try again later",
      });

    return res
      .status(200)
      .json({ status: "success", msg: "User has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

const userForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email is required, please insert your email" });
    }
    const findUser = await User.findOne({ email });

    if (!findUser)
      return res
        .status(404)
        .json({ mssage: "User with this email doesn't exist" });
    const secret = process.env.JWT_ACCESS_KEY + findUser.password;
    const token = jwt.sign(
      { email: findUser.email, id: findUser._id },
      secret,
      {
        expiresIn: "30m",
      }
    );
    const link = `http://localhost:3000/reset-password/${findUser._id}/${token}`;
    var transporter = createTransport({
      service: "gmail",
      auth: {
        user: "yosef.mek12@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: "yosef.mek12@gmail.com",
      to: `${email}`,
      subject: "Reset Password.",
      text: `Use the following link to reset your password  ${link}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res
          .status(400)
          .json({ status: "failed", msg: `Email not send successfully.` });
      } else {
        return res
          .status(200)
          .json({ status: "sucess", msg: `Email sent:  ${info.response}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const usernresetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ Message: "No valid id found in the request send." });
    }

    const findUser = await User.findOne({ _id: id });

    if (!findUser) {
      return res.status(404).json({ msg: "User not found." });
    }
    const secret = process.env.JWT_ACCESS_KEY + findUser.password;

    try {
      const verify = jwt.verify(token, secret);

      if (verify) {
        const hashedPassword = await hash(password, 10);
        const reset = await User.findByIdAndUpdate(
          { _id: id },
          { password: hashedPassword }
        );

        return res
          .status(200)
          .json({ status: "sucess", msg: "Password Successfully Changed." });
      } else {
        return res.status(401).json({ status: "failed", msg: "Not verified." });
      }
    } catch (error) {
      return res.status(401).json({ status: "failed", msg: error.message });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const userFollowing = async (req, res) => {
  const { userID, usertobeFollowedID } = req.body;
  try {
    const findFollowingUser = await User.findOne({ _id: usertobeFollowedID });
    if (!findFollowingUser)
      return res
        .status(400)
        .json({ status: "failed", message: "user does not exist" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "user not found" });

    const checkUser = findFollowingUser.followers.filter(
      (user) => user.user_id.toString() === userID
    );

    if (checkUser.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: `${findUser?.username} already follows ${findFollowingUser?.username}`,
      });
    }

    await User.findByIdAndUpdate(
      { _id: findFollowingUser._id },
      {
        $addToSet: {
          followers: {
            user_id: findUser._id,
          },
        },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      { _id: findUser._id },
      {
        $addToSet: {
          following: {
            user_id: findFollowingUser._id,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} is following ${findFollowingUser.username}`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};
const userUnFollow = async (req, res) => {
  const { userID, usertobeFollowedID } = req.body;
  try {
    const findFollowingUser = await User.findOne({ _id: usertobeFollowedID });
    if (!findFollowingUser)
      return res
        .status(400)
        .json({ status: "failed", message: "user does not exist" });

    const findUser = await User.findOne({ _id: userID });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "user not found" });

    await User.findByIdAndUpdate(
      { _id: findFollowingUser._id },
      {
        $pull: { followers: { user_id: findUser._id } },
      }
    );
    await User.findByIdAndUpdate(
      { _id: findUser._id },
      {
        $pull: { following: { user_id: findFollowingUser._id } },
      }
    );

    return res.status(200).json({
      status: "success",
      message: `${findUser.username} unfollowed ${findFollowingUser.username}`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const findUsers = await User.find();
    if (!findUsers)
      return res
        .status(400)
        .json({ status: "failed", message: "no user found" });

    return res.status(200).json({ status: "success", users: findUsers });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const findUser = await User.find({ _id: id });
    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "no user found" });

    return res.status(200).json({ status: "success", message: findUser });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const addInteresets = async (req, res) => {
  const id = req.params.id;
  const { interests } = req.body;

  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });

    const findUser = await User.findOne({ _id: id });

    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" });

    if (!interests || !interests.length) {
      return res.status(400).json({
        status: "failed",
        message: "Interests array is empty or undefined",
      });
    }
    if (interests.length === 4)
      return res.status(400).json({
        status: "failed",
        message: "You can not have more than 4 interesets!",
      });

    await User.findByIdAndUpdate(findUser._id, {
      $push: { interesets: { $each: interests } },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Interests Added" });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const removeInteresets = async (req, res) => {
  const id = req.params.id;
  const { interests } = req.body;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });

    const findUser = await User.findOne({ _id: id });

    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" });

    if (!interests || !interests.length) {
      return res.status(400).json({
        status: "failed",
        message: "Interests array is empty or undefined",
      });
    }

    await User.findByIdAndUpdate(findUser._id, {
      $pull: { interesets: { $in: interests } },
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const removeOneInterest = async (req, res) => {
  const id = req.params.id;
  const { interest } = req.body;

  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });

    const findUser = await User.findOne({ _id: id });

    if (!findUser)
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" });

    if (!interest) {
      return res.status(400).json({
        status: "failed",
        message: "Interest  is undefined",
      });
    }

    await User.findByIdAndUpdate(findUser._id, {
      $pull: { interesets: interest },
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  res
    .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    .status(200)
    .json({ Message: "Logged out successfully." });
};

export {
  register,
  login,
  updateUser,
  deleteUser,
  userForgotPassword,
  usernresetPassword,
  getAllUsers,
  getUserByID,
  userFollowing,
  userUnFollow,
  addInteresets,
  removeInteresets,
  removeOneInterest,
  logout,
};
