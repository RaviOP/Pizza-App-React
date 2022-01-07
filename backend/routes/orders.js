import express from "express";
import {
	getMyOrders,
	createOrders,
	getOrderById,
	getAllOrders,
	updateStatus,
} from "../controllers/ordersController.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

//Customer
router.get("/", auth, getMyOrders);
router.post("/", auth, createOrders);
router.get("/admin", auth, admin, getAllOrders);

router.get("/:id", auth, getOrderById);
router.put("/:id/status", auth, admin, updateStatus);

export default router;
