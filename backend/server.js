import express from "express";
import colors from "colors";
import "./db/mongoose.js";
import menuRoutes from "./routes/menus.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import shippingRoutes from "./routes/shippingDetails.js";
import path from "path";
import { Server } from "socket.io";
import { EventEmitter } from "events";

const app = express();
const PORT = process.env.PORT || 4000;
let rootDirectory = path.resolve();

app.use("/uploads", express.static(path.join(rootDirectory, "/uploads")));
app.use(express.json());

app.use("/api/menus", menuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shippingDetail", shippingRoutes);

const server = app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`.bgCyan.white)
);

const event = new EventEmitter();
app.set("eventEmitter", event);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

io.on("connection", (socket) => {
	socket.on("join", (name) => {
		socket.join(name);
	});
});

event.on("Order-Updated", (data) => {
	io.to(`Order_${data.id}`).emit("OrderUpdated", data);
});

event.on("Order-Placed", (data) => {
	io.to(`adminRoom`).emit("Order-Placed", data);
});
