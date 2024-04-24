"use strict";

import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";

const addOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.user) req.body.createdBy = req.user._id;
    let document = new model(req.body);
    await document.save();
    res.json({ message: "success", document });
  });
};

const getAll = (model) => {
  return catchError(async (req, res, next) => {
    let getModel = model.find();
    if (req.body.category) getModel = model.find(req.body);
    let apiFeatures = new ApiFeatures(getModel, req.query).pagination().fields().sort().search().filter();
    const document = await apiFeatures.mongooseQuery;
    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, document });
  });
};

const findOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && next(new AppError("Document not found.", 404));
    document && res.status(200).json({ message: "success", document });
  });
};

const updateOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.user) {
      let document = await model.findOneAndUpdate({ _id: req.params.id, $or: [{ createdBy: req.user._id }, { user: req.user._id }] }, req.body, { new: true });
      !document && next(new AppError("Document not found.", 404));
      return document && res.status(200).json({ message: "success", document });
    }
    let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, });
    !document && next(new AppError("Document not found.", 404));
    document && res.status(200).json({ message: "success", document });
  });
};

const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.user) {
      let document = await model.findOneAndDelete({ _id: req.params.id, $or: [{ createdBy: req.user._id }, { user: req.user._id }] }, req.body, { new: true });
      !document && next(new AppError("Document not found.", 404));
      return document && res.status(200).json({ message: "success" });
    }
    let document = await model.findByIdAndDelete(req.params.id);
    !document && next(new AppError("Document not found.", 404));
    document && res.status(200).json({ message: "success" });
  });
};

export { addOne, getAll, findOne, updateOne, deleteOne };