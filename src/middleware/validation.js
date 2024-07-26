"use strict";

import { AppError } from "../utils/appError.js";

export const validation = (schema) => {
  return async (req, res, next) => {
    try {
      const filter = {
        ...req.body, ...req.params, ...req.query,
        ...(req.file && { image: req.file }), ...(req.files && { ...req.files }),
      };
      const { error } = await schema.validate(filter, { abortEarly: false });
      if (!error) {
        next();
      } else {
        const errorList = error.details.map((val) => val.message);
        next(new AppError(errorList, 401));
      }
    } catch (e) {
      res.status(500).json({ error: `Error in server: ${e}` });
    }
  };
};
