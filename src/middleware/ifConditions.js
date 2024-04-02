"use strict";

import slugify from "slugify";

export const conditions = (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.files) {
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
    if (req.files.images) req.body.images = req.files.images.map((img) => img.filename);
  }
  if (req.file) req.body.logo = req.file.filename;
  if (req.file) req.body.image = req.file.filename;
  next();
};
