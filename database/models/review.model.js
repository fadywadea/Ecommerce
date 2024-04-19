'use strict';

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
},
  { timestamps: true }
);

export const reviewModel = mongoose.model("review", reviewSchema);
