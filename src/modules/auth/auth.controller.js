"use strict";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/appError.js";

// Signup
const signup = catchError(async (req, res, next) => {
  // Check if the email already exists
  const checkExists = await userModel.findOne({ email: req.body.email });
  if (checkExists) return next(new AppError("Email already exists.", 409));
  const user = new userModel(req.body);
  await user.save();
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
  res.status(201).json({ message: "success", token });
});

// Signin
const signin = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError("Wrong Email.", 401));
  if (!bcrypt.compareSync(password, user.password)) return next(new AppError("Wrong Password.", 401));
  const { name, _id, role } = user;
  const token = jwt.sign({ userId: _id, role }, process.env.JWT_KEY);
  res.status(200).json({ message: `Welcome ${name}.`, token });
});

// Update password
const changePassword = catchError(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  if (!user) return next(new AppError("No User Found!", 404));
  if (!bcrypt.compareSync(password, user.password)) return next(new AppError("Wrong Password!", 401));
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
  await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordUpdatedAt: Date.now() },
    { new: true });
  res.status(200).json({ message: "success", token });
});

// Authentication
const protectedRoutes = catchError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("Token not provider", 401));
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findById(decoded.userId).lean();
  if (!user) return next(new AppError("User not found!", 404));
  if (user.passwordUpdatedAt && user.passwordUpdatedAt.getTime() > decoded.iat * 1000) return next(new AppError("Token Expired.", 404));
  req.user = user;
  next();
});

// Authorization
const authorization = (...roles) => {
  return catchError(async (req, res, next) => {
    !roles.includes(req.user.role) && next(new AppError("You don't have permission to perform this action.", 403));
    roles.includes(req.user.role) && next();
  });
};

export { signup, signin, changePassword, protectedRoutes, authorization };