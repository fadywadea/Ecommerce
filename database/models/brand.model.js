'use strict';

import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "The name must be unique"],
    trim: true,
    required: true,
    minLength: [2, " too short brand name"],
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  logo: String
},
  { timestamps: true }
);

export const brandModel = mongoose.model("brand", brandSchema);
