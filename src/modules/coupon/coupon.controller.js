"use strict";

import { couponModel } from "../../../database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";
import { findOne, getAll, updateOne } from "../handlers/handlers.js";


const addCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({ code: req.body.code });
  if (isCouponExist) return next(new AppError("Coupon already exist.", 400));
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.status(201).json({ message: "Coupon added successfully.", coupon });
});

const getAllCoupons = getAll(couponModel);

// catchError(async (req, res, next) => {
//   let apiFeatures = new ApiFeatures(couponModel.find({}), req.query)
//     .pagination().fields().sort().search().filter();
//   let coupon = await apiFeatures.mongooseQuery;
//   res.status(200).json({ message: "success", page: apiFeatures.pageNumber, coupon });
// });

const getSingleCoupon = findOne(couponModel);

const updateCoupon = updateOne(couponModel);

const deleteCoupon = catchError(async (req, res, next) => {

});

export { addCoupon, getAllCoupons, getSingleCoupon, updateCoupon, deleteCoupon, };
