"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import { addBrandVal, paramsIdVal, updateBrandVal } from "./brand.validation.js";
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js";
import { conditions } from "../../middleware/ifConditions.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(uploadSingleFile("logo"), validation(addBrandVal), conditions, addBrand)
  .get(getAllBrands);

brandRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleBrand)
  .put(uploadSingleFile("logo"), validation(updateBrandVal), conditions, updateBrand)
  .delete(validation(paramsIdVal), deleteBrand);

export default brandRouter;
