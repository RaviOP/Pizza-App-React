import React, { useEffect, useState } from "react";
import moment from "moment";
import { io } from "socket.io-client";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { listAdminOrders, statusUpdate } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

// const socket = io("http://localhost:5000");
// const socket = io()

const AdminOrderScreen = () => {
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders: recievedOrders } = orderList;

	useEffect(() => {
		if (!recievedOrders || (recievedOrders && recievedOrders.length === 0)) {
			dispatch(listAdminOrders());
		}
		// if (recievedOrders) {
		// 	socket.emit("join", "adminRoom");
		// 	setOrders(recievedOrders);
		// 	socket.on("Order-Placed", (data) => {
		// 		// orders.unshift(data);
		// 		setOrders([data, ...orders]);
		// 		toast(`New Order`, {
		// 			duration: 2000,
		// 		});
		// 	});
		// }
	}, [dispatch, recievedOrders, orders]);

	const selectOptionChanged = (e, id) => {
		e.preventDefault();
		dispatch(statusUpdate(id, e.target.value));
	};

	return (
		<div className='profile-body'>
			<Toaster position='top-right' />
			<Container>
				<span className='heading mb-1'>All Orders</span>
				<hr className='m-0' />
				<Row>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant='danger' children={error} />
					) : (
						orders.map((order) => (
							<Col key={order._id} sm={12} md={6} lg={4} xl={3}>
								<div className='admin-card'>
									<div className='admin-card-header'>{order._id}</div>
									<div className='admin-card-body text-center'>
										<div>
											Name: <b>{order.user.name}</b>
											<br />
											Email: <b>{order.user.email}</b>
											<br />
											Phone: <b>+91 {order.shippingDetail.phone}</b>
											<br />
											Address:{" "}
											<b>
												{order.shippingDetail.address},{" "}
												{order.shippingDetail.city}{" "}
												{order.shippingDetail.pinCode},{" "}
												{order.shippingDetail.country}.
											</b>
											<br />
											Pizzas:{" "}
											<b>
												{order.pizzas.map((pizza) => {
													return (
														<span key={pizza._id}>
															{pizza.name + " × " + pizza.qty}
															<br />
														</span>
													);
												})}
											</b>
											TotalPrice: <b>₹{order.totalPrice}</b>
										</div>
									</div>
									<div className='admin-card-footer'>
										<div className='admin-card-date'>
											{moment(order.createdAt).format(
												"DD-MM-YYYY - hh:mm:ss a"
											)}
										</div>
										<div className='admin-card-select'>
											<Form>
												<Form.Group>
													<select
														className='form-select'
														onChange={(e) =>
															selectOptionChanged(e, order._id)
														}
														value={order.status}
													>
														<option value='PLACED'>Placed</option>
														<option value='CONFIRMED'>Confirmed</option>
														<option value='PREPARED'>Prepared</option>
														<option value='DELIVERED'>Delivered</option>
														<option value='PAID'>Paid</option>
														<option value='COMPLETED'>Completed</option>
													</select>
												</Form.Group>
											</Form>
										</div>
									</div>
								</div>
							</Col>
						))
					)}
				</Row>
			</Container>
		</div>
	);
};

export default AdminOrderScreen;
