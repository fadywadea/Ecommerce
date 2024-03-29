"use strict";

import { categoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";

const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  const { name, slug, image } = req.body;
  let category = new categoryModel({ name, slug, image });
  await category.save();
  res.json({ message: "success", category });
});

const getAllCategories = catchError(async (req, res, next) => {
  let categories = await categoryModel.find({});
  res.status(200).json({ message: "success", categories });
});

const getSingleCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findById(req.params.id);
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findByIdAndDelete(req.params.id);
  !category && res.status(404).json({ message: "Category not found" });
  category && res.status(200).json({ message: "success", category });
});

export { addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory, };
