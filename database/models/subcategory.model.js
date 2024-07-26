'use strict';

import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "The name must be unique"],
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

subcategorySchema.pre("find", function () {
  this.populate("category");
})

export const subcategoryModel = mongoose.model("subcategory", subcategorySchema);
