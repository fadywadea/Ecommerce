"use strict";

import express from "express";
import { changePassword, protectedRoutes, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";
import { validation } from "../../middleware/validation.js";
import { changePasswordVal, signinVal, signUpVal } from "./auth.validation.js";

const authRouter = express.Router();

authRouter.route("/signup").post(validation(signUpVal), checkEmail, signup);
authRouter.route("/signin").post(validation(signinVal), signin);
// TODO: protectedRoutes before validation \!/
authRouter.route("/changePassword").patch(validation(changePasswordVal), protectedRoutes, changePassword);

export default authRouter;
