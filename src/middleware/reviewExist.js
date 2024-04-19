"use strict";

import { reviewModel } from "../../database/models/review.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";

export const userId = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isReviewExist = await reviewModel.findOne({ user: req.user._id, product: req.body.product });
  isReviewExist && next(new AppError("Review already exists", 409));
  !isReviewExist && next();
});