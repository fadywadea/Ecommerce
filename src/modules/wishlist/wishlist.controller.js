"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const updateWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.
    findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true, });
  !wishlist && next(new AppError("The wish list is empty.", 404));
  wishlist && res.status(200).json({ message: "success", wishlist });
});

export { updateWishlist };
