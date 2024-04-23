"use strict";

import Joi from "joi";

const addAddressVal = Joi.object({
  street: Joi.string().required().trim(),
  phone: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const updateAddressVal = Joi.object({
  id: Joi.string().hex().length(24),
  street: Joi.string().trim(),
  phone: Joi.string().trim(),
  city: Joi.string().trim(),
});

export { addAddressVal, paramsIdVal, updateAddressVal };