"use strict";

import { connect } from "mongoose";

export const dbConnection = connect("mongodb+srv://fady_e-commerce:iotiFgybBzZ0qu4B@e-commerce.c2lrhoo.mongodb.net/e-commerce-1")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(`Error Connecting to the Database: ${error}`);
  });
