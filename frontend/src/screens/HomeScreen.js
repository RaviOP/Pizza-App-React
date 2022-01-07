import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAllMenuItems } from "../actions/menuActions";
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import Message from "../components/Message";

const HomeScreen = () => {
	const dispatch = useDispatch();

	const menuList = useSelector((state) => state.menuList);
	const { loading, menuItems, error } = menuList;

	useEffect(() => {
		dispatch(listAllMenuItems());
	}, [dispatch]);

	return (
		<>
			<section className='hero py-5'>
				<Container>
					<Row className='align-items-center'>
						<Col sm={6} className='align-self-center'>
							<p className='home-p'>Are You Hungry?</p>
							<h1>Don't Wait!</h1>
							<div className='orderButton mt-4'>
								<a href='#menu' className='order-button rounded-pill'>
									Order Now
								</a>
							</div>
						</Col>
						<Col sm={6}>
							<Image className='hero-image' src='/hero-pizza.png' alt='pizza' fluid />
						</Col>
					</Row>
				</Container>
			</section>
			<section id='menu' className='menu mt-5'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Container>
						<Row>
							<h2>All Pizzas</h2>
							{menuItems.map((menu) => (
								<Col key={menu._id} xs={12} sm={6} md={6} lg={4} xl={3}>
									<Menu menu={menu} />
								</Col>
							))}
						</Row>
					</Container>
				)}
			</section>
		</>
	);
};

export default HomeScreen;
