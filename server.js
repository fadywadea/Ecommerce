"use strict";

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/modules/index.routes.js";

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
bootstrap(app);

// Server running....
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
