"use strict";

import { catchError } from "../../middleware/catchError.js";
import slugify from "slugify";

export const addOne = (model) => {
  return catchError(async (req, res, next) => {
    if(req.body.name) req.body.slug = slugify(req.body.name);
    if(req.body.title) req.body.slug = slugify(req.body.title);
    if (req.files) {
      if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
      if (req.files.images) req.body.images = req.files.images.map((img) => img.filename);
    }
    if (req.file) req.body.logo = req.file.filename;
    if (req.file) req.body.image = req.file.filename;
    let document = new model(req.body);
    await document.save();
    res.json({ message: "success", document });
  });
};

export const getAll = (model) => {
  return catchError(async (req, res, next) => {
    let filterObject = {};
    if (req.params.category) {
      filterObject.category = req.params.category
    }
    let document = await model.find(filterObject);
    res.status(200).json({ message: "success", document });
  });
};

export const findOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.status(200).json({ message: "success", document });
  });
};

export const updateOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.files) {
      if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
      if (req.files.images) req.body.images = req.files.images.map((img) => img.filename);
    }
    if (req.file) req.body.logo = req.file.filename;
    if (req.file) req.body.image = req.file.filename;

    let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !document && res.status(404).json({ message: "document not found" });
    document && res.status(200).json({ message: "success", document });
  });
};

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.status(200).json({ message: "success", document });
  });
};

