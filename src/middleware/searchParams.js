"use strict";

export const searchParams = async (req, res, next) => {
  let filterObject = {};
  if (req.params.category) {
    filterObject.category = req.params.category;
  }
  req.body = filterObject
  next();
}