import mongoose from "mongoose";

export default mongoose
	.connect(process.env.MONGODB_URL, {
		useFindAndModify: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`Connected To Database`.bgRed.white))
	.catch((err) => console.log(`Error: ${err}`.bgRed.white));
