"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { addToCartVal, applyCouponVal, paramsIdVal, updateQTYVal } from "./cart.validation.js";
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes, authorization("user"), validation(addToCartVal), addToCart)
  .get(protectedRoutes, authorization("user"), getLoggedUserCart)
  .delete(protectedRoutes, authorization("user"), clearUserCart);

cartRouter.post("/applyCoupon", protectedRoutes, authorization("user"),validation(applyCouponVal), applyCoupon);

cartRouter
  .route("/:id")
  .delete(protectedRoutes, authorization("user"), validation(paramsIdVal), removeItemFromCart)
  .put(protectedRoutes, authorization("user"), validation(updateQTYVal), updateQuantity);

export default cartRouter;
