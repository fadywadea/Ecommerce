"use strict";

import Joi from "joi";

const createOrderVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  shippingAddress: Joi.object({
    street: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    phone: Joi.number().required(),
  }).required(),
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

export { createOrderVal, paramsIdVal, updateQTYVal, applyCouponVal };