'use strict';

import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [1, "too short coupon code"]
  },
  discount: Number,
  expires: Date,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  }
},
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);
