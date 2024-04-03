"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addSubcategoryVal, paramsIdVal, updateSubcategoryVal } from "./subcategory.validation.js";
import { addSubcategory, deleteSubcategory, getAllSubcategories, getSingleSubcategory, updateSubcategory } from "./subcategory.controller.js";
import { conditions } from "../../middleware/ifConditions.js";
import { searchParams } from "../../middleware/searchParams.js";

const subcategoryRouter = express.Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(validation(addSubcategoryVal), conditions, addSubcategory)
  .get(searchParams, getAllSubcategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleSubcategory)
  .put(validation(updateSubcategoryVal), conditions, updateSubcategory)
  .delete(validation(paramsIdVal), deleteSubcategory);

export default subcategoryRouter;
