"use strict";

import { connect } from "mongoose";

export const dbConnection = connect("mongodb://127.0.0.1:27017/Ecommerce")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log(`Error Connecting to the Database: ${error}`);
  });
