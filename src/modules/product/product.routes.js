"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "./product.controller.js";
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js";
import { conditions } from "../../middleware/ifConditions.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(protectedRoutes, authorization("admin"), uploadFields([{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
    validation(addProductVal), conditions, addProduct)
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleProduct)
  .put(protectedRoutes, authorization("admin"), uploadFields([{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
    validation(updateProductVal), conditions, updateProduct)
  .delete(protectedRoutes, authorization("admin"), validation(paramsIdVal), deleteProduct);

export default productRouter;
