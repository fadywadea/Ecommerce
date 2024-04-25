"use strict";

import { couponModel } from "../../../database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, findOne, getAll, updateOne } from "../handlers/handlers.js";


const addCoupon = catchError(async (req, res, next) => {
  if (req.user) req.body.createdBy = req.user._id;
  let isCouponExist = await couponModel.findOne({ code: req.body.code });
  if (isCouponExist) return next(new AppError("Coupon already exist.", 400));
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.status(201).json({ message: "Coupon added successfully.", coupon });
});

const getAllCoupons = getAll(couponModel);

const getSingleCoupon = findOne(couponModel);

const updateCoupon = updateOne(couponModel);

const deleteCoupon = deleteOne(couponModel);

export { addCoupon, getAllCoupons, getSingleCoupon, updateCoupon, deleteCoupon, };
