import { AppError } from "../utils/appError.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });
    if (!error) {
      next();
    } else {
      let errorList = [];
      error.details.forEach(val => {
        errorList.push(val.message);
      });
      next(new AppError(errorList, 401));
    }
  };
};
