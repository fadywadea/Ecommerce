"use strict";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/appError.js";

// Sign Up User
export const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  res.status(201).json({ message: "success", user });
});

// Signin with email or mobile
export const signin = catchError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const { name, _id, role } = user;
      const token = jwt.sign({ userId: _id, role }, process.env.JWT_KEY);
      res.status(200).json({ message: `Welcome ${name}.`, token });
    } else { next(new AppError("Invalid Password.", 401)); }
  } else { next(new AppError("Invalid Email.", 401)); }
});

// Update password
export const updatePassword = catchError(async (req, res, next) => {
  try {
    let { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    if (user) {
      !bcrypt.compareSync(oldPassword, user.password) && next(new AppError("Wrong Password!", 401))
      newPassword = bcrypt.hashSync(newPassword, +process.env.HASH_ROUND);
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
      await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordUpdatedAt: Date.now() }, { new: true });
      bcrypt.compareSync(oldPassword, user.password) && res.status(200).json({ message: "success", token });
    } else {
      next(new AppError("No User Found!", 404));
    }
  } catch (e) {
    res.status(500).json({ message: `Error in server: ${e}` });
  }
});

// Protected Routes
export const protectedRoutes = catchError(async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return next(new AppError("Token not provider", 401));
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.userId);
    if (!user) { return next(new AppError("Unauthorized!", 403)); }
    const time = parseInt(user.passwordUpdatedAt.getTime() / 1000);
    if (time > decoded.iat) { return next(new AppError("Token Expired.", 404)); }
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ message: `Error in server: ${e}` });
  }
});

// Authorization
export const authorization = (...roles) => {
  return catchError(async (req, res, next) => {
    try {
      !roles.includes(req.user.role) && next(new AppError("You don't have permission to perform this action.", 401));
      roles.includes(req.user.role) && next();
    } catch (e) {
      res.status(500).json({ message: `Error in server: ${e}` });
    }
  });
};
