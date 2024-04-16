"use strict";

import { subcategoryModel } from "../../../database/models/subcategory.model.js";
import { addOne, deleteOne, findOne, getAll, updateOne } from "../handlers/handlers.js";

const addSubcategory = addOne(subcategoryModel);

const getAllSubcategories = getAll(subcategoryModel);

const getSingleSubcategory = findOne(subcategoryModel);

const updateSubcategory = updateOne(subcategoryModel);

const deleteSubcategory = deleteOne(subcategoryModel);

export { addSubcategory, getAllSubcategories, getSingleSubcategory, updateSubcategory, deleteSubcategory, };
