'use strict';

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, "The title must be unique"],
    trim: true,
    required: true,
    minLength: [2, " too short product title"],
    maxLength: [200, " too long product title"]
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minLength: [20, " too short product description"],
    maxLength: [200, " too long product description"]
  },
  imgCover: String,
  images: [],
  price: {
    type: Number,
    min: 0,
    required: true
  },
  priceAfterDiscount: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  sold: Number,
  rateAvg: {
    type: Number,
    max: 5,
    min: 0
  },
  rateCount: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  subcategory: {
    type: mongoose.Types.ObjectId,
    ref: "subcategory",
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  }
},
  { timestamps: true, toJSON: { virtuals: true } }
);

// Virtual
productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product"
});

productSchema.pre("findOne", function () {
  this.populate("reviews");
});

export const productModel = mongoose.model("product", productSchema);
