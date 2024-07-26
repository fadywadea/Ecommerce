"use strict";

import express from "express";
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { validation } from "../../middleware/validation.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validation(addUserVal), addUser)
  .get(getAllUsers);

userRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleUser)
  .put(validation(updateUserVal), updateUser)
  .delete(validation(paramsIdVal), deleteUser);

export default userRouter;
