"use strict";

import { productModel } from "../../../database/models/product.model.js";
import { addOne, deleteOne, findOne, getAll, updateOne } from "../handlers/handlers.js";

const addProduct = addOne(productModel);

const getAllProducts = getAll(productModel);

const getSingleProduct = findOne(productModel);

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

export { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, };
