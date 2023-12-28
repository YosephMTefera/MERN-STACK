import express from "express";
import {
  addInteresets,
  deleteUser,
  getAllUsers,
  getUserByID,
  login,
  logout,
  register,
  removeInteresets,
  removeOneInterest,
  updateUser,
  userFollowing,
  userForgotPassword,
  userUnFollow,
  usernresetPassword,
} from "../controller/userController.js";
import firebaseUserUpload from "../middleware/firebaseUserUpload.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/updateUser/:id", firebaseUserUpload, updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.post("/forgotPassword", userForgotPassword);
router.post("/reset-password/:id/:token", usernresetPassword);
router.put("/follow-user", userFollowing);
router.put("/unfollow-user", userUnFollow);
router.get("/get_users", getAllUsers);
router.get("/get-user/:id", getUserByID);
router.put("/interests/:id", addInteresets);
router.put("/interests/addInterests/:id", addInteresets);
router.put("/interests/removeInterests/:id", removeInteresets);
router.put("/interests/removeOneInterest/:id", removeOneInterest);

export default router;
