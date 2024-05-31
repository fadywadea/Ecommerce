"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { createOrderCash } from "./order.controller.js";
import { createOrderVal } from "./order.validation.js";

const orderRouter = express.Router();

// orderRouter
//   .route("/")
//   .post(protectedRoutes, authorization("user"), validation(addToCartVal), addToCart)
//   .get(protectedRoutes, authorization("user"), getLoggedUserCart)
//   .delete(protectedRoutes, authorization("user"), clearUserCart);

orderRouter
  .route("/:id")
  .post(protectedRoutes, authorization("user"), validation(createOrderVal), createOrderCash);

export default orderRouter;
