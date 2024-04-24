"use strict";

import express from "express";
import { validation } from "../../middleware/validation.js";
import { addAddressVal, paramsIdVal } from "./address.validation.js";
import { authorization, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getAddress, removeAddress } from "./address.controller.js";

const addressRouter = express.Router();

// ToDo: create update address

addressRouter
  .route("/")
  .patch(protectedRoutes, authorization("user"), validation(addAddressVal), addAddress)
  .get(protectedRoutes, authorization("user"), getAddress);

addressRouter
  .route("/:id")
  .delete(protectedRoutes, authorization("user", "admin"), validation(paramsIdVal), removeAddress);

export default addressRouter;
