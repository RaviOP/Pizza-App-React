import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	size: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
