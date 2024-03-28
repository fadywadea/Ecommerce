"use strict";

import multer from 'multer';
import { AppError } from '../../utils/appError.js';

// file upload
const fileUpload = () => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
export const uploadArrayOfFile = (fieldName) => fileUpload().array(fieldName, 10);
export const uploadFields = (fieldName) => fileUpload().fields(fields);
