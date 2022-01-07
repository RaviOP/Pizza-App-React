import express from "express";
import {
	createMenuItems,
	deleteMenuItem,
	getAllMenuItems,
	getMenuItemById,
	updateMenuItem,
} from "../controllers/menusController.js";
import { upload } from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.post("/", auth, admin, upload.single("image"), createMenuItems);

router.get("/:id", getMenuItemById);
router.put("/:id", auth, admin, upload.single("image"), updateMenuItem);
router.delete("/:id", auth, admin, deleteMenuItem);

export default router;
