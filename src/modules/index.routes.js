"use strict";

import { globalError } from "../middleware/globalError.js";
import addressRouter from "./address/address.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import cartRouter from "./cart/cart.routes.js";
import categoryRouter from "./category/category.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import productRouter from "./product/product.routes.js";
import reviewRouter from "./review/review.routes.js";
import subcategoryRouter from "./subcategory/subcategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishlistRouter from "./wishlist/wishlist.routes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.json({ message: "success" }));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/addresses", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/carts", cartRouter);

  app.use(globalError);
};
