import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req._id }, null, { sort: { createdAt: -1 } });
		if (!orders) {
			return res.send([]);
		}
		res.status(200);
		res.send(orders);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const createOrders = async (req, res) => {
	try {
		const { pizzas, shippingDetails, paymentMethod, totalPrice } = req.body;
		const order = new Order({
			user: req._id,
			pizzas,
			shippingDetail: shippingDetails,
			paymentMethod,
			totalPrice,
		});
		await order.save();
		const eventEmitter = req.app.get("eventEmitter");
		eventEmitter.emit("Order-Placed", order);
		res.status(201).send(order);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const getOrderById = async (req, res) => {
	try {
		const order = await Order.findOne({
			user: req._id,
			_id: req.params.id,
		}).populate("user", "name email");
		if (!order) {
			res.status(404);
			throw new Error("Order Not Found");
		}
		res.status(200);
		res.send(order);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({}, null, {
			sort: { createdAt: -1 },
		})
			.populate("user", "name email")
			.populate("shippingDetail");
		if (!orders) {
			return res.send([]);
		}
		res.status(200).send(orders);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const updateStatus = async (req, res) => {
	try {
		let { status } = req.body;
		console.log(status);
		const order = await Order.findById(req.params.id);
		order.status = status || order.status;
		if (status === "DELIVERED") {
			order.isDelivered = true;
			order.deliveredAt = Date.now();
		}
		if (status === "PAID") {
			order.isPaid = true;
			order.paidAt = Date.now();
		}
		await order.save();
		const eventEmitter = req.app.get("eventEmitter");
		eventEmitter.emit("Order-Updated", { id: req.params.id, status: req.body.status });
		res.status(200).send(order);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
