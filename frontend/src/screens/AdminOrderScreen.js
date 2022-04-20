import React, { useEffect } from 'react';
import moment from 'moment';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { listAdminOrders, statusUpdate } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminOrderScreen = () => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const { order: updatedOrder } = useSelector((state) => state.orderStatus);

	useEffect(() => {
		dispatch(listAdminOrders());
	}, [dispatch, updatedOrder]);

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
								<div className='admin-card' style={{ minHeight: '30rem' }}>
									<div className='admin-card-header'>{order._id}</div>
									<div
										className='admin-card-body text-center'
										style={{ height: 'full' }}
									>
										<div>
											Name: <b>{order && order.user && order.user.name}</b>
											<br />
											Email: <b>{order && order.user && order.user.email}</b>
											<br />
											Phone:{' '}
											<b>
												+91{' '}
												{order && order.user && order.shippingDetail.phone}
											</b>
											<br />
											Address:{' '}
											<b>
												{order &&
													order.user &&
													order.shippingDetail.address}
												, {order && order.user && order.shippingDetail.city}{' '}
												{order &&
													order.user &&
													order.shippingDetail.pinCode}
												,{' '}
												{order &&
													order.user &&
													order.shippingDetail.country}
												.
											</b>
											<br />
											Pizzas:{' '}
											<b>
												{order &&
													order.pizzas.map((pizza) => {
														return (
															<span key={pizza._id}>
																{pizza.name + ' × ' + pizza.qty}
																<br />
															</span>
														);
													})}
											</b>
											TotalPrice: <b>₹{order && order.totalPrice}</b>
										</div>
									</div>
									<div className='admin-card-footer'>
										<div className='admin-card-date'>
											{order &&
												order.createdAt &&
												moment(order.createdAt).format('lll')}
										</div>
										<div className='admin-card-select'>
											<Form>
												<Form.Group>
													<select
														className='form-select'
														onChange={(e) =>
															selectOptionChanged(e, order._id)
														}
														value={order && order.status}
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
