import ShippingDetail from "../models/ShippingDetail.js";

export const getShippingDetail = async (req, res) => {
	try {
		const detail = await ShippingDetail.findOne({
			user: req._id,
		});
		if (!detail) {
			return res.send("No Details Found");
		}
		res.status(200).send(detail);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const createShippingDetail = async (req, res) => {
	try {
		const { address, city, pinCode, country, phone } = req.body;
		const detail = await ShippingDetail.findOne({
			user: req._id,
		});
		if (detail) {
			detail.address = address || detail.address;
			detail.city = city || detail.city;
			detail.pinCode = pinCode || detail.pinCode;
			detail.country = country || detail.country;
			detail.phone = phone || detail.phone;
			await detail.save();
			res.status(200).send(detail);
		} else {
			const shippingDetail = new ShippingDetail({
				user: req._id,
				address,
				city,
				pinCode,
				country,
				phone,
			});

			await shippingDetail.save();
			res.status(201).send(shippingDetail);
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
