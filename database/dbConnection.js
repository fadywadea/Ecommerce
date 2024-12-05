"use strict";

import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = connect(`mongodb+srv://${process.env.EMAIL_DATABASE}:${process.env.PASSWORD_DATABASE}@e-commerce.c2lrhoo.mongodb.net/e-commerce-11`)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(`Error Connecting to the Database: ${error}`);
  });
