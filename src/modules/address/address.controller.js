"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


const addAddress = catchError(async (req, res, next) => {
  let address = await userModel.
    findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
  !address && next(new AppError("The address is empty.", 404));
  address && res.status(200).json({ message: "success", address: address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  let address = await userModel.
    findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
  !address && next(new AppError("The address is empty.", 404));
  address && res.status(200).json({ message: "success", address: address.addresses });
});

const getAddress = catchError(async (req, res) => {
  let { addresses } = await userModel.findById(req.user._id);
  addresses && res.status(200).json({ message: "success", addresses });
});

export { addAddress, removeAddress, getAddress };
