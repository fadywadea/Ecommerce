"use strict";

import express from "express";
import { changePassword, protectedRoutes, signin, signup } from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { changePasswordVal, signinVal, signUpVal } from "./auth.validation.js";

const authRouter = express.Router();

authRouter.route("/signup").post(validation(signUpVal), signup);
authRouter.route("/signin").post(validation(signinVal), signin);
authRouter.route("/changePassword").patch(validation(changePasswordVal), protectedRoutes, changePassword);

export default authRouter;
