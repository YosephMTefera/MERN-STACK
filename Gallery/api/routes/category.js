import express from "express";
import {
  addCategory,
  getAllcategories,
  getCategoryByID,
  removeCategory,
  updateCategory,
} from "../controller/categoryController.js";
const router = express.Router();

router.get("/get_categories", getAllcategories);
router.get("/get_category_by_id", getCategoryByID);
router.post("/add_category", addCategory);
router.put("/update_category/:id", updateCategory);
router.delete("/remove_category", removeCategory);

export default router;
