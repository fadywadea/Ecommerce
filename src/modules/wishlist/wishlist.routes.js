"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { updateWishlistVal } from "./wishlist.validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { updateWishlist } from "./wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter
  .route("/:id")
  .put(protectedRoutes, authorization("user"), validation(updateWishlistVal), updateWishlist)

export default wishlistRouter;
