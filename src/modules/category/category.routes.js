"use strict";

import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory, } from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js";
import { conditions } from "../../middleware/ifConditions.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = express.Router();

categoryRouter.use("/:category/subcategories", subcategoryRouter);

categoryRouter
  .route("/")
  .post(protectedRoutes, uploadSingleFile("image"), validation(addCategoryVal), conditions, addCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(protectedRoutes, uploadSingleFile("image"), validation(updateCategoryVal), conditions, updateCategory)
  .delete(protectedRoutes, validation(paramsIdVal), deleteCategory);

export default categoryRouter;
