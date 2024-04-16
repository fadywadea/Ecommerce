"use strict";

import { globalError } from "../middleware/globalError.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import categoryRouter from "./category/category.routes.js";
import productRouter from "./product/product.routes.js";
import subcategoryRouter from "./subcategory/subcategory.routes.js";
import userRouter from "./user/user.routes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.json({ message: "success" }));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use(globalError);
};
