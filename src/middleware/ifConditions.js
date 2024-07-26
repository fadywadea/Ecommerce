"use strict";

import slugify from "slugify";

export const conditions = (req, res, next) => {
  const { body, files, file } = req;
  
  // Extract common logic into separate functions
  const setSlug = (value) => {
    body.slug = slugify(value);
  };
  
  // Set slug based on title or name
  if (body.title) {
    setSlug(body.title);
  } else if (body.name) {
    setSlug(body.name);
  }
  
  if (files) {
    if (files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
    if (files.images) req.body.images = req.files.images.map((img) => img.filename);
  }
  
  if (file) {
    req.body.logo = req.file.filename;
    req.body.image = req.file.filename;
  }

  next();
};
