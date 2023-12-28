import Category from "../model/Category.js";
import mongoose from "mongoose";

const addCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const findCategory = await Category.findOne({ categoryName });
    if (findCategory)
      return res
        .status(400)
        .json({ status: "failed", message: "category exists" });

    const createCateogry = await Category.create({
      categoryName,
    });
    if (!createCateogry)
      return res
        .status(400)
        .json({ status: "failed", message: "category could not be created" });

    res
      .status(200)
      .json({ status: "success", message: `${categoryName} have been added` });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;

  try {
    if (!mongoose.isValidObjectId(userID))
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Category ID" });

    const findCategory = await Category.findOne({ _id: id });
    if (!findCategory)
      return res
        .status(400)
        .json({ status: "failed", message: "Category not found" });

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: findCategory?._id },
      {
        categoryName: categoryName ? categoryName : findCategory?.categoryName,
      }
    );

    if (updatedCategory)
      return res.status(200).json({
        status: "success",
        msg: `${updatedCategory?._id} has been updated successfully`,
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const removeCategory = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });
    const findCategory = await Category.findOne({ _id: id });
    if (!findCategory)
      return res
        .status(400)
        .json({ status: "failed", message: "Category not found" });

    const deleteCategory = await Posts.deleteOne({ _id: findCategory._id });
    if (!deleteCategory)
      return res.status(400).json({
        status: "failed",
        message: `Category ${findCategory?.categoryName}  could not be deleted. Please try again later`,
      });
    return res.status(200).json({
      status: "success",
      message: `Category with ${findCategory._id} ID has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const getAllcategories = async (req, res) => {
  try {
    const getCategories = await Category.find();
    if (!getCategories)
      return res
        .status(400)
        .json({ status: "failed", message: "No Category Available" });

    return res
      .status(200)
      .json({ status: "success", categories: getCategories });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

const getCategoryByID = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ status: "failed", message: "Invalid ID" });
    const findCategory = await Category.findOne({ _id: id });
    if (!findCategory)
      return res
        .status(400)
        .json({ status: "failed", message: "Category not found" });

    return res.status(200).json({ status: "success", message: findCategory });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

export {
  addCategory,
  updateCategory,
  removeCategory,
  getAllcategories,
  getCategoryByID,
};
