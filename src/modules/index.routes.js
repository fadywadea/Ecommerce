"use strict";

import { globalError } from "../middleware/globalError.js";
import categoryRouter from "./category/category.routes.js";
import subcategoryRouter from "./subcategory/subcategory.routes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.json({ message: "success" }));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use(globalError);
};
