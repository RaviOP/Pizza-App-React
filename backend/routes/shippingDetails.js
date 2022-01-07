import express from "express";
import {
	createShippingDetail,
	getShippingDetail,
} from "../controllers/shippingDetailController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getShippingDetail);
router.post("/", auth, createShippingDetail);

export default router;
