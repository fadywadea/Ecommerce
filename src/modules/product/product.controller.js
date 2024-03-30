"use strict";

import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";

const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  const { title, slug, description, price, quantity, category, subcategory, brand, images, imgCover, priceAfterDiscount, createdBy } = req.body;
  let product = new productModel({ title, slug, description, price, quantity, category, subcategory, brand, images, imgCover, priceAfterDiscount, createdBy });
  await product.save();
  res.json({ message: "success", product });
});

const getAllProducts = catchError(async (req, res, next) => {
  let products = await productModel.find({});
  res.status(200).json({ message: "success", products });
});

const getSingleProduct = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images) req.body.images = req.files.images.map((img) => img.filename);
  let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json({ message: "success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  let product = await productModel.findByIdAndDelete(req.params.id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.status(200).json({ message: "success", product });
});

export { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, };
