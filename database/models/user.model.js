'use strict';

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: [1, "too short user name"]
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "The email must be unique"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "too short user password"]
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    lowercase: true
  },
  passwordUpdatedAt: {
    type: Date,
    default: Date.now(),
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  addresses: [{
    street: String,
    city: String,
    phone: String,
  }]
},
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre('save', function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, +process.env.HASH_ROUND);
});

userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, +process.env.HASH_ROUND);
});

export const userModel = mongoose.model("user", userSchema);
