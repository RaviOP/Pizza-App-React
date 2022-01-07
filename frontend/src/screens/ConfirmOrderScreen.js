import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { getShippingDetails } from "../actions/shippingActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ConfirmOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading: loadingUserDetail, userInfo: userDetail, error: errorUserDetail } = userLogin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

	const shippingDetail = useSelector((state) => state.shippingDetail);
	const {
		loading: loadingShippingDetail,
		error: errorShippingDetail,
		shippingAddress: shippingAddressDetail,
	} = shippingDetail;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, error, success, order } = orderCreate;

	useEffect(() => {
		if (!shippingAddressDetail || !shippingAddressDetail.address) {
			dispatch(getShippingDetails());
		}
		if (success) {
			history.push(`/order/${order._id}`);
		}
	}, [dispatch, shippingAddressDetail, success, history, order]);

	const orderHandler = (e) => {
		e.preventDefault();
		const order = {
			pizzas: cartItems,
			shippingDetails: shippingAddressDetail,
			totalPrice: totalAmount,
		};
		dispatch(createOrder(order));
	};

	return (
		<div className='confirmOrder-body'>
			<div className='c-card'>
				{error && <Message variant='danger' children={error} />}
				<div className='row'>
					<div className='col-md-6 c-heading-left'>
						<h2 className='text-muted'>Order Confirmation</h2>
					</div>
					<div className='col-md-6 c-heading-right'>
						<button className='btn btn-outline-success' onClick={orderHandler}>
							{loading ? <Loader /> : "Place Order"}
						</button>
					</div>
				</div>
				<div className='c-internal-card'>
					<div className='p-4'>
						<div className='row'>
							<div className='col-md-6 c-inside-card c-internal-left'>
								<div className='c-heading-box'>
									<span className='c-internal-heading'>Your Information</span>
								</div>
								{loadingUserDetail ? (
									<Loader />
								) : errorUserDetail ? (
									<Message variant='danger' children={errorUserDetail} />
								) : (
									<div>
										<span className='c-detail-name'>{userDetail.name}</span>
										<span className='c-detail-email'>{userDetail.email}</span>
									</div>
								)}
							</div>
							<div className='col-md-6 c-inside-card'>
								<div className='c-heading-box'>
									<span className='c-internal-heading'>Shipping Address</span>
								</div>
								{loadingShippingDetail ? (
									<Loader />
								) : errorShippingDetail ? (
									<Message variant='danger' children={errorShippingDetail} />
								) : (
									<div>
										<span className='c-detail-name'>{userDetail.name}</span>
										<span className='c-detail-email'>
											{shippingAddressDetail.address} ,
											{shippingAddressDetail.city}{" "}
											{shippingAddressDetail.pinCode},{" "}
											{shippingAddressDetail.country}
										</span>
									</div>
								)}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 c-inside-card c-internal-left'>
								<div className='c-heading-box'>
									<span className='c-internal-heading'>Payment</span>
								</div>
								<div>
									<span className='c-detail-name'>Cash On Delivery</span>
								</div>
							</div>
							<div className='col-md-6 c-inside-card c-internal-left'>
								<div className='c-heading-box'>
									<span className='c-internal-heading'>Total</span>
								</div>
								<div>
									<span className='c-detail-name'>₹{totalAmount}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmOrderScreen;
