"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const addToWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.
    findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true }).populate('wishlist');
  !wishlist && next(new AppError("The wish list is empty.", 404));
  wishlist && res.status(200).json({ message: "success", wishlist: wishlist.wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.
    findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } }, { new: true }).populate('wishlist');
  !wishlist && next(new AppError("The wish list is empty.", 404));
  wishlist && res.status(200).json({ message: "success", wishlist: wishlist.wishlist });
});

const getLoggedUserWishlist = catchError(async (req, res, next) => {
  let { wishlist } = await userModel.findById(req.user._id).populate('wishlist');
  !wishlist && next(new AppError("The wish list is empty.", 404));
  wishlist && res.status(200).json({ message: "success", wishlist });
});

export { addToWishlist, removeFromWishlist, getLoggedUserWishlist };
