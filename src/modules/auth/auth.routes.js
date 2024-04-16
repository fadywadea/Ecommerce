"use strict";

import express from "express";
import { signin, signup, updatePassword } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.route("/")
  .post(signup)

authRouter.route("/signin")
  .post(signin);

authRouter.route("/password")
  .patch(updatePassword);

export default authRouter;
