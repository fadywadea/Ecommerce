"use strict";

import { brandModel } from "../../../database/models/brand.model.js";
import { addOne, deleteOne, findOne, getAll, updateOne } from "../handlers/handlers.js";

const addBrand = addOne(brandModel);

const getAllBrands = getAll(brandModel);

const getSingleBrand = findOne(brandModel);

const updateBrand = updateOne(brandModel);

const deleteBrand = deleteOne(brandModel);

export { addBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand, };
