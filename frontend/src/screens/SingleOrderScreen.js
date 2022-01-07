import React, { useEffect, useRef } from "react";
// import { io } from "socket.io-client";
import { toast, Toaster } from "react-hot-toast";
import moment from "moment";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";

// const socket = io("http://localhost:5000");

const SingleOrderScreen = ({ match }) => {
	const id = match.params.id;
	let PLACED = useRef();
	let CONFIRMED = useRef();
	let PREPARED = useRef();
	let DELIVERED = useRef();
	let PAID = useRef();
	let COMPLETED = useRef();

	const dispatch = useDispatch();
	const orderDetail = useSelector((state) => state.orderDetail);
	const { loading, error, order } = orderDetail;

	const updateOrder = (recievedOrder) => {
		let statuses = [PLACED, CONFIRMED, PREPARED, DELIVERED, PAID, COMPLETED];
		let time = document.createElement("small");
		statuses.forEach((status) => {
			status.current.classList.remove("step-completed");
			status.current.classList.remove("current");
		});
		let stepCompleted = true;
		statuses.forEach((status) => {
			if (status) {
				let dataProperty = status.current.dataset.status;
				if (stepCompleted) {
					status.current.classList.add("step-completed");
				}
				if (dataProperty === recievedOrder.status) {
					stepCompleted = false;
					time.innerText = moment(recievedOrder.updatedAt).format("hh:mm a");
					status.current.appendChild(time);
					if (status.current.nextElementSibling) {
						status.current.nextElementSibling.classList.add("current");
					}
				}
			}
		});
	};

	useEffect(() => {
		if (order && order.status) {
			updateOrder(order);
			// socket.emit("join", `Order_${order._id}`);
			// socket.on("OrderUpdated", (data) => {
			// 	const updatedOrder = { ...order };
			// 	let currentTime = new Date().getTime();
			// 	updatedOrder.updatedAt = "" + currentTime;
			// 	updatedOrder.status = data.status;
			// 	toast(`Order Status Updated`, {
			// 		duration: 2000,
			// 	});
			// 	this.statusUpdate(updatedOrder);
			// });
		} else {
			dispatch(getOrderDetails(id));
		}
	}, [dispatch, id, order]);

	return (
		<div className='profile-body'>
			<div className='container'>
				<Toaster position='top-right' />
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger' children={error} />
				) : (
					<div className='status-box w-100'>
						<span className='left-header d-block mb-5'>Track Delivery Status</span>

						<ul>
							<li ref={PLACED} className='status_line padding' data-status='PLACED'>
								<span>Order Placed</span>
							</li>
							<li
								ref={CONFIRMED}
								className='status_line padding'
								data-status='CONFIRMED'
							>
								<span>Order Confirmation</span>
							</li>
							<li
								ref={PREPARED}
								className='status_line padding'
								data-status='PREPARED'
							>
								<span>Order Preparation</span>
							</li>
							<li
								ref={DELIVERED}
								className='status_line padding'
								data-status='DELIVERED'
							>
								<span>Order Out For Delivery</span>
							</li>
							<li ref={PAID} className='status_line padding' data-status='PAID'>
								<span>Order Paid</span>
							</li>
							<li ref={COMPLETED} className='status_line' data-status='COMPLETED'>
								<span>Order Completed</span>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default SingleOrderScreen;
