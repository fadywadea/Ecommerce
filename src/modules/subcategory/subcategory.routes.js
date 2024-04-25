"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addSubcategoryVal, paramsIdVal, updateSubcategoryVal } from "./subcategory.validation.js";
import { addSubcategory, deleteSubcategory, getAllSubcategories, getSingleSubcategory, updateSubcategory } from "./subcategory.controller.js";
import { conditions } from "../../middleware/ifConditions.js";
import { searchParams } from "../../middleware/searchParams.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const subcategoryRouter = express.Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(protectedRoutes, validation(addSubcategoryVal), conditions, addSubcategory)
  .get(searchParams, getAllSubcategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleSubcategory)
  .put(protectedRoutes, validation(updateSubcategoryVal), conditions, updateSubcategory)
  .delete(protectedRoutes, validation(paramsIdVal), deleteSubcategory);

export default subcategoryRouter;
