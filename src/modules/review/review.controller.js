"use strict";

import { reviewModel } from "../../../database/models/review.model.js";
import { addOne, deleteOne, findOne, getAll, updateOne, } from "../handlers/handlers.js";

const addReview = addOne(reviewModel);

const getAllReviews = getAll(reviewModel);

const getSingleReview = findOne(reviewModel);

const updateReview = updateOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

export { addReview, getAllReviews, getSingleReview, updateReview, deleteReview, };
