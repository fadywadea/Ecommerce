"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const updateWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, });
  !wishlist && next(new AppError("wishlist not found.", 404));
  wishlist && res.status(200).json({ message: "success", wishlist });
});

export { updateWishlist };
