import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

const CartScreen = () => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className='empty-cart'>
					<div className='container mx-auto text-center'>
						<div className='empty-cart-heading'>Cart Empty 😞</div>
						<div className='text-muted'>
							You Probably Haven't Ordered a Product Yet.
							<br />
							To Order a Product,Go To Main Page
						</div>
						<div className='empty-cart-image'>
							<img className='img-fluid' src='/empty-cart.png' alt='Empty-Cart' />
						</div>
						<div className='mt-5'>
							<Link to='/' className='order-button rounded-pill'>
								Go Back
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className='cart-body'>
					<Card className='cart-card'>
						<Container>
							<Row>
								<Col md={8} className='cart'>
									<Row>
										<Col>
											<span>Cart</span>
										</Col>
									</Row>
									{cartItems.map((item) => (
										<Row key={item._id}>
											<Row className='main align-items-center'>
												<Col sm={2}>
													<Image
														className='cart-image'
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Row
														style={{
															textDecoration: "none",
															fontWeight: "bold",
														}}
													>
														{item.name}
													</Row>
												</Col>
												<Col>₹{item.qty * item.price}</Col>
												<Col>
													<Form.Control
														as='select'
														value={item.qty}
														onChange={(e) =>
															dispatch(
																addToCart(
																	item._id,
																	Number(e.target.value)
																)
															)
														}
													>
														{[...Array(10).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
												<Col>
													<Button
														type='button'
														variant='light'
														onClick={() =>
															removeFromCartHandler(item._id)
														}
													>
														<i className='fas fa-trash'></i>
													</Button>
												</Col>
											</Row>
										</Row>
									))}
								</Col>
								<Col md={4} className='cart-summary'>
									<div>
										<span>Summary</span>
									</div>
									<hr />
									<Row>
										{cartItems.map((item) => (
											<Row key={item._id} className='text-center'>
												<Col>₹{item.price}</Col>✕<Col>{item.qty}</Col>=
												<Col>₹{item.price * item.qty}</Col>
												<br />
											</Row>
										))}
									</Row>
									<Row
										className='text-center'
										style={{
											borderTop: "1px solid rgba(0,0,0,.1)",
											padding: "2vh 0",
										}}
									>
										<span>
											<strong>Total</strong> :{" "}
											{cartItems.reduce((acc, item) => acc + item.qty, 0)} ×
											items = ₹
											{cartItems.reduce(
												(acc, item) => acc + item.qty * item.price,
												0
											)}
										</span>
									</Row>
									<Row className='text-center'>
										<Link className='order-button' to='/shipping-detail'>
											Proceed
										</Link>
									</Row>
								</Col>
							</Row>
						</Container>
					</Card>
				</div>
			)}
		</>
	);
};

export default CartScreen;
