"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { addToCartVal, paramsIdVal, updateQTYVal } from "./cart.validation.js";
import { addToCart } from "./cart.controller.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes, authorization("user"), validation(addToCartVal), addToCart)
  // .get(protectedRoutes, authorization("user"), );

// cartRouter
//   .route("/:id")
//   .delete(protectedRoutes, authorization("user"), validation(paramsIdVal), )
//   .patch(protectedRoutes, authorization("user"), validation(updateQTYVal), );

export default cartRouter;
