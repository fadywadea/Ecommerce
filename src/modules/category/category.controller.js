"use strict";

import { categoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";

const addCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const { name, slug } = req.body;
  const category = new categoryModel({ name, slug });
  await category.save();
  res.json({ message: "success", category });
};

const getAllCategories = async (req, res, next) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ message: "success", categories });
};

const getSingleCategory = async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
};

const updateCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
};

const deleteCategory = async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
};

export { addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory, };
