"use strict";

import Joi from "joi";

const addToCartVal = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const updateQTYVal = Joi.object({
  id: Joi.string().hex().length(24),
  quantity: Joi.number().integer().options({ convert: false }).required(),
});

const applyCouponVal = Joi.object({
  coupon: Joi.string().min(1).max(200).required().trim(),
});

export { addToCartVal, paramsIdVal, updateQTYVal, applyCouponVal };