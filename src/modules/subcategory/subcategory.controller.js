"use strict";

import { subcategoryModel } from "../../../database/models/subcategory.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";

const addSubcategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const { name, slug, category } = req.body;
  let subcategory = new subcategoryModel({ name, slug, category });
  await subcategory.save();
  res.json({ message: "success", subcategory });
});

const getAllSubcategories = catchError(async (req, res, next) => {
  let filterObject = {};
  if (req.params.category) {
    filterObject.category = req.params.category
  }
  let subcategories = await subcategoryModel.find(filterObject).populate("category");
  res.status(200).json({ message: "success", subcategories });
});

const getSingleSubcategory = catchError(async (req, res, next) => {
  let subcategory = await subcategoryModel.findById(req.params.id);
  !subcategory && res.status(404).json({ message: "subcategory not found" });
  subcategory && res.status(200).json({ message: "success", subcategory });
});

const updateSubcategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let subcategory = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  !subcategory && res.status(404).json({ message: "subcategory not found" });
  subcategory && res.status(200).json({ message: "success", subcategory });
});

const deleteSubcategory = catchError(async (req, res, next) => {
  let subcategory = await subcategoryModel.findByIdAndDelete(req.params.id);
  !subcategory && res.status(404).json({ message: "subcategory not found" });
  subcategory && res.status(200).json({ message: "success", subcategory });
});

export { addSubcategory, getAllSubcategories, getSingleSubcategory, updateSubcategory, deleteSubcategory, };
