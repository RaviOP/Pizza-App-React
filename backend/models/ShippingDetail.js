import mongoose from "mongoose";

const shippingDetailSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		pinCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			validate: /^[0-9]{10}$/,
		},
	},
	{
		timestamps: true,
	}
);

const ShippingDetail = mongoose.model("ShippingDetail", shippingDetailSchema);

export default ShippingDetail;
