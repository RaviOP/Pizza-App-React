import Menu from "../models/Menu.js";

export const getAllMenuItems = async (req, res) => {
	try {
		const menuItems = await Menu.find({});
		if (!menuItems) {
			return res.status(404).send([]);
		}
		res.status(200).send({ menuItems });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const createMenuItems = async (req, res) => {
	try {
		const image = `/${req.file.path}`;
		let { name, price, size } = req.body;
		size = size.toUpperCase();
		const menuItem = new Menu({
			name,
			image,
			price,
			size,
		});
		await menuItem.save();
		res.status(201).send(menuItem);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const getMenuItemById = async (req, res) => {
	try {
		const menuItem = await Menu.findById(req.params.id);
		if (!menuItem) {
			return res.send(404).send("Pizza Not Found");
		}
		res.status(200).send(menuItem);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const updateMenuItem = async (req, res) => {
	try {
		const image = `/${req.file.path}`;
		let { name, price, size } = req.body;
		if (size) {
			size = size.toUpperCase();
		}
		const menuItem = await Menu.findById(req.params.id);
		menuItem.name = name || menuItem.name;
		menuItem.price = +price || menuItem.price;
		menuItem.size = size || menuItem.size;
		menuItem.image = image || menuItem.image;

		await menuItem.save();
		res.status(200).send(menuItem);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const deleteMenuItem = async (req, res) => {
	try {
		const menuItem = await Menu.findByIdAndDelete(req.params.id);
		if (!menuItem) {
			return res.send(404).send("Pizza Not Found");
		}
		res.status(200).send(menuItem);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
