"use strict";

import { userModel } from "../../../database/models/user.model.js";
import { addOne, deleteOne, findOne, getAll, updateOne } from "../handlers/handlers.js";

const addUser = addOne(userModel);

const getAllUsers = getAll(userModel);

const getSingleUser = findOne(userModel);

const updateUser = updateOne(userModel);

const deleteUser = deleteOne(userModel);

export { addUser, getAllUsers, getSingleUser, updateUser, deleteUser, };
