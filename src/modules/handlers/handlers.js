"use strict";

import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";

export const addOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = new model(req.body);
    await document.save();
    res.json({ message: "success", document });
  });
};

export const getAll = (model) => {
  return catchError(async (req, res, next) => {
    let getModel = model.find();
    if (req.body.category) {
      getModel = model.find(req.body);
    } else {
      getModel = model.find();
    }
    let apiFeatures = new ApiFeatures(getModel, req.query).pagination().fields().sort().search().filter();
    const document = await apiFeatures.mongooseQuery;
    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, document });
  });
};

export const findOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && next(new AppError("Document not found.", 404));
    document && res.status(200).json({ message: "success", document });
  });
};

export const updateOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.user._id) {
      let document = await model.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
      !document && next(new AppError("Document not found.", 404));
      document && res.status(200).json({ message: "success", document });
    } else {
      let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, });
      !document && next(new AppError("Document not found.", 404));
      document && res.status(200).json({ message: "success", document });
    }
  });
};

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.user._id) {
      let document = await model.findOneAndDelete({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
      !document && next(new AppError("Document not found.", 404));
      document && res.status(200).json({ message: "success" });
    } else {
      let document = await model.findByIdAndDelete(req.params.id);
      !document && next(new AppError("Document not found.", 404));
      document && res.status(200).json({ message: "success" });
    }
  });
};
