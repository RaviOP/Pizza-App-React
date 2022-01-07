import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listMyOrders } from "../actions/orderActions";

const OrdersScreen = () => {
	const dispatch = useDispatch();
	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading, error, orders } = orderListMy;

	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	return (
		<div className='profile-body'>
			<div className='container'>
				<Row>
					<span className='heading'>My Orders</span>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant='danger' children={error} />
					) : (
						<Table striped bordered hover responsive className='table-sm text-center'>
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders &&
									orders.map((order) => (
										<tr key={order._id}>
											<td>{order._id}</td>
											<td>{order.createdAt.substring(0, 10)}</td>
											<td>₹{order.totalPrice}</td>
											<td>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<i
														className='fas fa-times'
														style={{ color: "red" }}
													></i>
												)}
											</td>
											<td>
												{order.isDelivered ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<i
														className='fas fa-times'
														style={{ color: "red" }}
													></i>
												)}
											</td>
											<td>
												<LinkContainer to={`/order/${order._id}`}>
													<Button variant='dark' size='sm'>
														Details
													</Button>
												</LinkContainer>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					)}
				</Row>
			</div>
		</div>
	);
};

export default OrdersScreen;
