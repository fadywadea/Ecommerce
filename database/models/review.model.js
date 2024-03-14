'use strict';

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [2, " too short review text"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product"
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  logo: String
},
  { timestamps: true }
);

export const reviewModel = mongoose.model("review", reviewSchema);
