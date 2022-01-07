import express from "express";
import {
	createUser,
	deleteCurrentUser,
	deleteUserById,
	getAllUsers,
	getCurrentUser,
	getUserById,
	loginUser,
	updateCurrentUser,
	updateUserById,
} from "../controllers/usersController.js";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);
router.post("/", createUser);

router.post("/login", loginUser);

router.get("/profile", auth, getCurrentUser);
router.put("/profile", auth, updateCurrentUser);
router.delete("/profile", auth, deleteCurrentUser);

router.get("/:id", auth, admin, getUserById);
router.put("/:id", auth, admin, updateUserById);
router.delete("/:id", auth, admin, deleteUserById);

export default router;
