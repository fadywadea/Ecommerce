"use strict";

import Joi from "joi";

const addSubcategoryVal = Joi.object({
  name: Joi.string().min(2).max(100).required().trim(),
  category: Joi.string().hex().length(24).required()
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const updateSubcategoryVal = Joi.object({
  name: Joi.string().min(2).max(100).trim(),
  id: Joi.string().hex().length(24).required(),
  category: Joi.string().hex().length(24)
});

export { addSubcategoryVal, paramsIdVal, updateSubcategoryVal };