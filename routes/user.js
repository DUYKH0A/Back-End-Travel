import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router()

import { verifyAdmin, verifyUser, verifyTourManager } from '../utils/verifyToken.js';
//update user
router.put("/:id",verifyAdmin, updateUser);
//delete user
router.delete("/:id",verifyAdmin, deleteUser);
//get single user
router.get("/:id", getSingleUser);
//get all users
router.get("/",verifyAdmin, getAllUser);

export default router;