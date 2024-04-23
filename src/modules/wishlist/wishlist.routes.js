"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addToWishlistVal, paramsIdVal } from "./wishlist.validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter
  .route("/")
  .patch(protectedRoutes, authorization("user"), validation(addToWishlistVal), addToWishlist)
  .get(protectedRoutes, authorization("user"), getLoggedUserWishlist);

wishlistRouter
  .route("/:id")
  .delete(protectedRoutes, authorization("user", "admin"), validation(paramsIdVal), removeFromWishlist);

export default wishlistRouter;
