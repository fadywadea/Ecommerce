'use strict';

import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [2, " too short subcategory name"],
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  }
},
  { timestamps: true }
);

export const subcategoryModel = mongoose.model("subcategory", subcategorySchema);
