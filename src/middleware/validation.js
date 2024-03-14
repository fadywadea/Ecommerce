import { AppError } from "../utils/appError.js";

export const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsg = [];
      error.details.forEach((val) => {
        errMsg.push(val.message);
      });
      next(new AppError(errMsg, 401));
    }
  };
};
