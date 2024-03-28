"use strict";

import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory, } from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(validation(addCategoryVal), addCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(validation(updateCategoryVal), updateCategory)
  .delete(validation(paramsIdVal), deleteCategory);

export default categoryRouter;
