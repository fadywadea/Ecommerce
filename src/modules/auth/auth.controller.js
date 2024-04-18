"use strict";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/appError.js";

// Signup
export const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
  res.status(201).json({ message: "success", token });
});

// Signin
export const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("Invalid Email.", 401));
  if (bcrypt.compareSync(req.body.password, user.password)) return next(new AppError("Invalid Password.", 401));
  const { name, _id, role } = user;
  let token = jwt.sign({ userId: _id, role }, process.env.JWT_KEY);
  res.status(200).json({ message: `Welcome ${name}.`, token });
});

// Update password
export const changePassword = catchError(async (req, res, next) => {
  let { password, newPassword } = req.body;
  let user = await userModel.findById(req.user._id);
  if (user) return next(new AppError("No User Found!", 404));
  if (!bcrypt.compareSync(password, user.password)) return next(new AppError("Wrong Password!", 401));
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
  await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordUpdatedAt: Date.now() }, { new: true });
  res.status(200).json({ message: "success", token });
});

// Authentication
export const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("Token not provider", 401));
  let decoded = jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("Unauthorized!", 403));
  if (user.passwordUpdatedAt) {
    let time = parseInt(user.passwordUpdatedAt.getTime() / 1000);
    if (time > decoded.iat) return next(new AppError("Token Expired.", 404));
  }
  req.user = user;
  next();
});

// Authorization
export const authorization = (...roles) => {
  return catchError(async (req, res, next) => {
    !roles.includes(req.user.role) && next(new AppError("You don't have permission to perform this action.", 401));
    roles.includes(req.user.role) && next();
  });
};
