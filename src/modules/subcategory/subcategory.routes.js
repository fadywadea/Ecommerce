"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addSubcategoryVal, paramsIdVal, updateSubcategoryVal } from "./subcategory.validation.js";
import { addSubcategory, deleteSubcategory, getAllSubcategories, getSingleSubcategory, updateSubcategory } from "./subcategory.controller.js";

const subcategoryRouter = express.Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(validation(addSubcategoryVal), addSubcategory)
  .get(getAllSubcategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleSubcategory)
  .put(validation(updateSubcategoryVal), updateSubcategory)
  .delete(validation(paramsIdVal), deleteSubcategory);

export default subcategoryRouter;
