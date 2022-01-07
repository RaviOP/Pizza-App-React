import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		pizzas: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Menu" },
			},
		],
		shippingDetail: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "ShippingDetail",
		},
		paymentMethod: {
			type: String,
			default: "COD",
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
		status: {
			type: String,
			default: "PLACED", // PLACED,CONFIRMED,PREPARED,DELIVERED,PAID,COMPLETED
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
