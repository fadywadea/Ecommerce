"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


const addAddress = catchError(async (req, res, next) => {
  try {
    let address = await userModel.
      findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
    !address && next(new AppError("The address is empty.", 404));
    address && res.status(200).json({ message: "success", address: address.addresses });
  } catch (e) {
    res.status(500).json({ error: `Error in server: ${e}` });
  }
});

const removeAddress = catchError(async (req, res, next) => {
  try {
    let address = await userModel.
      findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
    !address && next(new AppError("The address is empty.", 404));
    address && res.status(200).json({ message: "success", address: address.addresses });
  } catch (e) {
    res.status(500).json({ error: `Error in server: ${e}` });
  }
});

const getAddress = catchError(async (req, res) => {
  try {
    let { addresses } = await userModel.findById(req.user._id);
    addresses && res.status(200).json({ message: "success", addresses });
  } catch (e) {
    res.status(500).json({ error: `Error in server: ${e}` });
  }
});

export { addAddress, removeAddress, getAddress };
