import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		let name = req.body.name.split(" ").join("-");
		cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

let checkFileType = (file, cb) => {
	const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	} else {
		cb("Images Only");
	}
};

export const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb);
	},
});
