"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "./product.controller.js";
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js";
import { conditions } from "../../middleware/ifConditions.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(uploadFields([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]), validation(addProductVal), conditions, addProduct)
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleProduct)
  .put(uploadFields([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]), validation(updateProductVal), conditions, updateProduct)
  .delete(validation(paramsIdVal), deleteProduct);

export default productRouter;
