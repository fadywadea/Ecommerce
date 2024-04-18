"use strict";

import Joi from "joi";

const addUserVal = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
  rePassword: Joi.string().valid(Joi.ref("password")).required(),
  role: Joi.string().valid("user", "admin").default("user")
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required()
});

const updateUserVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  rePassword: Joi.string().valid(Joi.ref("password")),
  role: Joi.string().valid('user', 'admin')
});

export { addUserVal, paramsIdVal, updateUserVal };