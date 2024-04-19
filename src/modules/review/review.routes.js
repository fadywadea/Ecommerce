"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./review.controller.js";
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { userId } from "../../middleware/reviewExist.js";

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(protectedRoutes, authorization("user"), validation(addReviewVal), userId, addReview)
  .get(getAllReviews);

reviewRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleReview)
  .put(protectedRoutes, authorization("user"), validation(updateReviewVal), userId, updateReview)
  .delete(protectedRoutes, authorization("user", "admin"), validation(paramsIdVal), deleteReview);

export default reviewRouter;
