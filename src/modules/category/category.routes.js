"use strict";

import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory, } from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js";

const categoryRouter = express.Router();

categoryRouter.use("/:category/subcategories", subcategoryRouter);

categoryRouter
  .route("/")
  .post(uploadSingleFile("image"), validation(addCategoryVal), addCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(uploadSingleFile("image"), validation(updateCategoryVal), updateCategory)
  .delete(validation(paramsIdVal), deleteCategory);

export default categoryRouter;
